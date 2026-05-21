/**
 * API Configuration and Constants
 */

export const DEFAULT_VENDOR = {
  vendorId: "1028",
  vendorName: "Software House",
};

// API Base URLs
export const DEV_PROXY_BASE = "/api";
export const REMOTE_API_BASE = "http://www.zipmedicine.com/api";
export const DEFAULT_ACCOUNT_API_BASE = "https://dummy-server-url.com/api";

// Local host detection
export const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);
export const LOCAL_PROXY_MISS_PATTERN = /Cannot\s+(GET|POST|PUT|DELETE|PATCH)\s+\/api\//i;
export const TRUTHY_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

// Storage keys
export const STORAGE_KEYS = {
  pendingOtp: "medapp.pendingOtp",
  selectedVendor: "medapp.selectedVendor",
  session: "medapp.session",
};

// Category keywords for product filtering
export const CATEGORY_KEYWORDS = {
  Bottle: ["bottle", "drop"],
  Capsules: ["capsule"],
  Injection: ["injection", "vial", "ampoule", "ampul"],
  Insulin: ["insulin", "flexpen", "penfill"],
  Medicine: ["tablet", "medicine", "strip"],
  Syrup: ["syrup", "suspension"],
  capsule: ["capsule", "softgel", "gelatin"],
};

// Common API endpoints
export const API_ENDPOINTS = {
  OTP: "OtpNew",
  LOGIN: "UserForLogin",
  USER_DATA: "UserData",
  VENDOR_LIST: "VendorListB2C",
  VENDOR_USER_DATA: "UserDataNewUsingVendor",
  PROFILE_UPDATE: "ProfileUpdateUser",
  ADDRESS_FETCH: "UserAddressData",
  ADDRESS_SAVE: "AddressAdd",
  ADDRESS_DELETE: "AddressDelete",
  ORDERS_FETCH: "UserOrders",
  PRODUCTS_FETCH: "ProductsData",
  PRODUCTS_SEARCH: "ProductSearch",
  RETAILER_FETCH: "RetailerData",
  RETAILER_SAVE: "RetailerAdd",
  WALLET_FETCH: "UserWalletData",
  WALLET_SAVE: "WalletAdd",
};
