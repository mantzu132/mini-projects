type ElectronicsConfig = {
  modelNumber: string;
  powerRequirement: string; // e.g., "100V-240V"
  color: string; // e.g., "Black", "White", "Silver"
  warrantyYears: number; // e.g., 1, 2, 3
  includesBattery: boolean;
};

type ClothesConfig = {
  size: string; // e.g., "S", "M", "L", "XL"
  color: string; // e.g., "Red", "Blue", "Green"
  material: string; // e.g., "Cotton", "Polyester", "Wool"
  careInstructions: string; // e.g., "Machine wash cold", "Hand wash only"
  gender: string; // e.g., "Men", "Women", "Unisex"
};

type BooksConfig = {
  ISBN: string;
  author: string;
  publisher: string;
  genre: string; // e.g., "Fiction", "Non-fiction", "Mystery"
  publicationYear: number;
  format: string; // e.g., "Hardcover", "Paperback"
};

export type ProductConfig = ElectronicsConfig & ClothesConfig & BooksConfig;
export type Category = "electronics" | "clothes" | "books";
