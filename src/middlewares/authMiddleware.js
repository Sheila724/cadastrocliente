const authMiddleware = function (req, res, next) {
    const userId = req.session.userid;

    // Permitir acesso à página de listagem de clientes mesmo sem autenticação
    if (!userId && req.originalUrl.startsWith('/clients')) {
        return next();
    }

    if (!userId) {
        return res.redirect('/login');
    }

    next();
};

module.exports = authMiddleware;