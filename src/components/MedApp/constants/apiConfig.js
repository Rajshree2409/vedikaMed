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
  // Authentication
  LOGIN: "UserForLogin",
  OTP: "OtpNew",

  // User Management
  USER_DATA: "UserData",
  USER_DATA_NEW: "UserDataNew",
  PROFILE_UPDATE: "ProfileUpdateUser",
  FIND_MODE: "FindMode",

  // Products
  PRODUCT_DATA: "ProductData",
  PRODUCT_DATA_SEARCH: "ProductDataSearch",
  PRODUCT_DATA_SEARCH_NEW: "ProductDataSearchNew",
  PRODUCT_DATA_SEARCH_TEMP: "ProductDataSearchTemp",
  PRODUCT_DATA_NEW_B2C_EXT: "ProductDataNewB2CExt",
  PRODUCT_DATA_NEW_B2C_BY_SUBCATEGORY: "ProductDataNewB2CExtBySubCategory",
  PRODUCT_DATA_NEW_B2C_BY_SUBCATEGORY_PAGING: "ProductDataNewB2CExtBySubCategoryWithPaging",
  PRODUCT_DATA_NEW_BY_ID: "ProductDataNewById",
  PRODUCT_DATA_BY_ID_NEW_B2C_EXT: "ProductDataByIdNewB2CExt",
  PRODUCT_DATA_SEARCH_EXT_NEW: "ProductDataSearchExtNew",
  PRODUCT_DATA_SEARCH_NEW_WITH_PAGING: "ProductDataSearchNewWithPaging",
  PRODUCT_REVIEW_SAVE_EXT: "ProductReviewSaveExt",
  EXT_PRODUCT_RATING: "ExtProductRatingApi",

  // Vendors
  VENDOR_LIST_B2C: "VendorListB2C",
  VENDOR_LIST_B2B: "VendorListB2B",
  VENDOR_MAPPED_WITH_CUSTOMER: "VendorMappedWithCustomer",
  VENDOR_MAPPING_INSERT_UPDATE_EXT: "VendorMappingInsertUpdateExt",

  // Retailers
  RETAILER_DATA_INSERT: "RetailerDataInsert",
  RETAILER_DATA_INSERT_EXT_NEW: "RetailerDataInsertExtNew",
  RETAILER_DETAILS: "RetailerDetails",
  RETAILER_DETAILS_EXT_NEW: "RetailerDetailsExtNew",

  // Orders - B2C
  ORDER_EXT_INSERT_NEW: "OrderExtInsertNew",
  ORDER_CANCEL: "OrderCancel",
  ORDER_CANCEL_EXT_NEW: "OrderCancelExtNew",
  ORDER_DATA_USING_ORDER_ID: "OrderDataUsingOrderId",
  ORDER_DATA_USING_ORDER_ID_EXT_NEW_B2C: "OrderDataUsingOrderIdExtNewB2C",
  ORDER_DATA_USING_USER_ID: "OrderDataUsingUserId",
  ORDER_DATA_USING_USER_ID_EXT_NEW: "OrderDataUsingUserIdExtNew",
  STATUS_UPDATE: "StatusUpdate",
  DELETE_DRAFT_ORDER: "DeleteDraftOrder",

  // Orders - B2B
  ORDER_INSERT_B2B: "OrderInsertB2B",
  ORDER_INSERT_B2B_NEW: "OrderInsertB2BNew",
  ORDER_UPDATE_B2B_MODE: "OrderUpdateB2BMode",
  ORDER_UPDATE_INSERT_B2B_EXT: "OrderUpdateInsertB2BExt",
  ORDER_CANCEL_B2B: "OrderCancelB2B",
  ORDER_DATA_USING_ORDER_ID_B2B: "OrderDataUsingOrderIdB2B",
  ORDER_DATA_USING_ORDER_ID_B2B_EXT_NEW: "OrderDataUsingOrderIdB2BExtNew",
  ORDER_DATA_USING_ID_B2B_DRAFT: "OrderDataUsingIdB2BDraft",
  ORDER_DATA_USING_ID_B2B_DRAFT_EXT_NEW: "OrderDataUsingIdB2BDraftExtNew",
  ORDER_DATA_USING_ID_B2B_CONFIRM: "OrderDataUsingIdB2BConfirm",
  ORDER_COUNT_ITEM_B2B: "orderCountItemB2B",
  ORDER_COUNT_ITEM_B2B_EXT_NEW: "orderCountItemB2BExtNew",
  ORDER_COUNT_ITEM_B2B_BY_VENDOR_EXT_NEW: "orderCountItemB2BByVendorExtNew",

  // Addresses
  ADDRESS_INSERT: "AddressInsert",
  ADDRESS_UPDATE: "AddressUpdate",
  ADDRESS_DELETE: "AddressDelete",
  FIND_ADDRESS_USING_USER_ID: "findAdddressUsingUserId",
  FIND_ADDRESS_USING_USER_ID_LABTEST: "findAdddressUsingUserIdLabTest",
  FIND_ADDRESS_USING_ADDRESS_ID: "findAdddressUsingAddressId",

  // Doctor appointments
  DOCTOR_LIST: "DoctorList",
  DOCTOR_LIST_BY_ID: "DoctorListById",
  DOCTOR_DAY_LIST: "DoctorDayList",
  DOCTOR_SLOT: "DoctorSlot",
  DOCTOR_SLOT_NEW: "DoctorSlotNew",
  DOCTOR_APPOINTMENT_BOOKING_EXT: "DoctorAppointmentBookingExt",
  DOCTOR_APPOINTMENT_CANCEL_EXT: "DoctorAppointmentCancelExt",
  SLOT_BOOKING_BY_ID: "SlotBookingById",
  SLOT_BOOKING_NEW: "SlotBookingNew",
  DOCTOR_PREC_LAB_DATA_FOR_PRINT: "DoctorPrecLabDataForPrint",

  // Lab tests
  LAB_TEST_PRODUCT_LIST_BY_VENDOR: "LabTestProductListByVendor",
  LAB_TEST_PRODUCT_DETAILS_BY_ID: "LabTestProductDetailsById",
  LAB_LIST_INFORMATION_OF_VENDOR: "LabListInformationOfVendor",
  LAB_SLOT_NEW: "LABSlotNew",
  LAB_TEST_ORDER_INSERT_UPDATE: "LabTestOrderInsertUpdate",
  LAB_TEST_ORDER_CANCEL: "LabTestOrderCancel",
  ORDER_LIST_LAB_TEST: "OrderListLabTest",
  ORDER_PREVIEW_LAB_TEST: "OrderPrivewLabTest",

  // Coupons & categories
  COUPON_DETAILS: "CouponDetails",
  FIND_SUBCATEGORY_USING_CATEGORY_ID: "FindSubCategoryUsingCategoryId",
  FIND_SUBCATEGORY_USING_CATEGORY_ID_USING_VENDOR: "FindSubCategoryUsingCategoryIdUsingVendor",

  // Wallet
  WALLET_DATA: "WalletData",
  WALLET_AMOUNT_ADD: "WalletAmountAdd",

  // Misc / legacy
  PRODUCT_DATA_NEW_B2C_EXT_BY_SUBCATEGORY_WITH_PAGING: "ProductDataNewB2CExtBySubCategoryWithPaging",
  PRODUCT_DATA_SEARCH_TEMP_ALT: "ProductDataSearchTemp",
};

// External services used by the app
export const EXTERNAL_APIS = {
  SHIPROCKET_CREATE_ADHOC: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
  GOOGLE_MAPS_AUTOCOMPLETE: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  GOOGLE_MAPS_GEOCODE: "https://maps.googleapis.com/maps/api/geocode/json",
  RAZORPAY: "https://api.razorpay.com",
};

// Helper to build full URL for a named endpoint
export function buildApiUrl(key, base = REMOTE_API_BASE) {
  const ep = API_ENDPOINTS[key];
  if (!ep) return null;
  return `${base}/${ep}`;
}
