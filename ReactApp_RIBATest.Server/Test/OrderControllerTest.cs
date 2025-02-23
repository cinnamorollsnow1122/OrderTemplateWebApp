using ReactApp_RIBATest.Server.Controllers;
using ReactApp_RIBATest.Server.Interface;
using ReactApp_RIBATest.Server.Model;
using Xunit;

namespace ReactApp_RIBATest.Server.Test
{
    public class OrderControllerTest
    {

        public OrderControllerTest()
        {

        }

        #region Calculation logic unit test

        [Fact]
        public async Task GetOrderWithCalculatedCost_UnitRange(){

            var testCases = new (int quantity, decimal expected)[] {
                //1-9
                (9, 9),
                (8, 8),
                (1, 1),
                //10-19
                (15, 14.25m),
                (10, 9.5m),
                (19, 18.05m),
                //20-30                
                (20, 18),
                (30, 27),
                (25, 22.5m),
                //>30
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

        #endregion

    }
}
