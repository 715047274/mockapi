const injectCtxMiddleware = (customCtx = null) => {
    return (req, res, next) => {
        if (!req.body) req.body = {};
        if (!req.body.variables) req.body.variables = {};

        // If ctx is missing, inject the provided customCtx or use default values
        if (!req.body.variables.ctx) {
            console.warn("⚠️ Injecting default ctx in request.");
            req.body.variables.ctx = customCtx || {
                sessionTicket: "123",
                controlDbKey: "234",
                userId: 234,
                cultureId: 234,
                prSchemaVersions: []
            };
        }

        next();
    };
};

export default injectCtxMiddleware;