const API_BASE_URL = 'https://localhost:7178/api'; // Base URL for the API

const fetchOrderData = async () => {
    const response = await fetch(`${API_BASE_URL}/order`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

const createOrder = async (order) => {
    const response = await fetch(`${API_BASE_URL}/order/createorder`, { // Call the custom endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    const data = await response.json();
    return data; // Return the created order
};


export { fetchOrderData, createOrder };