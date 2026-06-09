const DEV_PROXY_BASE = "/api";
const REMOTE_API_BASE = "http://www.zipmedicine.com/api";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);
const LOCAL_PROXY_MISS_PATTERN = /Cannot\s+(GET|POST|PUT|DELETE|PATCH)\s+\/api\//i;
const TRUTHY_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

const isLocalHostName = (hostname) => {
  if (!hostname) {
    return false;
  }

  if (LOCAL_HOSTS.has(hostname)) {
    return true;
  }

  return /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);
};

const STORAGE_KEYS = {
  pendingOtp: "medapp.pendingOtp",
  selectedVendor: "medapp.selectedVendor",
  session: "medapp.session",
  orderHistory: "medapp.orderHistory",
};

export const DEFAULT_VENDOR = {
  vendorId: "1028",
  vendorName: "Software House",
};

const CATEGORY_KEYWORDS = {
  Bottle: ["bottle", "drop"],
  Capsules: ["capsule"],
  Injection: ["injection", "vial", "ampoule", "ampul"],
  Insulin: ["insulin", "flexpen", "penfill"],
  Medicine: ["tablet", "medicine", "strip"],
  Syrup: ["syrup", "suspension"],
  capsule: ["capsule", "softgel", "gelatin"],
};

const pad = (value) => String(value).padStart(2, "0");

const getConfiguredBase = () => (process.env.REACT_APP_MEDAPP_API_BASE || "").trim();

const shouldUseDevProxy = () => {
  const proxyPreference = (process.env.REACT_APP_MEDAPP_USE_PROXY || "").trim().toLowerCase();

  if (proxyPreference) {
    return TRUTHY_ENV_VALUES.has(proxyPreference);
  }

  if (typeof window !== "undefined" && isLocalHostName(window.location.hostname)) {
    return true;
  }

  return process.env.NODE_ENV === "development";
};

const DEFAULT_ACCOUNT_API_BASE = REMOTE_API_BASE;

const getApiBase = () => {
  const configuredBase = getConfiguredBase();

  if (configuredBase) {
    return configuredBase.replace(/\/+$/, "");
  }

  if (shouldUseDevProxy()) {
    return DEV_PROXY_BASE;
  }

  return REMOTE_API_BASE;
};

