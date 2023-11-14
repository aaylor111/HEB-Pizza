/**
 * This error is used to represent an HTTP 500 Internal Server Error response.
 */
export class InternalServerError extends Error {

    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
    }

}