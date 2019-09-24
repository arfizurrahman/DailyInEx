namespace DailyInEx.API.Core.Models
{
    public class Profit
    {
        public int UserId { get; set; }
        public double Income { get; set; }
        public double Expense { get; set; }
        public double TotalProfit { get; set; }
        public int Month { get; set; }
    }
}