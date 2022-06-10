class ErrorCatcher {
    constructor() {}

    // This is used to wrap around async function instead of a try-catch
    catchAsync(fn) {
        // Return a callback that is caught if there is an error
        return function(req, res, next) {
            fn(req, res, next).catch(err => next(err))
        }
    }
}

module.exports = ErrorCatcher;