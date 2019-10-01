namespace DailyInEx.API.Core.Dtos
{
    public class IncomesApproveDto
    {
        public int[] IncomeIds { get; set; }
        public bool ApproveAll { get; set; }
    }
}