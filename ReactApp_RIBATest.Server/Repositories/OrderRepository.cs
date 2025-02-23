using Microsoft.EntityFrameworkCore;
using ReactApp_RIBATest.Server.Data;
using ReactApp_RIBATest.Server.Interface;
using ReactApp_RIBATest.Server.Model;

namespace ReactApp_RIBATest.Server.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddOrderAsync(Order order)
        {
            try
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                //do logging for further development
            }
        }

        public async Task<bool> EditOrderAsync(Order order)
        {
            try
            {
                var existingOrder = await _context.Orders.FindAsync(order.OrderId);
                if (existingOrder == null) return false; // can return sepecific msg to controller if need

                _context.Entry(existingOrder).CurrentValues.SetValues(order);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                //do logging for further development

            }

            return false;

        }

        public async Task<bool> DeleteOrderAsync(Order order)
        {
            try
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
                return true;
                
            }
            catch (Exception ex)
            {
                //do logging for further development
            }

            return false;

        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders.OrderBy(x => x.OrderDate).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByYearAsync(int year)
        {
            return await _context.Orders.Where(x => x.OrderDate.Year == year).OrderBy(x => x.OrderDate).ToListAsync();
        }

    }
}
