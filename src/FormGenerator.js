import React, { useState } from "react";

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formConfig, setFormConfig] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState("text");
  const [selectedFieldName, setSelectedFieldName] = useState("");
  const [labelError, setLabelError] = useState(false);
  const [options, setOptions] = useState("");

  const addFormField = () => {
    const optionsList =
      selectedFieldType === "dropdown"
        ? `Select an option, ${options}`.split(",")
        : [];
    const newField = {
      id: new Date().getTime(),
      type: selectedFieldType,
      label: selectedFieldName,
      options: optionsList,
      userInput: "",
    };
    if (!newField.label.trim()) {
      setLabelError(true);
    } else {
      setFormFields([...formFields, newField]);
      setSelectedFieldName("");
      setOptions("");
      setLabelError(false);
    }
  };

  const removeFormField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const AddFields = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
          <label>
            Field Name :
            <input
              style={{ marginLeft: "10px" }}
              type="text"
              value={selectedFieldName}
              onChange={(e) => setSelectedFieldName(e.target.value)}
            />
            {labelError && (
              <span style={{ color: "red" }}>Field name cannot be empty</span>
            )}
          </label>
          <label>
            Field Type :
            <select
              style={{ marginLeft: "10px" }}
              value={selectedFieldType}
              onChange={(e) => setSelectedFieldType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="textarea">Textarea</option>
              <option value="dropdown">Dropdown</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
            </select>
          </label>
          {selectedFieldType === "dropdown" && (
            <label>
              Options:{" "}
              <input
                type="text"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
              />
            </label>
          )}
          <button
            style={{ height: "23px", width: "100px" }}
            type="button"
            onClick={addFormField}
          >
            Add Field
          </button>
        </div>
      </div>
    );
  };

  const showFields = () => {
    const renderFormField = (field) => {
      const onUpdateInput = (value) => {
        const updatedFields = formFields.map((item) =>
          item.id === field.id ? { ...field, userInput: value } : item
        );
        setFormFields(updatedFields);
      };
      switch (field.type) {
        case "text":
          return (
            <input
              type="text"
              value={field.userInput}
              onChange={(e) => onUpdateInput(e.target.value)}
            />
          );
        case "number":
          return (
            <input
              type="number"
              value={field.userInput}
              onChange={(e) => onUpdateInput(e.target.value)}
            />
          );
        case "textarea":
          return (
            <textarea
              value={field.userInput}
              onChange={(e) => onUpdateInput(e.target.value)}
            />
          );
        case "checkbox":
          return (
            <input
              type="checkbox"
              checked={field.userInput}
              onChange={(e) => onUpdateInput(e.target.value)}
            />
          );
        case "radio":
          return (
            <input
              type="radio"
              checked={field.userInput}
              onChange={(e) => onUpdateInput(e.target.value)}
            />
          );
        case "dropdown":
          return (
            <select
              value={field.userInput}
              onChange={(e) => onUpdateInput(e.target.value)}
            >
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        default:
          return null;
      }
    };

    const handleSaveConfig = () => {
      const userInputErrors = formFields.filter(
        (field) => !field.userInput || field.userInput.trim() === ""
      );

      if (userInputErrors.length > 0) {
        alert("UserInput cannot be empty for all fields.");
        return;
      }
      setFormConfig([...formConfig, { id: Date.now(), formFields }]);
      console.log("Form configuration saved:", formConfig);
    };

    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          margin: "auto",
          flexDirection: "column",
        }}
      >
        <h2>Form Configuration Preview</h2>
        {formFields.map((field) => (
          <div key={field.id}>
            <strong>{field.label}: </strong>
            {renderFormField(field)}
            <button
              type="button"
              onClick={() => removeFormField(field.id)}
              style={{ margin: 12 }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleSaveConfig}
          style={{
            marginTop: 24,
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  const showPreview = () => {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          margin: "auto",
          flexDirection: "column",
        }}
      >
        <h2>Stored Form Data:</h2>
        {formConfig.map((storedData) => (
          <div key={storedData.id}>
            {storedData.formFields.map((data) => (
              <div key={data.id}>
                <strong>{data.label}: </strong>
                <strong>{data.userInput}</strong>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div style={{ display: "block" }}>
      {AddFields()}
      {formFields.length > 0 && showFields()}
      {formConfig.length > 0 && showPreview()}
    </div>
  );
};

export default FormGenerator;