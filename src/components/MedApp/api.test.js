import { mergeOrderHistoryEntries, normalizeOrder, saveAccountDetails } from './api';

describe('saveAccountDetails', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('saves account details through the supported profile update endpoint', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      statusText: 'Created',
      text: jest.fn().mockResolvedValue('{"saved":true}'),
    });

    await saveAccountDetails('http://backend.test/api', '8770', {
      address: 'Test Address',
      city: 'New Delhi',
      email: 'test@example.com',
      name: 'Test User',
      pinCode: '110092',
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [url, options] = global.fetch.mock.calls[0];
    const body = JSON.parse(options.body);

    expect(url).toBe('http://backend.test/api/ProfileUpdateUser');
    expect(options.method).toBe('POST');
    expect(body).toEqual(
      expect.objectContaining({
        Address: 'Test Address',
        City: 'New Delhi',
        EmailId: 'test@example.com',
        Name: 'Test User',
        PinCode: '110092',
        UserId: '8770',
      })
    );
  });
});

describe('mergeOrderHistoryEntries', () => {
  it('keeps newly placed confirmed orders in the history list', () => {
    const serverOrders = [];
    const localOrders = [
      { orderId: 'ORD-100', orderStatus: 'Confirmed', paidAmount: 299 },
    ];

    expect(mergeOrderHistoryEntries(serverOrders, localOrders)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ orderId: 'ORD-100', orderStatus: 'Confirmed', paidAmount: 299 }),
      ])
    );
  });

  it('derives the product count from ordered quantities when the API count is missing', () => {
    const order = {
      orderId: 'ORD-300',
      Items: [
        { Quantity: 2 },
        { Quantity: 1 },
      ],
    };

    expect(normalizeOrder(order)).toEqual(
      expect.objectContaining({
        orderId: 'ORD-300',
        numberOfProducts: 3,
        totalQty: 3,
      })
    );
  });

  it('prefers the latest cancelled status when merging history entries', () => {
    const serverOrders = [
      { orderId: 'ORD-200', orderStatus: 'Confirmed', paidAmount: 399 },
    ];
    const localOrders = [
      { orderId: 'ORD-200', orderStatus: 'Cancelled', paidAmount: 399 },
    ];

    expect(mergeOrderHistoryEntries(serverOrders, localOrders)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ orderId: 'ORD-200', orderStatus: 'Cancelled', paidAmount: 399 }),
      ])
    );
  });
});
