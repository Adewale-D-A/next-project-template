export const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ACCEPTED_FILE_TYPES_INPUT = [
  {
    name: "images",
    values: "image/*",
  },
  {
    name: "pdf",
    values: "application/pdf",
  },
  {
    name: "images/pdf",
    values: "image/*,application/pdf",
  },
];
