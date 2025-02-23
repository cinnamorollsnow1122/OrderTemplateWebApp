import React, { useState, useEffect, useDebugValue } from 'react';
import '../style/CreateOrderForm.css'; //can seperate the edit form css if need
import { editOrder } from '../service/apiService';

const EditOrderForm = ({ onClose, onOrderUpdated, order}) => {
    const [formData, setFormData] = useState({
        customerName: '',
        unitPrice: 0.01,
        quantity: 1,
        orderDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (order) {
            setFormData({
                customerName: order.customerName,
                unitPrice: order.unitPrice,
                quantity: order.quantity,
                orderDate: new Date(order.orderDate).toISOString().split('T')[0]
            });
        }
    }, [order]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            ...formData,
            unitPrice: parseFloat(formData.unitPrice),
            quantity: parseInt(formData.quantity),
            orderId: order.orderId // Include the orderId for editing
        };

        try {
            const editedOrder = await editOrder(updatedOrder); 
            onOrderUpdated(editedOrder); 
            onClose(); 
        } catch (error) {
            console.error('Error editing order:', error);
        }
    };

    return (
        <div className="createOrderForm">
            <h2>Edit Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        name="customerName"
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
                        min="0.01"
                        step="0.01"
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
                        onChange={handleChange}
                        min="1"
                        required
                    />
                    {formData.quantity <= 0 && (
                        <span className="error"> Quantity must be greater than 0</span>
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
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};
export default EditOrderForm;
