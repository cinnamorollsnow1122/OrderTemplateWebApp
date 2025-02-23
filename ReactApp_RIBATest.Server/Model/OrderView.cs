using Microsoft.EntityFrameworkCore.Design.Internal;

namespace ReactApp_RIBATest.Server.Model
{
    public class OrderView : Order
    {
        public decimal TotalCost { get; set; }

        public OrderView(Order order) { 
            this.OrderId = order.OrderId;
            this.OrderDate = order.OrderDate;
            this.CustomerName = order.CustomerName;
            this.UnitPrice = order.UnitPrice;
            this.Quantity = order.Quantity;
            this.TotalCost = CalculateDiscount(order.UnitPrice, order.Quantity);

        }

        //can put in static extension class for doing calculation if other function also need to call this func
        public decimal CalculateDiscount(decimal price, int quantity) {
            //business rules
            switch(quantity){
                case int n when n >= 10 && n <= 19:
                    return price*n*0.95m;

                case int n when n >= 20 && n <= 30:
                    return price*n*0.9m;

                case int n when n> 30:
                    return price*30*0.85m + price*(n-30)*0.8m;

                default:
                    return price * quantity;
            }
        }


    }
}
