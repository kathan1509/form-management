// This file defines the User model, which represents the user entity in the database.
// It includes properties such as id, username, password, and role, and methods for interacting with the database.

const db = require('../config/db.config.js');

const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
};

User.create = (newUser, result) => {
    db.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (userId, result) => {
    db.query("SELECT * FROM users WHERE id = ?", userId, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

User.findByUsername = (username, result) => {
    db.query("SELECT * FROM users WHERE username = ?", username, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (result) => {
    db.query("SELECT * FROM users", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    db.query("UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?", 
        [user.username, user.password, user.role, id], (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...user });
        });
};

User.remove = (id, result) => {
    db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = User;