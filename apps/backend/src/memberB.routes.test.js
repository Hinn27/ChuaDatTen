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

test('member b routes should respond with expected payload shape', async (t) => {
    const server = app.listen(0)
    const address = server.address()
    const baseUrl = `http://127.0.0.1:${address.port}`

    t.after(() => {
        server.close()
    })

    const health = await requestJson(baseUrl, '/health')
    assert.equal(health.response.status, 200)
    assert.equal(health.body.status, 'ok')

    const profile = await requestJson(baseUrl, '/api/v1/members/b/profile')
    assert.equal(profile.response.status, 200)
    assert.equal(profile.body.success, true)
    assert.equal(profile.body.data.id, 'b')

    const products = await requestJson(baseUrl, '/api/v1/members/b/products?limit=2&page=1')
    assert.equal(products.response.status, 200)
    assert.equal(products.body.success, true)
    assert.equal(Array.isArray(products.body.data.products), true)
    assert.equal(products.body.data.products.length <= 2, true)
    assert.equal(typeof products.body.data.pagination.totalCount, 'number')

    const searchBadRequest = await requestJson(baseUrl, '/api/v1/members/b/products/search')
    assert.equal(searchBadRequest.response.status, 400)
    assert.equal(searchBadRequest.body.success, false)

    const validateBadRequest = await requestJson(baseUrl, '/api/v1/members/b/validate-order', {
        method: 'POST',
        body: JSON.stringify({ items: null }),
    })
    assert.equal(validateBadRequest.response.status, 400)
    assert.equal(validateBadRequest.body.success, false)

    const validateOk = await requestJson(baseUrl, '/api/v1/members/b/validate-order', {
        method: 'POST',
        body: JSON.stringify({
            items: [{ productId: 'b-prod-001', quantity: 2 }],
        }),
    })
    assert.equal(validateOk.response.status, 200)
    assert.equal(validateOk.body.success, true)
    assert.equal(validateOk.body.data.isValid, true)
    assert.equal(validateOk.body.data.totalPrice > 0, true)

    const productNotFound = await requestJson(baseUrl, '/api/v1/members/b/products/not-found-id')
    assert.equal(productNotFound.response.status, 404)
    assert.equal(productNotFound.body.success, false)
})
