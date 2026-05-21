/**
 * API Helper Functions and Utilities
 * Contains helper functions used throughout the application
 */

// String manipulation utilities
export const safeString = (value) => {
  if (value === null || value === undefined || value === "null") {
    return "";
  }
  return String(value).trim();
};

export const firstNonEmpty = (...values) => values.map(safeString).find(Boolean) || "";

export const toNumber = (value, fallback = 0) => {
  const numericValue = Number.parseFloat(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const asArray = (value) => (Array.isArray(value) ? value : []);

// Storage utilities
export const readStorage = (key, fallbackValue = null) => {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
};

export const writeStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  if (value === null || value === undefined || value === "") {
    window.localStorage.removeItem(key);
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

// Date utilities
export const pad = (value) => String(value).padStart(2, "0");

export const getDateStamp = (date = new Date()) => 
  `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export const getDateTimeStamp = (date = new Date()) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

// Formatting utilities
export const formatCurrency = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

// Error and response parsing
export const extractFirstRecord = (payload) => {
  if (Array.isArray(payload)) {
    return payload[0] || {};
  }
  return payload || {};
};

export const extractImageUrl = (product) => {
  const nestedImage = asArray(product?.newdata)
    .flatMap((entry) => [entry?.ImageLink, entry?.imageLink, entry?.link, entry?.Link])
    .map(safeString)
    .find(Boolean);

  return firstNonEmpty(
    product?.subcategoryImgLink,
    product?.subcategoryimage,
    product?.SubcategoryImgLink,
    nestedImage
  );
};

// Avatar and text utilities
export const createAvatarLabel = (text) =>
  (text || "V")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

// Session and phone utilities
export const getSessionPhone = (session) => session?.mobileNumber || session?.phoneNumber || "";

export const getSessionName = (session) => session?.name || "";

// Error message helper
export const getErrorMessage = (error, fallbackMessage) => 
  error instanceof Error ? error.message : fallbackMessage;
