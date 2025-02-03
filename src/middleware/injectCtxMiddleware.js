const injectCtxMiddleware = (req, res, next) => {
    if (!req.body || !req.body.variables || !req.body.variables.ctx) {
        console.warn("⚠️ Injecting default ctx in request.");
        if (!req.body) req.body = {};
        if (!req.body.variables) req.body.variables = {};

        req.body.variables.ctx = {
            sessionTicket: "123",
            controlDbKey: "234",
            userId: 234,
            cultureId: 234,
            prSchemaVersions: []
        };
    }
    console.log("✅ Middleware Injected ctx:", JSON.stringify(req.body.variables.ctx, null, 2)); // Debugging

    next();
}

export default injectCtxMiddleware;

