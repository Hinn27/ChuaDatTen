import { ZodError } from 'zod'

/**
 * Middleware validate request với Zod schema
 * @param {ZodSchema} schema - Zod schema
 * @param {string} dataLocation - Vị trí dữ liệu: 'body', 'query', 'params'
 */
export function validateRequest(schema, dataLocation = 'body') {
    return (req, res, next) => {
        try {
            const data = req[dataLocation]
            const validated = schema.parse(data)
            req[dataLocation] = validated
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const issues = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }))
                return res.status(400).json({
                    success: false,
                    errors: issues,
                })
            }
            next(error)
        }
    }
}

/**
 * Validate nhiều vị trí cùng lúc
 * @param {object} schemas - { body, query, params } - mỗi cái là Zod schema
 */
export function validateRequestMulti(schemas) {
    return (req, res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body)
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query)
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params)
            }
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const issues = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }))
                return res.status(400).json({
                    success: false,
                    errors: issues,
                })
            }
            next(error)
        }
    }
}
