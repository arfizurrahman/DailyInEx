using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyInEx.API.Migrations
{
    public partial class AddNewColumnIsApproved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Incomes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Expenses",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Expenses");
        }
    }
}
