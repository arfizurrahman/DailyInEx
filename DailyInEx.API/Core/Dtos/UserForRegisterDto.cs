using System.ComponentModel.DataAnnotations;

namespace DailyInEx.API.Core.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Please enter name")]
        public string Name { get; set; }
        public string UserName { get; set; }
        [Required(ErrorMessage = "Please enter email")]
        public string Email { get; set; }

        [Required (ErrorMessage = "Please enter password")]
        [StringLength(10, MinimumLength = 8, ErrorMessage = "Password must be between 8 to 10 characters")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter address")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Please select country")]
        public string Country { get; set; }
    }
}