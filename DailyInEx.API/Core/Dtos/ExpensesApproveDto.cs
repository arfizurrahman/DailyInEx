namespace DailyInEx.API.Core.Dtos
{
    public class ExpensesApproveDto
    {
        public int[] ExpenseIds { get; set; }
        public bool ApproveAll { get; set; }
    }
}