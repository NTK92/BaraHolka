using Microsoft.EntityFrameworkCore.Migrations;

namespace Kyrs.Migrations
{
    public partial class Version5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "receiverid",
                table: "messages",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "receiverid",
                table: "messages");
        }
    }
}
