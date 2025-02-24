using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactApp_RIBATest.Server.Model
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }  // Primary Key

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;  // should set as only store as DateTime.Date in db

        [Required]
        [MaxLength(100)]
        public string CustomerName { get; set; }  // Customer placing the order

        [Required]
        public decimal UnitPrice { get; set; }  // Price per unit

        [Required]
        public int Quantity { get; set; }  // Number of units ordered, if number too large, suggest to use long in case of overflow


    }
}
