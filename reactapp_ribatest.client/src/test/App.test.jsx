import { describe, test, expect, beforeAll, vi } from 'vitest'; // Add `vi` here
import { fetchOrderData } from '../service/apiService';
import API_BASE_URL from '../service/apiConfig';

//can add more integration test case for other apis here for further development

// Mock fetch for using TDD to implement fetchOrderData api
// if have more time can do other api

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true, // Ensure the response is "ok"
      json: () => Promise.resolve([{ orderId: 2, customerName: 'Alice' }]),
    })
  );
});

describe('fetchOrderData', () => {
  test('returns the correct data', async () => {
    const orders = await fetchOrderData();
    expect(orders).toEqual([{ orderId: 2, customerName: 'Alice' }]);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/order`); 
  });

  test('throws an error when the API call fails', async () => {
    // Mock a failed API call
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    // Verify that fetchOrderData throws an error
    await expect(fetchOrderData()).rejects.toThrow('Failed to fetch');
  });

  test('throws an error when the response is not ok', async () => {
    // Mock a response with ok: false
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    // Verify that fetchOrderData throws an error
    await expect(fetchOrderData()).rejects.toThrow('Network response was not ok');
  });

});

