import db from "../config/db.config.js";

const FormResponse = {
  create: (formId, responseJson, callback) => {
    const sql = `INSERT INTO form_responses (form_id, response_json, submitted_at)
                 VALUES (?, ?, NOW())`;
    db.query(sql, [formId, JSON.stringify(responseJson)], (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.insertId, form_id: formId, response_json: responseJson });
    });
  },

  findByFormId: (formId, callback) => {
    const sql = `SELECT * FROM form_responses WHERE form_id = ? ORDER BY submitted_at DESC`;
    db.query(sql, [formId], (err, results) => {
      if (err) return callback(err);
      // Parse JSON column before returning
      const responses = results.map((row) => ({
        ...row,
        response_json: JSON.parse(row.response_json),
      }));
      callback(null, responses);
    });
  },
};

export default FormResponse;
