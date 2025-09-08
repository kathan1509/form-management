// This file defines the User model, which represents the user entity in the database.
// It includes properties such as id, username, password, and role, and methods for interacting with the database.

import db from '../config/db.config.js';

class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    static create(newUser, result) {
        db.query("INSERT INTO users SET ?", newUser, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newUser });
        });
    }

    static findById(userId, result) {
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
    }

    static findByUsername(username, result) {
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
    }
}

export default User;