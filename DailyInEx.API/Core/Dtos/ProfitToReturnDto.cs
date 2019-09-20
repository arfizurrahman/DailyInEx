namespace DailyInEx.API.Core.Dtos
{
    public class ProfitToReturnDto
    {
        public int UserId { get; set; }
        public string Month { get; set; }
        public double Income { get; set; }
        public double Expense { get; set; }
        public double Profit { get; set; }
    }
}