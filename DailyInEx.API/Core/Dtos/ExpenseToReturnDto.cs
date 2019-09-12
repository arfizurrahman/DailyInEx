using System;

namespace DailyInEx.API.Core.Dtos
{
    public class ExpenseToReturnDto
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public bool IsCash { get; set; }
        public bool IsCheck { get; set; }
        public string CheckNo { get; set; }
        public string BankName { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
    }
}