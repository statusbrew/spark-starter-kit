export class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
export function handleError(res, error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message })
}