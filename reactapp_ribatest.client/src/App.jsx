import { useEffect, useState } from 'react';
import './style/App.css';
import { deleteOrderById, fetchOrderData, fetchOrderDataByYear } from './service/apiService'; // Import the service
import CreateOrderForm from './components/CreateOrderForm'; // Import the CreateOrderForm
import EditOrderForm from './components/EditOrderForm'; 

//further dev: need to set access rights for delete, edit, create, view action
function App() {
    const [orders, setOrders] = useState([]);
    const [isCreateOrderFormVisible, setCreateOrderFormVisible] = useState(false);
    //foredit
    const [isEditOrderFormVisible, setIsEditOrderFormVisible] = useState(false); 
    const [selectedOrder, setSelectedOrder] = useState(null); 
    //to handle if too many pages
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
    //for filter 2024
    //further dev: cache the loaded filter data if 2024 data is some legacy data.
    const [FilteredBy2024, setFilteredBy2024] = useState(false);
    const year = 2024;

    //load orders data when first load the page
    const loadOrders = async () => {
        try{
            let data;
            if(!FilteredBy2024){
                 data = await fetchOrderData(); //call from apiService.jsx
            }
            else{
                 data = await fetchOrderDataByYear(year); //call from apiService.jsx
            }
            setOrders(data);
        }catch(error){
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        // Initial load logic 
    }, []); // Empty dependency array
    
    useEffect(() => {
        loadOrders();
        setCurrentPage(1);
    }, [FilteredBy2024]);

    const handleShowAll = () => {  
        setFilteredBy2024(false); 
    };

    const handleFilter2024 = async () => {
            try{
                setFilteredBy2024(true);
            }catch(error){
                console.error('No 2024 orders found :', error);
            }
    };    

    const handleCreateOrder = () => {
        setCreateOrderFormVisible(true); // Show the create order form
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order); // Set the selected order
        setIsEditOrderFormVisible(true); // Show the edit form
    };

    const handleOrderCreated = () => {
        loadOrders(); //need call backed to calculate the cost of new order
        setCurrentPage(1); //after created, should go to the latest page
    };

    const handleOrderEdited = () => {
        loadOrders(); //need call backed to calculate the cost of new order
    };

    const handleDeleteById = async (id) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this order (Id:${id})?`);
        if (!isConfirmed) {
            return; // Exit if the user cancels
        }
        //call delete api
        await deleteOrderById(id);
        // Refresh the orders list
        loadOrders();
        setCurrentPage(1);//further dev: should calculate the current page after delete
    };

    const sortOrders = () => {
        const sortedOrders = [...orders].sort((a, b) => {
            const dateA = new Date(a.orderDate);
            const dateB = new Date(b.orderDate);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setOrders(sortedOrders);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    };

    //handle for display date format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
        return `${day}/${month}/${year}`; // Combine into ddMMyy format
    };

    //handle page number
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go to the previous page
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
            setCurrentPage(currentPage + 1); // Go to the next page
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber); // Update the current page state
    };

    const contents = orders.length === 0
    ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
    : (
        <>

            <div  className="table-container">
            <button className="ShowAllButton" onClick={handleShowAll}> Show All </button>
            <button className="FilterYearButton" onClick={handleFilter2024}> FilterBy2024 </button>
            <button className ="CreateOrderButton" onClick={handleCreateOrder}>
                Create Order
            </button>
                <table className="data-table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th onClick={sortOrders} style={{ cursor: 'pointer' }}>
                                Order Date (dd/MM/yy) {sortOrder === 'asc' ? '↑' : '↓' }
                            </th>
                            <th>Customer Name</th>
                            <th>Cost</th>
                            {/*<th>Unit Price</th>*/}
                            {/*<th>Quantity</th>*/}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{formatDate(order.orderDate)}</td>
                                <td>{order.customerName}</td>
                                <td>{order.totalCost}</td>
                                {/*<td>{order.unitPrice}</td>*/}
                                {/*<td>{order.quantity}</td>*/}
                                <td><button className='delete-button' onClick={() => handleDeleteById(order.orderId)} >🗑️</button>
                                <button className='edit-button' onClick={() => handleEditOrder(order)}>✏️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)} >Next Page</button>
            </div>
        </>
    );
    
    return (
        <div>
            <h1 id="tableLabel">Orders</h1>
            {contents}
            {isCreateOrderFormVisible && (
                <CreateOrderForm 
                    onClose={() => setCreateOrderFormVisible(false)} 
                    onOrderCreated={handleOrderCreated} 
                />
            )}

            {isEditOrderFormVisible && (
                <EditOrderForm
                onClose={() => setIsEditOrderFormVisible(false)}
                onOrderUpdated={handleOrderEdited}
                order={selectedOrder}
            />
            )}
        </div>
    );

}

export default App;