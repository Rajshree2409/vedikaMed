const fetch = globalThis.fetch;

const baseUrl = 'http://www.zipmedicine.com/api';

const tests = [
  {
    name: 'VendorListB2C',
    method: 'GET',
    path: 'VendorListB2C',
  },
  {
    name: 'ProductDataNewB2CExt',
    method: 'GET',
    path: 'ProductDataNewB2CExt',
    params: { vendorId: '1028' },
  },
  {
    name: 'ProductDataSearchNew',
    method: 'GET',
    path: 'ProductDataSearchNew',
    params: { vendorId: '1028' },
  },
  {
    name: 'OrderDataUsingUserIdExtNew',
    method: 'GET',
    path: 'OrderDataUsingUserIdExtNew',
    params: { userId: 'test-user' },
  },
  {
    name: 'findAdddressUsingUserId',
    method: 'GET',
    path: 'findAdddressUsingUserId',
    params: { userId: 'test-user' },
  },
  {
    name: 'UserForLogin',
    method: 'POST',
    path: 'UserForLogin',
    body: {
      CreatedDate: '1-1-2025',
      LastUpdate: '1-1-2025',
      MobileNumber: '9999999999',
      Mode: 'Customer',
      Status: 'Active',
    },
  },
  {
    name: 'OtpNew',
    method: 'POST',
    path: 'OtpNew',
    params: { mobileNumber: '9999999999', hashKey: 'web-client' },
  },
  {
    name: 'RetailerDetailsExtNew',
    method: 'GET',
    path: 'RetailerDetailsExtNew',
    params: { userId: 'test-user' },
  },
  {
    name: 'WalletData',
    method: 'GET',
    path: 'WalletData',
    params: { userId: 'test-user' },
  },
  {
    name: 'OrderCancel',
    method: 'POST',
    path: 'OrderCancel',
    body: { OrderId: 'test-order' },
  },
  {
    name: 'AddressInsert',
    method: 'POST',
    path: 'AddressInsert',
    body: {
      Address: 'Test Address',
      AddressFor: 'B2C',
      AddressType: 'Home',
      City: 'Test City',
      District: 'Test District',
      LastUpdate: '1-1-2025',
      Latitude: '0',
      Location: 'Test Location',
      Longitud: '0',
      MobileNumber: '9999999999',
      Name: 'Test User',
      Pincode: '000000',
      State: 'Test State',
      UserId: 'test-user',
    },
  },
  {
    name: 'AddressDelete',
    method: 'POST',
    path: 'AddressDelete',
    body: { AddressId: 'test-address' },
  },
  {
    name: 'ProfileUpdateUser',
    method: 'POST',
    path: 'ProfileUpdateUser',
    body: {
      Address: 'Test Address',
      City: 'Test City',
      EmailId: 'test@example.com',
      LastUpdate: '1-1-2025',
      Name: 'Test User',
      PinCode: '000000',
      UserId: 'test-user',
    },
  },
];

const buildUrl = (path, params = {}) => {
  const url = new URL(`${baseUrl}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

(async () => {
  for (const test of tests) {
    console.log(`\n=== ${test.name} ===`);
    try {
      const url = buildUrl(test.path, test.params);
      const options = {
        method: test.method,
        headers: { Accept: 'application/json, text/plain, */*' },
      };
      if (test.body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(test.body);
      }
      const res = await fetch(url, options);
      const text = await res.text();
      console.log('status', res.status);
      console.log('content-type', res.headers.get('content-type'));
      console.log('bodyPreview', text.slice(0, 400).replace(/\s+/g, ' ').trim());
    } catch (error) {
      console.log('error', error.message);
    }
  }
})();