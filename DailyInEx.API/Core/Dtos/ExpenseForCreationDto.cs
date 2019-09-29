using System;
using System.ComponentModel.DataAnnotations;

namespace DailyInEx.API.Core.Dtos
{
    public class ExpenseForCreationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Please enter amount")]
        public double Amount { get; set; }
        public bool IsCash { get; set; }
        public bool IsCheck { get; set; }
        public string CheckNo { get; set; }
        public string BankName { get; set; }
        public string Particular { get; set; }
        [Required(ErrorMessage = "Please enter date")]
        public DateTime Date { get; set; }
        public int UserId { get; set; }
    }
}