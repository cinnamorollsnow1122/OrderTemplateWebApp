using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        //further dev: should implement with return more clear status code
        //if the app include user, can include JWT token for user role validation before calling API

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderView>>> GetOrdersView()
        {
            var orders = await _orderRepository.GetOrdersAsync();
            return Ok(orders.Select(x => new OrderView(x)));
        }

        //further dev: can use for specific update later
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            //param validation
            if (id <= 0)
            {
            return BadRequest("ID must be a positive integer.");
            }

            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            return order;
        }

        [HttpGet("GetOrderByYear")]
        public async Task<ActionResult<IEnumerable<OrderView>>> GetOrderViewByYear([FromQuery]int year)
        {
            //param validation
            //can hide the error message if too sensitive and just do logging in server side
            if (year < 1900 || year > 2200)
            {
                return BadRequest("Year must be between 1900 and 2200");
            }

            var orders = await _orderRepository.GetOrdersByYearAsync(year);

            if(orders == null || !orders.Any())
            {
                return NotFound();
            }

            return Ok(orders.Select(x => new OrderView(x)));
        }

        [HttpPost("createOrder")]
        public async Task<IActionResult> AddOrder(Order order)
        {
            await _orderRepository.AddOrderAsync(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }


        [HttpPost("editOrder")]
        public async Task<IActionResult> EditOrder(Order order)
        {
            if (order == null)
            {
                return BadRequest("Edit failed");
            }

            //further dev: can further check more validation for each field in order

            var updateSuccess = await _orderRepository.EditOrderAsync(order);

            if (!updateSuccess)
            {
                return BadRequest("Edit failed");
            }

            return Ok(new { message = "Edit successfully" });

        }



        //can use soft delete if its not sensitive data or its not high volume system
        [HttpDelete("deleteOrder")]
        public async Task<IActionResult> DeleteOrder([FromQuery] int id)
        {
            //param validation
            if (id <= 0)
            {
                return BadRequest("ID must be a positive integer.");
            }

            var order = await _orderRepository.GetOrderByIdAsync(id);

            if (order == null) return NotFound();

            var deleteSuccess = await _orderRepository.DeleteOrderAsync(order);

            if (!deleteSuccess)
            {
                return BadRequest("Delete failed");
            }

            return Ok(new { message = "Order deleted successfully" });

        }

    }
}
