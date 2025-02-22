import { useEffect, useState } from 'react';
import './style/App.css';
import { fetchOrderData, createOrder } from './service/apiService'; // Import the service
import CreateOrderForm from './components/CreateOrderForm'; // Import the CreateOrderForm

function App() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [isCreateOrderFormVisible, setCreateOrderFormVisible] = useState(false);

    //load orders data when first load the page
    useEffect(() => {
        const loadOrders = async () => {
            try{
                const data = await fetchOrderData(); //call from apiService.jsx
                setOrders(data);
                console.log(data);
            }catch(error){
                console.error('Error fetching orders:', error);
            }
        };
        loadOrders();
    }, []);

    const handleCreateOrder = () => {
        setCreateOrderFormVisible(true); // Show the create order form
    };

    const handleOrderCreated = (newOrder) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]); // Add the new order to the list
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const contents = orders.length === 0
    ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
    : (
        <>
            <button class ="CreateOrderButton" onClick={handleCreateOrder}>
                Create Order
            </button>
            <div  className="table-container">
                <table className="data-table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName}</td>
                                <td>{order.unitPrice}</td>
                                <td>{order.quantity}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
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