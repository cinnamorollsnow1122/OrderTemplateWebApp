import API_BASE_URL from './apiConfig';

const fetchOrderData = async () => {
    const response = await fetch(`${API_BASE_URL}/order`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

const fetchOrderDataByYear = async (year) => {
    const response = await fetch(`${API_BASE_URL}/order/GetOrderByYear?year=${year}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(`Failed to retrieve order by year: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    return data;
};

const createOrder = async (order) => {
    const response = await fetch(`${API_BASE_URL}/order/createorder`, { 
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

const deleteOrderById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/deleteOrder?id=${id}` ,{
        method: 'DELETE',
        headers:{
                'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        alert(`Order ${id} deleted successfully`);
    }else{
        const errorText = await response.text(); // Get the error message from the response
        alert(`Failed to delete order: ${errorText}`);
        throw new Error(`Failed to delete order ${id} : ${response.status} ${errorText}`);
    }
};


export { fetchOrderData, createOrder, deleteOrderById, fetchOrderDataByYear };