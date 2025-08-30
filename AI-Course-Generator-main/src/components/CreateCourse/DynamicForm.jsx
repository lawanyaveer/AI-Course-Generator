import React, { useState, useEffect, useCallback } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { PlusIcon } from "@heroicons/react/24/outline";

const DynamicForm = ({ data = [], onChange }) => {
  const [fields, setFields] = useState([]);

  // Initialize fields when data changes
  useEffect(() => {
    if (data.length > 0) {
      setFields(data.map((item) => ({ value: item })));
    } else {
      setFields([]);
    }
  }, [data.length]); // Only depend on length to avoid infinite loops

  // Memoize the onChange callback to prevent unnecessary re-renders
  const handleFieldsChange = useCallback(
    (newFields) => {
      if (onChange) {
        const filteredData = newFields.map((field) => field.value).filter(Boolean);
        onChange(filteredData);
      }
    },
    [onChange]
  );

  const handleChange = (i, event) => {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    handleFieldsChange(values);
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ value: "" });
    setFields(values);
    handleFieldsChange(values);
  };

  const handleRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    handleFieldsChange(values);
  };

  return (
    <div className="space-y-3">
      {fields.map((field, idx) => (
        <div key={idx} className="group relative">
          <input
            type="text"
            placeholder="Enter text"
            value={field.value || ""}
            onChange={(e) => handleChange(idx, e)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => handleRemove(idx)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <RiDeleteBin2Line size={18} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Item</span>
      </button>
    </div>
  );
};

export default DynamicForm;
