import { useEffect, useState } from 'react';
import './style/App.css';
import { deleteOrderById, fetchOrderData, fetchOrderDataByYear } from './service/apiService'; // Import the service
import CreateOrderForm from './components/CreateOrderForm'; // Import the CreateOrderForm

function App() {
    const [orders, setOrders] = useState([]);
    const [isCreateOrderFormVisible, setCreateOrderFormVisible] = useState(false);
    //to handle if too many pages
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
    //for filter 2024
    const [FilteredBy2024, setFilteredBy2024] = useState(false);
    const year = 2024;

    //load orders data when first load the page
    const loadOrders = async () => {
        try{
            let data;
            console.log(FilteredBy2024);
            if(!FilteredBy2024){
                 data = await fetchOrderData(); //call from apiService.jsx
            }
            else{
                 data = await fetchOrderDataByYear(year); //call from apiService.jsx
            }
            setOrders(data);
            setCurrentPage(1);
        }catch(error){
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        // Initial load logic 
    }, []); // Empty dependency array
    
    useEffect(() => {
        console.log('FilteredBy2024 changed:', FilteredBy2024);

        loadOrders();
    }, [FilteredBy2024]);

    const handleShowAll = () => {  
        setFilteredBy2024(false); 
    };

    const handleFilter2024 = async () => {
            try{
                setCurrentPage(1);
                setFilteredBy2024(true);
            }catch(error){
                console.error('No 2024 orders found :', error);
            }
    };    

    const handleCreateOrder = () => {
        setCreateOrderFormVisible(true); // Show the create order form
    };

    const handleOrderCreated = (newOrder) => {
        loadOrders(); //need call backed to calculate the cost of new order
        setCurrentPage(1);
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



    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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
                                Order Date {sortOrder === 'asc' ? '↑' : '↓' }
                            </th>
                            <th>Customer Name</th>
                            <th>Cost</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.customerName}</td>
                                <td>{order.totalCost}</td>
                                <td>{order.unitPrice}</td>
                                <td>{order.quantity}</td>
                                <td><button className='delete-button' onClick={() => handleDeleteById(order.orderId)} >🗑️</button>
                                    <button className='edit-button'>✏️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button>Previous Page</button>
                <button>Next Page</button>

                {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
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
        </div>
    );

    /*
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }*/
}

export default App;