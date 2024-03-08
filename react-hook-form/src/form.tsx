import { Controller, useForm } from "react-hook-form";
import { Category, ProductConfig } from "./types.ts";
import { FieldData, fieldMap, fields } from "@/fields.ts";
import { Field } from "@/field.tsx";

interface FormProps {
  category: Category;
}
export const Form = ({ category }: FormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductConfig>();

  const categoryFields = fields[category];

  const onSubmit = async (data: ProductConfig) => {
    console.log("Saving data", data);
  };

  function renderField(fieldName: keyof ProductConfig, fieldConfig: FieldData) {
    switch (fieldConfig.type) {
      case "text":
      case "password":
        return (
          <Field
            label={fieldConfig.label}
            required={!!fieldConfig.validation?.required}
            error={errors[fieldName]}
            key={fieldName}
          >
            <input
              {...register(fieldName, {
                required: fieldConfig.validation?.required,
              })}
              type={fieldConfig.type}
              id={fieldName}
              autoComplete={"off"}
              placeholder={fieldConfig.placeholder}
            />
          </Field>
        );
      case "checkbox":
        return (
          <Field
            label={fieldConfig.label}
            htmlFor={fieldName}
            key={fieldName}
            error={errors[fieldName]}
          >
            <input
              {...register(fieldName, {
                required: fieldConfig.validation?.required,
              })}
              type={fieldConfig.type}
              id={fieldName}
              autoComplete={"off"}
              placeholder={fieldConfig.placeholder}
            />
          </Field>
        );
      case "number":
        return (
          <Field
            label={fieldConfig.label}
            htmlFor={fieldName}
            key={fieldName}
            error={errors[fieldName]}
          >
            <input
              {...register(fieldName, {
                required: fieldConfig.validation?.required,
                min: {
                  value: fieldConfig.validation?.min?.value || null,
                  message: fieldConfig.validation?.min?.message || "",
                },
                max: {
                  value: fieldConfig.validation?.max?.value || null,
                  message: fieldConfig.validation?.max?.message || "",
                },
              })}
              type={fieldConfig.type}
              id={fieldName}
              placeholder={fieldConfig.placeholder}
            />
          </Field>
        );
      case "select":
        return (
          <Field
            label={fieldConfig.label}
            htmlFor={fieldName}
            key={fieldName}
            error={errors[fieldName]}
          >
            <Controller
              rules={fieldConfig.validation}
              name={fieldName}
              control={control}
              render={({
                field: { onChange, value, ...restFieldProps },
                fieldState: { invalid },
              }) => {
                return (
                  <select
                    {...restFieldProps}
                    value={typeof value === "string" ? value : ""}
                    onChange={onChange} // Ensure onChange is explicitly set
                  >
                    {fieldConfig.placeholder && (
                      <option value="" disabled>
                        {fieldConfig.placeholder}
                      </option>
                    )}
                    {(fieldConfig.options || []).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }}
            />
          </Field>
        );
    }
  }

  return (
    <div className="px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        {categoryFields.map((fieldName) => {
          const fieldConfig = fieldMap[fieldName];
          return renderField(fieldName, fieldConfig);
        })}

        <Field>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </Field>
      </form>
    </div>
  );
};
