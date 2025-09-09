import { v4 as uuidv4 } from "uuid";
import Form from "../models/form.model.js";
import FormResponse from "../models/formResponse.model.js";

export const createForm = (req, res) => {
  const { title, description, schema_json, slug } = req.body;
  const finalSlug =
    slug || `${title.toLowerCase().replace(/\s+/g, "-")}-${uuidv4().slice(0, 6)}`;

  Form.create(
    { title, description, schema_json, slug: finalSlug },
    (err, form) => {
      if (err) {
        console.error("Error creating form:", err);
        return res.status(500).json({ message: "Failed to create form" });
      }
      res.status(201).json(form);
    }
  );
};

export const getFormBySlug = (req, res) => {
  Form.findBySlug(req.params.slug, (err, form) => {
    if (err) {
      console.error("Error fetching form:", err);
      return res.status(500).json({ message: "Failed to fetch form" });
    }
    if (!form) return res.status(404).json({ message: "Form not found" });
    form.schema_json = JSON.parse(form.schema_json);
    res.json(form);
  });
};

export const submitForm = (req, res) => {
  Form.findBySlug(req.params.slug, (err, form) => {
    if (err) {
      console.error("Error fetching form:", err);
      return res.status(500).json({ message: "Failed to fetch form" });
    }
    if (!form) return res.status(404).json({ message: "Form not found" });

    FormResponse.create(form.id, req.body, (err2) => {
      if (err2) {
        console.error("Error submitting response:", err2);
        return res.status(500).json({ message: "Failed to submit response" });
      }
      res.json({ success: true, message: "Response submitted successfully" });
    });
  });
};

export const getResponses = (req, res) => {
  Form.findById(req.params.id, (err, form) => {
    if (err) {
      console.error("Error fetching form:", err);
      return res.status(500).json({ message: "Failed to fetch form" });
    }
    if (!form) return res.status(404).json({ message: "Form not found" });

    FormResponse.findByFormId(form.id, (err2, responses) => {
      if (err2) {
        console.error("Error fetching responses:", err2);
        return res.status(500).json({ message: "Failed to fetch responses" });
      }
      res.json(responses);
    });
  });
};
