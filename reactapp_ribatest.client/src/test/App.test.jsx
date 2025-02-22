import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { fetchOrderData } from '../service/apiService'; // Import the service

test('fetchOrderData fetches and returns order data', async () => {
    const orders = await fetchOrderData(); // Call the API function
    expect(orders).toEqual([{ orderId: 1, item: 'Test Order' }]); // Check if the data matches
    expect(fetch).toHaveBeenCalledWith('https://localhost:7178/api/orders'); // Verify the fetch call
});

