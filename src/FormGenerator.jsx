import React, { useState } from "react";
import "./styles.css";


const FormGenerator = () => {
  const [schema] = useState({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
      {
        id: "companySize",
        type: "select",
        label: "Company Size",
        required: true,
        options: [
          { value: "1-50", label: "1-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "201-1000", label: "201-1000 employees" },
          { value: "1000+", label: "1000+ employees" },
        ],
      },
      {
        id: "industry",
        type: "radio",
        label: "Industry",
        required: true,
        options: [
          { value: "tech", label: "Technology" },
          { value: "healthcare", label: "Healthcare" },
          { value: "finance", label: "Finance" },
          { value: "retail", label: "Retail" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "comments",
        type: "textarea",
        label: "Additional Comments",
        required: false,
        placeholder: "Any other details you'd like to share...",
      },
    ],
  });

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const validate = () => {
    let newErrors = {};

    schema.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (
        field.validation?.pattern &&
        !new RegExp(field.validation.pattern).test(formData[field.id])
      ) {
        newErrors[field.id] =
          field.validation.message || `${field.label} is invalid`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitted(true);
      console.log("Form submitted successfully:", formData);
    } else {
      setIsSubmitted(false);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <div className="field" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id] || ""}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="input"
            />
            {errors[field.id] && <p className="error">{errors[field.id]}</p>}
          </div>
        );
      case "select":
        return (
          <div className="field" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <select
              id={field.id}
              name={field.id}
              value={formData[field.id] || ""}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.id] && <p className="error">{errors[field.id]}</p>}
          </div>
        );
      case "radio":
        return (
          <div className="field" key={field.id}>
            <label>{field.label}</label>
            {field.options?.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name={field.id}
                  value={option.value}
                  checked={formData[field.id] === option.value}
                  onChange={handleChange}
                  className="input"
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
            {errors[field.id] && <p className="error">{errors[field.id]}</p>}
          </div>
        );
      case "textarea":
        return (
          <div className="field" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <textarea
              id={field.id}
              name={field.id}
              value={formData[field.id] || ""}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="input"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h2>{schema.formTitle}</h2>
      <p>{schema.formDescription}</p>

      <form onSubmit={handleSubmit}>
        {schema.fields.map((field) => renderField(field))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {isSubmitted && <p className="success">Form submitted successfully!</p>}
    </div>
  );
};

export default FormGenerator;
