
/**
 * This error is used to represent an HTTP 400 Bad Request response.
 */
export class BadRequestError extends Error {

    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
    }

}
