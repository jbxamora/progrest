const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
