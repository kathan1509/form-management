import db from '../config/db.config.js';

const Form = {
    create: (data, callback) => {
        const sql = `INSERT INTO forms (title, slug, description, schema_json, created_at, updated_at)
                 VALUES (?, ?, ?, ?, NOW(), NOW())`;
        db.query(
            sql,
            [
                data.title,
                data.slug,
                data.description,
                JSON.stringify(data.schema_json),
            ],
            (err, result) => {
                if (err) return callback(err);
                callback(null, { id: result.insertId, ...data });
            }
        );
    },

    findBySlug: (slug, callback) => {
        const sql = `SELECT * FROM forms WHERE slug = ?`;
        db.query(sql, [slug], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    findById: (id, callback) => {
        const sql = `SELECT * FROM forms WHERE id = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
};

export default Form;
