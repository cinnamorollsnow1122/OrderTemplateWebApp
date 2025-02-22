import React, { useState } from 'react';
import '../style/CreateOrderForm.css';
import { createOrder } from '../service/apiService'; // Import the createOrder function

const CreateOrderForm = ({ onClose, onOrderCreated }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        unitPrice: '',
        quantity: '',
        orderDate: '' // Add orderDate to the state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Update the specific field in the formData object
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = {
            ...formData,
            unitPrice: parseFloat(formData.unitPrice),
            quantity: parseInt(formData.quantity),
            // orderDate is already in the correct format from the input
        };

        try {
            const createdOrder = await createOrder(newOrder); // Call the API to create the order
            onOrderCreated(createdOrder); // Notify the parent component
            onClose(); // Close the form
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="createOrderForm">
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        name="customerName" // Use name attribute to identify the field
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Unit Price:</label>
                    <input
                        type="number"
                        name="unitPrice" // Use name attribute to identify the field
                        value={formData.unitPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity" // Use name attribute to identify the field
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Order Date:</label>
                    <input
                        type="date"
                        name="orderDate" // Use name attribute to identify the field
                        value={formData.orderDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateOrderForm;



