import React, { useState } from 'react';
import '../style/CreateOrderForm.css';
import '../style/App.css'; 
import { createOrder } from '../service/apiService'; // Import the createOrder function

const CreateOrderForm = ({ onClose, onOrderCreated }) => {

    const [formData, setFormData] = useState({
        customerName: '',
        unitPrice: 0.01,
        quantity: 1,
        orderDate: new Date().toISOString().split('T')[0] //this retrieve browser time, more accurately need retrieve server time
    });
    const [quantityError, setQuantityError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Update the specific field in the formData object
        }));
    };

    const handleQuantityChange = (value) => {
        const intValue = parseInt(value, 10);
    
        // Validate the quantity
        if (isNaN(intValue) || intValue < 1) {
            setQuantityError('Quantity must be a positive integer'); // Set error message
        } else {
            setQuantityError(''); // Clear error message
        }
    
        setFormData((prevData) => ({
            ...prevData,
            quantity: intValue
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
                        name="unitPrice" 
                        value={formData.unitPrice}
                        onChange={handleChange}
                        min = "0.01"
                        step = "0.01"
                        required
                    />
                    {formData.unitPrice <= 0 && (
                        <span className="error"> Unit Price must be greater than 0</span>
                    )}
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity" 
                        value={formData.quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        min = "1"
                        step = "1"
                        required
                    />
                    {quantityError && (
                        <span className="error"> {quantityError} </span>
                    )}
                </div>
                <div>
                    <label>Order Date:</label>
                    <input
                        type="date"
                        name="orderDate" 
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



