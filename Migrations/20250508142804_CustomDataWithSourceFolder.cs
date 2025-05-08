using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class CustomDataWithSourceFolder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ediPath",
                table: "systemSettings",
                newName: "sourceFolder");

            migrationBuilder.AddColumn<string>(
                name: "completeFolder",
                table: "systemSettings",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "completeFolder",
                table: "systemSettings");

            migrationBuilder.RenameColumn(
                name: "sourceFolder",
                table: "systemSettings",
                newName: "ediPath");
        }
    }
}
