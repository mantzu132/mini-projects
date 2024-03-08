import { Category, ProductConfig } from "./types.ts";

export const fields: Record<Category, Array<keyof ProductConfig>> = {
  electronics: [
    "modelNumber",
    "powerRequirement",
    "color",
    "warrantyYears",
    "includesBattery",
  ],
  clothes: ["size", "color", "material", "careInstructions", "gender"],
  books: ["ISBN", "author", "publisher", "genre", "publicationYear", "format"],
};

export type FieldData = {
  label: string;
  type: string;
  validation?: {
    required?: string;
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
  };
  allowCustomValue?: boolean;
  options?: string[];
  placeholder?: string;
};

export const fieldMap: Record<keyof ProductConfig, FieldData> = {
  // Electronics
  modelNumber: {
    label: "Model Number",
    type: "text",
    validation: {
      required: "Model number is required",
    },
  },
  powerRequirement: {
    label: "Power Requirement",
    type: "text",
    validation: {
      required: "Power requirement is required",
    },
    placeholder: "e.g., 100V-240V",
  },
  color: {
    label: "Color",
    type: "select",
    options: ["Black", "White", "Silver"],
    validation: {
      required: "Color selection is required",
    },
  },
  warrantyYears: {
    label: "Warranty Years",
    type: "number",
    validation: {
      required: "Warranty period is required", // Note: Changed from object to direct message for consistency
      min: {
        value: 1,
        message: "Warranty period must be at least 1 year",
      },
      max: {
        value: 5,
        message: "Warranty period must be no more than 5 years",
      },
    },
    placeholder: "e.g., 2",
  },

  includesBattery: {
    label: "Includes Battery",
    type: "checkbox",
    validation: {
      required: "Selection is required",
    },
  },

  // Clothes
  size: {
    label: "Size",
    type: "select",
    options: ["S", "M", "L", "XL"],
    validation: {
      required: "Size selection is required",
    },
  },
  material: {
    label: "Material",
    type: "select",
    options: ["Cotton", "Polyester", "Wool"],
    validation: {
      required: "Material selection is required",
    },
  },
  careInstructions: {
    label: "Care Instructions",
    type: "text",
    placeholder: "e.g., Machine wash cold",
  },
  gender: {
    label: "Gender",
    type: "select",
    options: ["Men", "Women", "Unisex"],
    validation: {
      required: "Gender selection is required",
    },
  },

  // Books
  ISBN: {
    label: "ISBN",
    type: "text",
    validation: {},
  },
  author: {
    label: "Author",
    type: "text",
    validation: {},
  },
  publisher: {
    label: "Publisher",
    type: "text",
    validation: {},
  },
  genre: {
    label: "Genre",
    type: "select",
    options: ["Fiction", "Non-fiction", "Mystery"],
    validation: {},
  },
  publicationYear: {
    label: "Publication Year",
    type: "number",
    validation: {},
    placeholder: "e.g., 2021",
  },
  format: {
    label: "Format",
    type: "select",
    options: ["Hardcover", "Paperback"],
    validation: {},
  },
};
