using Microsoft.AspNetCore.Mvc;
using ReactApp_RIBATest.Server.Interface;
using ReactApp_RIBATest.Server.Model;

namespace ReactApp_RIBATest.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _orderRepository.GetOrdersAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            return order;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(Order order)
        {
            await _orderRepository.AddOrderAsync(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            await _orderRepository.DeleteOrderAsync(id);
            return NoContent();
        }

    }
}
