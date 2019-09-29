using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyInEx.API.Migrations
{
    public partial class AddColumnParticular : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Particular",
                table: "Incomes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Particular",
                table: "Expenses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Particular",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "Particular",
                table: "Expenses");
        }
    }
}
