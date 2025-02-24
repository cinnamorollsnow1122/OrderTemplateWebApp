using Microsoft.AspNetCore.Mvc;
using Moq;
using ReactApp_RIBATest.Server.Controllers;
using ReactApp_RIBATest.Server.Interface;
using ReactApp_RIBATest.Server.Model;
using Xunit;
using Xunit.Abstractions;

namespace ReactApp_RIBATest.Server.Test
{
    public class OrderControllerTest
    {
        private readonly Mock<IOrderRepository> _mockOrderService;
        private readonly OrderController _controller;
        private readonly ITestOutputHelper _output;

        //can apply more unit test or integration test cases for APIs
        public OrderControllerTest(ITestOutputHelper output)
        {
            _mockOrderService = new Mock<IOrderRepository>();
            _controller = new OrderController(_mockOrderService.Object);
            _output = output;

        }

        //unit test for API GET Order VIEW
        [Fact]
        public async Task GetOrders_WithListOfOrdersView()
        {
            // Arrange
            var orders = new List<Order>
            {
                new Order { OrderId = 1, CustomerName = "Alice", OrderDate = new DateTime(2023, 1, 1), Quantity = 1, UnitPrice = 1 },
                new Order { OrderId = 2, CustomerName = "Alice2", OrderDate = new DateTime(2023, 1, 2), Quantity = 2, UnitPrice = 2 }
            }.AsEnumerable();

            _mockOrderService.Setup(m => m.GetOrdersAsync()).ReturnsAsync(orders);

            // Act
            var result = await _controller.GetOrdersView();

            _output.WriteLine("Result:"+ result.GetType());
            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<OrderView>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnedOrders = Assert.IsAssignableFrom<IEnumerable<OrderView>>(okResult.Value);

            Assert.Equal(2, returnedOrders.Count());

            //can implement more test for object details..

        }
         //for TDD approach to do calculator 
        [Fact]
        public async Task GetOrderWithCalculatedCost_UnitRange(){
            var testCases = new (int quantity, decimal expected)[] {
                //1-9, 1st phase
                (9, 9),
                (8, 8),
                (1, 1),
                //10-19, 2nd phase
                (15, 14.25m),
                (10, 9.5m),
                (19, 18.05m),
                //20-30, 3rd phase           
                (20, 18),
                (30, 27),
                (25, 22.5m),
                //>30, 4th phase
                (40, 33.5m),
                (31, 26.3m),
                (33, 27.9m)
            };

            foreach(var item in testCases){
                var order = new Order
                {
                    //Arrange
                    UnitPrice = 1,
                    Quantity = item.quantity
                };

                var orderView = new OrderView(order);

                decimal result = orderView.CalculateDiscount(order.UnitPrice, order.Quantity);
                Assert.Equal(item.expected, result);
            }
        }


    }
}
