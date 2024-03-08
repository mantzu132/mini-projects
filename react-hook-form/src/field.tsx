import React from "react";

interface FieldProps {
  children: React.ReactElement;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: {
    message?: string;
  };
}
export const Field = ({
  children,
  label,
  error,
  htmlFor,
  required,
}: FieldProps) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="col-sm-12 mb-4 flex flex-col items-start">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {children}

      {error && (
        <div className="mt-2 border border-red-500 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

// Get id prop from a child element
export const getChildId = (children: FieldProps["children"]) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};
