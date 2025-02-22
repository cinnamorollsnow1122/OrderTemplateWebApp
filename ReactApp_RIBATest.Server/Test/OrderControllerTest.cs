using Microsoft.EntityFrameworkCore;
using ReactApp_RIBATest.Server.Data;
using ReactApp_RIBATest.Server.Interface;
using Xunit;

namespace ReactApp_RIBATest.Server.Test
{
    public class OrderControllerTest
    {
        private readonly IOrderRepository _orderRepository;

        public OrderControllerTest(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [Fact]
        public async Task CreateOrder_ShouldAddOrder(){



            

        }





    }
}
