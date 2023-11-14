/**
 * This error is used to represent an HTTP 401 Unauthorized response.
 */
export class UnauthorizedError extends Error {

    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
    }

}