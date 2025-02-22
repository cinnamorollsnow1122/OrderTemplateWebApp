using ReactApp_RIBATest.Server.Model;

namespace ReactApp_RIBATest.Server.Interface
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(Order order);
        Task DeleteOrderAsync(int id);
    }
}
