using Microsoft.EntityFrameworkCore.Migrations;

namespace DailyInEx.API.Migrations
{
    public partial class AddColumnIsDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Incomes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Expenses",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Expenses");
        }
    }
}