const buildUrlWithBase = (baseUrl, path, params = {}) => {
  const effectiveBase = safeString(baseUrl).replace(/\/+$/, "") || getApiBase() || DEFAULT_ACCOUNT_API_BASE;
  const trimmedPath = safeString(path).replace(/^\/+/, "");
  const url = new URL(`${effectiveBase}/${trimmedPath}`, typeof window !== "undefined" ? window.location.origin : "http://localhost");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const safeString = (value) => {
  if (value === null || value === undefined || value === "null") {
    return "";
  }

  return String(value).trim();
};

const firstNonEmpty = (...values) => values.map(safeString).find(Boolean) || "";

const toNumber = (value, fallback = 0) => {
  const numericValue = Number.parseFloat(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

const asArray = (value) => (Array.isArray(value) ? value : []);

const getOrderItemQuantity = (item = {}) => toNumber(item.Quantity ?? item.quantity ?? item.qty ?? item.Qty ?? item.TotalQty, 1);

const getTotalOrderedQty = (order = {}) => {
  const items = asArray(order.Items || order.items || order.OrderItems || order.orderItems);
  const fromItems = items.reduce((sum, item) => sum + getOrderItemQuantity(item), 0);

  if (fromItems > 0) {
    return fromItems;
  }

  return toNumber(order.TotalQty ?? order.totalQty ?? order.Quantity ?? order.quantity, 0);
};

const readStorage = (key, fallbackValue = null) => {
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

const writeStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  if (value === null || value === undefined || value === "") {
    window.localStorage.removeItem(key);
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const buildUrl = (path, params = {}) => {
  const trimmedPath = safeString(path).replace(/^\/+/, "");
  const url = new URL(`${getApiBase()}/${trimmedPath}`, typeof window !== "undefined" ? window.location.origin : "http://localhost");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const parseResponseBody = async (response) => {
  const text = await response.text();
  const trimmedText = text.trim();

  if (!trimmedText) {
    return null;
  }

  try {
    return JSON.parse(trimmedText);
  } catch (error) {
    return trimmedText;
  }
};

const createApiError = (response, data) => {
  const proxyMissMessage =
    typeof data === "string" && LOCAL_PROXY_MISS_PATTERN.test(data)
      ? "The current server is not proxying `/api` requests. Run the app with `npm start`, or point `REACT_APP_MEDAPP_API_BASE` to a working backend/proxy URL."
      : "";

  const detail =
    proxyMissMessage ||
    (typeof data === "string"
      ? data
      : firstNonEmpty(data?.message, data?.Message, data?.error, data?.Error, response.statusText));

  const error = new Error(detail || `Request failed with status ${response.status}`);
  error.status = response.status;
  error.data = data;
  return error;
};

const createFetchError = (error) => {
  const noBackendConfigured =
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== "development" &&
    !getConfiguredBase();

  if (error instanceof TypeError && noBackendConfigured) {
    return new Error(
      "API requests failed. This usually happens when the app is running outside `npm start` without a working backend proxy. " +
        "Run the app with `npm start`, or set `REACT_APP_MEDAPP_API_BASE` to a backend URL that supports cross-origin requests."
    );
  }

  return error;
};

const request = async (path, { method = "GET", body, params } = {}) => {
  try {
    const response = await fetch(buildUrl(path, params), {
      method,
      headers: {
        Accept: "application/json, text/plain, */*",
        ...(body !== undefined && body !== null ? { "Content-Type": "application/json" } : {}),
      },
      ...(body !== undefined && body !== null ? { body: JSON.stringify(body) } : {}),
    });

    const data = await parseResponseBody(response);

    if (!response.ok) {
      throw createApiError(response, data);
    }

    return data;
  } catch (error) {
    throw createFetchError(error);
  }
};

const requestWithBase = async (baseUrl, path, { method = "GET", body, params } = {}) => {
  try {
    const response = await fetch(buildUrlWithBase(baseUrl, path, params), {
      method,
      headers: {
        Accept: "application/json, text/plain, */*",
        ...(body !== undefined && body !== null ? { "Content-Type": "application/json" } : {}),
      },
      ...(body !== undefined && body !== null ? { body: JSON.stringify(body) } : {}),
    });

    const data = await parseResponseBody(response);

    if (!response.ok) {
      throw createApiError(response, data);
    }

    return data;
  } catch (error) {
    throw createFetchError(error);
  }
};

const getDateStamp = (date = new Date()) => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

const getDateTimeStamp = (date = new Date()) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const extractFirstRecord = (payload) => {
  if (Array.isArray(payload)) {
    return payload[0] || {};
  }

  return payload || {};
};

const extractImageUrl = (product) => {
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

export const normalizeVendor = (vendor = {}) => ({
  address: firstNonEmpty(vendor.Address, vendor.addreess, vendor.address),
  city: firstNonEmpty(vendor.City, vendor.city),
  mobileNumber: firstNonEmpty(vendor.MobileNumber, vendor.mobileNo, vendor.mobileNumber),
  pinCode: firstNonEmpty(vendor.PinCode, vendor.pincode),
  qrCode: firstNonEmpty(vendor.UpiQrCode, vendor.qrcode),
  state: firstNonEmpty(vendor.State, vendor.state),
  vendorId: firstNonEmpty(vendor.VendorId, vendor.vendorId),
  vendorName: firstNonEmpty(vendor.VendorName, vendor.vendorName),
});

export const normalizeUserProfile = (payload) => {
  const profile = extractFirstRecord(payload);

  return {
    address: firstNonEmpty(profile.Address),
    city: firstNonEmpty(profile.City),
    email: firstNonEmpty(profile.EmailId, profile.EmailID, profile.Email),
    name: firstNonEmpty(profile.Name),
    phoneNumber: firstNonEmpty(profile.MobileNumber),
    pinCode: firstNonEmpty(profile.PinCode, profile.Pincode),
    userId: firstNonEmpty(profile.UserId, profile.ID),
  };
};

export const normalizeVendorUserData = (payload) => {
  const record = extractFirstRecord(payload);

  return {
    categories: asArray(record.categoryList),
    mobileNumber: firstNonEmpty(record.MobileNumber),
    name: firstNonEmpty(record.Name),
    retailerData: asArray(record.retailerData),
    retailerDataIsConfirm: asArray(record.retailerDataIsConfirm),
  };
};

export const normalizeAddress = (address = {}) => ({
  address: firstNonEmpty(address.Address),
  addressId: firstNonEmpty(address.AddressId, address.ID),
  addressType: firstNonEmpty(address.AddressType),
  city: firstNonEmpty(address.City),
  district: firstNonEmpty(address.District),
  latitude: firstNonEmpty(address.Latitude, address.latitude),
  location: firstNonEmpty(address.Location),
  longitude: firstNonEmpty(address.Longitud, address.Longitude, address.longitude),
  mobileNumber: firstNonEmpty(address.MobileNumber),
  name: firstNonEmpty(address.Name),
  pinCode: firstNonEmpty(address.Pincode, address.PinCode),
  state: firstNonEmpty(address.State),
});

export const normalizeRetailer = (payload) => {
  const retailer = extractFirstRecord(payload);

  return {
    contactName: firstNonEmpty(retailer.ContactName),
    customerId: firstNonEmpty(retailer.CustomerID, retailer.CustomerId, retailer.ID),
    customerMobile: firstNonEmpty(retailer.CustomerMobile),
    district: firstNonEmpty(retailer.District),
    email: firstNonEmpty(retailer.EmailID),
    gstNo: firstNonEmpty(retailer.GSTNo),
    licenseNo: firstNonEmpty(retailer.LicenseNo),
    panNo: firstNonEmpty(retailer.PanNo),
    pinCode: firstNonEmpty(retailer.Pincode, retailer.PinCode),
    shopAddress: firstNonEmpty(retailer.CustomerAddress),
    shopName: firstNonEmpty(retailer.CustomerName),
    state: firstNonEmpty(retailer.State),
    station: firstNonEmpty(retailer.Station),
  };
};

export const normalizeWallet = (payload) => {
  const walletRoot = extractFirstRecord(payload);
  const walletFinalData = walletRoot.walletFinalData || {};

  return {
    balance: toNumber(walletFinalData.RemainAmount),
    history: asArray(walletRoot.walletHistory).map((item) => ({
      amount: toNumber(item.CreditOrDebitAmount ?? item.Amount),
      creditOrDebit: firstNonEmpty(item.CreditOrDebit),
      date: firstNonEmpty(item.LastUpdate, item.CreatedDate, item.PaymentDate),
      paymentId: firstNonEmpty(item.PaymentId),
      remarks: firstNonEmpty(item.Remarks),
      remainAmount: toNumber(item.RemainAmount),
    })),
    name: firstNonEmpty(walletRoot.Name),
  };
};

export const normalizeOrder = (order = {}) => {
  const items = asArray(order.Items || order.items || order.OrderItems || order.orderItems);
  const totalQty = getTotalOrderedQty(order);
  const explicitProductCount = toNumber(
    firstNonEmpty(order.NumberOfProduct, order.TotalNumberOfProduct, order.numberOfProducts),
    0
  );

  return {
    address: firstNonEmpty(order.Address, order.DeliveryAddress, order.address),
    addressType: firstNonEmpty(order.AddressType, order.addressType),
    city: firstNonEmpty(order.City, order.city),
    createdAt: firstNonEmpty(order.PaymentDate, order.OrderDate, order.CreatedDate, order.createdAt),
    district: firstNonEmpty(order.District, order.district),
    invoiceStatus: firstNonEmpty(order.InvoiceStatus, order.invoiceStatus),
    items,
    mobileNumber: firstNonEmpty(order.MobileNumber, order.DeliveryMobileNumber, order.mobileNumber),
    name: firstNonEmpty(order.Name, order.CustomerName, order.name),
    numberOfProducts: explicitProductCount || totalQty || 0,
    orderId: firstNonEmpty(order.OrderPrimaryId, order.orderId),
    orderStatus: firstNonEmpty(order.OrderStaus, order.OrderStatus, order.Status, order.Staus, order.orderStatus),
    paidAmount: toNumber(order.PaidAmount, toNumber(order.paidAmount)),
    paymentId: firstNonEmpty(order.PaymentId, order.paymentId),
    pinCode: firstNonEmpty(order.Pincode, order.pinCode),
    raw: order,
    shippingFee: toNumber(order.ShipingFee, toNumber(order.shippingFee)),
    state: firstNonEmpty(order.State, order.state),
    totalDiscount: toNumber(order.PriceDiscounts, toNumber(order.totalDiscount)),
    totalMrp: toNumber(order.IemTotalMrp, toNumber(order.ItemTotalMrp), toNumber(order.totalMrp)),
    totalQty,
    totalSaving: toNumber(order.TotalSaving, toNumber(order.totalSaving)),
    vendorId: firstNonEmpty(order.VendorId, order.vendorId),
  };
};

export const normalizeProduct = (product = {}) => {
  const mrp = toNumber(product.MRP ?? product.mrp);
  const sellingPrice = toNumber(product.SellingPrice ?? product.sellingPrice);

  return {
    brandName: firstNonEmpty(product.BrandName, product.brand),
    categoryName: firstNonEmpty(product.CategoryName, product.categoryName),
    discount: Math.max(mrp - sellingPrice, 0),
    excelProductId: firstNonEmpty(product.ExcelProdId, product.excelId),
    imageUrl: extractImageUrl(product),
    maxOrderQty: firstNonEmpty(product.MaxOrderQty, product.maxorder),
    minOrderQty: firstNonEmpty(product.MinOrderQty, product.minorder),
    mrp,
    packingSize: firstNonEmpty(product.PackingSize, product.packingUnit),
    price: sellingPrice,
    productChildId: firstNonEmpty(product.ProductChildId, product.productChildId),
    productId: firstNonEmpty(product.ProductId, product.productId),
    productName: firstNonEmpty(product.productMergeName, product.ProductName, product.productmergeName),
    raw: product,
    stars: 4,
    stock: firstNonEmpty(product.Stock, product.stock),
    subcategoryName: firstNonEmpty(product.SubcategoryName, product.subcategoryName),
    searchableText: [
      firstNonEmpty(product.productMergeName, product.ProductName, product.productmergeName),
      firstNonEmpty(product.BrandName, product.brand),
      firstNonEmpty(product.CategoryName, product.categoryName),
      firstNonEmpty(product.SubcategoryName, product.subcategoryName),
      firstNonEmpty(product.PackingSize, product.packingUnit),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
    unit: firstNonEmpty(product.PackingSize, product.packingUnit),
  };
};

export const matchesProductCategory = (product, categoryKey) => {
  const source = `${product.searchableText || ""} ${safeString(product.categoryName)} ${safeString(product.subcategoryName)}`.toLowerCase();
  const keywords = CATEGORY_KEYWORDS[categoryKey] || [safeString(categoryKey).toLowerCase()];

  return keywords.some((keyword) => source.includes(keyword.toLowerCase()));
};

export const pickPreferredVendor = (vendorList, preferredVendor) => {
  const normalizedVendors = vendorList.map(normalizeVendor).filter((vendor) => vendor.vendorId);
  const preferredVendorId = preferredVendor?.vendorId || DEFAULT_VENDOR.vendorId;

  return (
    normalizedVendors.find((vendor) => vendor.vendorId === preferredVendorId) ||
    normalizedVendors.find((vendor) => vendor.vendorId === DEFAULT_VENDOR.vendorId) ||
    normalizedVendors[0] ||
    DEFAULT_VENDOR
  );
};

export const buildLoginPayload = (mobileNumber) => ({
  CreatedDate: getDateStamp(),
  LastUpdate: getDateStamp(),
  MobileNumber: safeString(mobileNumber),
  Mode: "Customer",
  Status: "Active",
});

export const buildProfilePayload = (userId, values) => ({
  Address: safeString(values.address),
  City: safeString(values.city),
  EmailId: safeString(values.email),
  LastUpdate: getDateStamp(),
  Name: safeString(values.name),
  PinCode: safeString(values.pinCode),
  UserId: safeString(userId),
});

export const buildAddressPayload = (userId, values) => ({
  Address: safeString(values.address),
  AddressFor: "B2C",
  AddressType: safeString(values.addressType || "Home"),
  City: safeString(values.city),
  District: safeString(values.district),
  LastUpdate: getDateStamp(),
  Latitude: safeString(values.latitude),
  Location: safeString(values.location),
  Longitud: safeString(values.longitude),
  MobileNumber: safeString(values.mobileNumber),
  Name: safeString(values.name),
  Pincode: safeString(values.pinCode),
  State: safeString(values.state),
  UserId: safeString(userId),
});

export const buildRetailerPayload = (userId, values, vendors = []) => ({
  ContactName: safeString(values.contactName),
  CustomerAddress: safeString(values.shopAddress),
  CustomerMobile: safeString(values.customerMobile),
  CustomerName: safeString(values.shopName),
  District: safeString(values.district),
  EmailID: safeString(values.email),
  ExtVendorMappings: vendors.map((vendor) => ({
    LastUpdate: getDateStamp(),
    RequestDate: getDateStamp(),
    SetDefault: "0",
    Status: safeString(vendor.vendorId) === DEFAULT_VENDOR.vendorId ? "1" : "0",
    VendorId: safeString(vendor.vendorId),
  })),
  GSTNo: safeString(values.gstNo),
  LastUpdate: getDateTimeStamp(),
  LicenseNo: safeString(values.licenseNo),
  PanNo: safeString(values.panNo),
  Pincode: safeString(values.pinCode),
  State: safeString(values.state),
  Station: safeString(values.station),
  Status: "0",
  UserId: safeString(userId),
});

export const buildWalletPayload = (userId, values) => ({
  CreditOrDebit: "Credit",
  CreditOrDebitAmount: safeString(values.amount),
  LastUpdate: getDateTimeStamp(),
  PaymentId: safeString(values.paymentId),
  ReferalId: "",
  Remarks: safeString(values.remarks),
  RemainAmount: "",
  UserId: safeString(userId),
  WalletCategoryId: "101",
});

export const readStoredPendingOtp = () => readStorage(STORAGE_KEYS.pendingOtp, null);

export const readStoredSession = () => readStorage(STORAGE_KEYS.session, null);

export const readStoredVendor = () => readStorage(STORAGE_KEYS.selectedVendor, DEFAULT_VENDOR);

export const writeStoredPendingOtp = (pendingOtp) => writeStorage(STORAGE_KEYS.pendingOtp, pendingOtp);

export const writeStoredSession = (session) => writeStorage(STORAGE_KEYS.session, session);

export const writeStoredVendor = (vendor) => writeStorage(STORAGE_KEYS.selectedVendor, vendor);

export const sendOtp = async (mobileNumber, hashKey = "web-client") => {
  const data = await request("OtpNew", {
    method: "POST",
    params: {
      hashKey,
      mobileNumber: safeString(mobileNumber),
    },
  });

  const otp = safeString(data).replace(/^"(.*)"$/, "$1");
  return otp;
};

export const loginUser = async (mobileNumber) => {
  const data = await request("UserForLogin", {
    body: buildLoginPayload(mobileNumber),
    method: "POST",
  });

  return {
    mobileNumber: firstNonEmpty(data?.MobileNumber, mobileNumber),
    userId: firstNonEmpty(data?.UserId, data?.ID),
  };
};

export const fetchVendorList = async () => {
  const data = await request("VendorListB2C");
  return asArray(data).map(normalizeVendor);
};

export const fetchVendorUserData = async (userId, vendorId) => {
  const data = await request("UserDataNewUsingVendor", {
    params: {
      userId: safeString(userId),
      vendorId: safeString(vendorId),
    },
  });

  return normalizeVendorUserData(data);
};

export const fetchUserProfile = async (userId) => {
  const data = await request("UserData", {
    params: {
      userId: safeString(userId),
    },
  });

  return normalizeUserProfile(data);
};

export const updateUserProfile = async (userId, values) => {
  const data = await request("ProfileUpdateUser", {
    body: buildProfilePayload(userId, values),
    method: "POST",
  });

  return data;
};

export const buildAccountPayload = (userId, values) => ({
  UserId: safeString(userId),
  Name: safeString(values.name),
  EmailId: safeString(values.email),
  Address: safeString(values.address),
  City: safeString(values.city),
  PinCode: safeString(values.pinCode),
  ServerUrl: safeString(values.serverUrl),
  LastUpdate: getDateTimeStamp(),
});

export const saveAccountDetails = async (serverUrl, userId, values) => {
  const base = safeString(serverUrl) || getApiBase() || DEFAULT_ACCOUNT_API_BASE;
  const data = await requestWithBase(base, "ProfileUpdateUser", {
    body: buildProfilePayload(userId, values),
    method: "POST",
  });

  return data;
};

export const fetchAddresses = async (userId) => {
  const data = await request("findAdddressUsingUserId", {
    params: {
      userId: safeString(userId),
    },
  });

  return asArray(data).map(normalizeAddress);
};

export const saveAddress = async (userId, values) => {
  const data = await request("AddressInsert", {
    body: buildAddressPayload(userId, values),
    method: "POST",
  });

  return data;
};

export const deleteAddress = async (addressId) => {
  const data = await request("AddressDelete", {
    body: {
      AddressId: safeString(addressId),
    },
    method: "POST",
  });

  return data;
};

export const createOrder = async (orderData) => {
  const data = await request("OrderExtInsertNew", {
    body: orderData,
    method: "POST",
  });

  return data;
};

export const cancelOrder = async (orderId) => {
  const data = await request("OrderCancel", {
    body: {
      OrderId: safeString(orderId),
    },
    method: "POST",
  });

  return data;
};

export const fetchRetailerDetails = async (userId) => {
  const data = await request("RetailerDetailsExtNew", {
    params: {
      userId: safeString(userId),
    },
  });

  return normalizeRetailer(data);
};

export const saveRetailerDetails = async (userId, values, vendors) => {
  const data = await request("RetailerDataInsertExtNew", {
    body: buildRetailerPayload(userId, values, vendors),
    method: "POST",
  });

  return data;
};

export const saveRetailerDetailsWithUrl = async (serverUrl, userId, values, vendors) => {
  const base = safeString(serverUrl) || getApiBase() || DEFAULT_ACCOUNT_API_BASE;
  const data = await requestWithBase(base, "RetailerDataInsertExtNew", {
    body: buildRetailerPayload(userId, values, vendors),
    method: "POST",
  });

  return data;
};

export const saveWalletDetailsWithUrl = async (serverUrl, userId, values) => {
  const base = safeString(serverUrl) || getApiBase() || DEFAULT_ACCOUNT_API_BASE;
  const data = await requestWithBase(base, "WalletAmountAdd", {
    body: buildWalletPayload(userId, values),
    method: "POST",
  });

  return data;
};

export const fetchWalletData = async (userId) => {
  const data = await request("WalletData", {
    params: {
      userId: safeString(userId),
    },
  });

  return normalizeWallet(data);
};

export const addWalletAmount = async (userId, values) => {
  const data = await request("WalletAmountAdd", {
    body: buildWalletPayload(userId, values),
    method: "POST",
  });

  return data;
};

export const mergeOrderHistoryEntries = (serverOrders = [], localOrders = []) => {
  const merged = [...asArray(serverOrders).map(normalizeOrder), ...asArray(localOrders).map(normalizeOrder)];

  const byKey = new Map();

  merged.forEach((order) => {
    const key = safeString(order.orderId || order.paymentId || order.createdAt || `${order.paidAmount}-${order.numberOfProducts}`);

    if (!key) {
      return;
    }

    const current = byKey.get(key);

    if (!current) {
      byKey.set(key, order);
      return;
    }

    const currentStatus = safeString(current.orderStatus).toLowerCase();
    const incomingStatus = safeString(order.orderStatus).toLowerCase();
    const isCancelled = incomingStatus === "cancelled" || incomingStatus === "canceled";
    const wasCancelled = currentStatus === "cancelled" || currentStatus === "canceled";

    byKey.set(key, {
      ...current,
      ...order,
      orderStatus: isCancelled ? order.orderStatus : wasCancelled ? current.orderStatus : order.orderStatus,
    });
  });

  return Array.from(byKey.values()).sort((left, right) => {
    const leftTime = new Date(left.createdAt || 0).getTime();
    const rightTime = new Date(right.createdAt || 0).getTime();
    return rightTime - leftTime;
  });
};

export const getStoredOrderHistory = () => asArray(readStorage(STORAGE_KEYS.orderHistory)).map(normalizeOrder);

export const saveOrderToHistory = (order = {}) => {
  const normalized = normalizeOrder(order);
  const existing = getStoredOrderHistory();
  const next = mergeOrderHistoryEntries(existing, [normalized]);

  writeStorage(STORAGE_KEYS.orderHistory, next);
  return next;
};

export const updateStoredOrderStatus = (orderId, status) => {
  const existing = getStoredOrderHistory();
  const next = existing.map((entry) =>
    safeString(entry.orderId) === safeString(orderId)
      ? { ...entry, orderStatus: safeString(status) || entry.orderStatus }
      : entry
  );

  writeStorage(STORAGE_KEYS.orderHistory, next);
  return next;
};

export const fetchOrders = async (userId) => {
  try {
    const data = await request("OrderDataUsingUserIdExtNew", {
      params: {
        userId: safeString(userId),
      },
    });

    return mergeOrderHistoryEntries(asArray(data).map(normalizeOrder), getStoredOrderHistory());
  } catch (error) {
    const fallback = getStoredOrderHistory();

    if (fallback.length) {
      return fallback;
    }

    throw error;
  }
};

export const fetchProducts = async (vendorId) => {
  const data = await request("ProductDataNewB2CExt", {
    params: {
      vendorId: safeString(vendorId),
    },
  });

  return asArray(data).map(normalizeProduct);
};

export const searchProducts = async (vendorId) => {
  const data = await request("ProductDataSearchNew", {
    params: {
      vendorId: safeString(vendorId),
    },
  });

  return asArray(data).map(normalizeProduct);
};
