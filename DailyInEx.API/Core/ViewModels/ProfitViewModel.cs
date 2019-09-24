using System.Collections.Generic;

namespace DailyInEx.API.Core.ViewModels
{
    public class ProfitViewModel
    {
        public ICollection<string> Months { get; set; }
        public ICollection<double> Incomes { get; set; }
        public ICollection<double> Expenses { get; set; }
        public ICollection<double> Profits { get; set; }

        public ProfitViewModel()
        {
            Months = new List<string>();
            Incomes = new List<double>();
            Expenses = new List<double>();
            Profits = new List<double>();
        }
    }
}