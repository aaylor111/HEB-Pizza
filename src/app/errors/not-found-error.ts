/**
 * This error is used to represent an HTTP 404 Not Found response.
 */
export class NotFoundError extends Error {

    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
    }

}