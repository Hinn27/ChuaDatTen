import assert from 'node:assert/strict'
import test from 'node:test'
import app from './app.js'

async function requestJson(baseUrl, path, options = {}) {
    const response = await fetch(`${baseUrl}${path}`, {
        headers: {
            'content-type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    })

    const body = await response.json()
    return { response, body }
}

test('member c routes should respond with expected payload shape', async (t) => {
    const server = app.listen(0)
    const address = server.address()
    const baseUrl = `http://127.0.0.1:${address.port}`

    t.after(() => {
        server.close()
    })

    const profile = await requestJson(baseUrl, '/api/v1/members/c/profile')
    assert.equal(profile.response.status, 200)
    assert.equal(profile.body.success, true)
    assert.equal(profile.body.data.id, 'c')

    const products = await requestJson(baseUrl, '/api/v1/members/c/products?limit=3&page=1')
    assert.equal(products.response.status, 200)
    assert.equal(products.body.success, true)
    assert.equal(Array.isArray(products.body.data.products), true)
    assert.equal(products.body.data.products.length <= 3, true)
    assert.equal(typeof products.body.data.pagination.totalCount, 'number')

    const searchBadRequest = await requestJson(baseUrl, '/api/v1/members/c/products/search')
    assert.equal(searchBadRequest.response.status, 400)
    assert.equal(searchBadRequest.body.success, false)
    assert.equal(searchBadRequest.body.error, 'Từ khóa tìm kiếm là bắt buộc')

    const validateBadRequest = await requestJson(baseUrl, '/api/v1/members/c/validate-order', {
        method: 'POST',
        body: JSON.stringify({ items: null }),
    })
    assert.equal(validateBadRequest.response.status, 400)
    assert.equal(validateBadRequest.body.success, false)
    assert.equal(validateBadRequest.body.error, 'Danh sách items là bắt buộc')

    const validateOk = await requestJson(baseUrl, '/api/v1/members/c/validate-order', {
        method: 'POST',
        body: JSON.stringify({
            items: [{ productId: 'c-prod-013', quantity: 1 }],
        }),
    })
    assert.equal(validateOk.response.status, 200)
    assert.equal(validateOk.body.success, true)
    assert.equal(validateOk.body.data.isValid, true)
    assert.equal(validateOk.body.data.totalPrice > 0, true)

    const productNotFound = await requestJson(baseUrl, '/api/v1/members/c/products/not-found-id')
    assert.equal(productNotFound.response.status, 404)
    assert.equal(productNotFound.body.success, false)
    assert.equal(productNotFound.body.error, 'Không tìm thấy sản phẩm')
})
