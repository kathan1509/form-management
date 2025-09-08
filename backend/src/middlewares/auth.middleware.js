exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        if (user.role !== 'admin') {
            return res.status(403).send({ message: 'Require Admin Role!' });
        }
        next();
    });
};

exports.isTeacher = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        if (user.role !== 'teacher') {
            return res.status(403).send({ message: 'Require Teacher Role!' });
        }
        next();
    });
};

exports.isStudent = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        if (user.role !== 'student') {
            return res.status(403).send({ message: 'Require Student Role!' });
        }
        next();
    });
};