/**
 * This error is used to represent an HTTP 409 Conflict response.
 */
export class ConflictError extends Error {

    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
    }

}