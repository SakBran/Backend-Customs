using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class authCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ceirPortalName",
                table: "systemSettings",
                newName: "PaymentConfirmationURL_CEIR");

            migrationBuilder.AddColumn<string>(
                name: "AuthorizationTokenURL_CEIR",
                table: "systemSettings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorizationTokenURL_CEIR",
                table: "systemSettings");

            migrationBuilder.RenameColumn(
                name: "PaymentConfirmationURL_CEIR",
                table: "systemSettings",
                newName: "ceirPortalName");
        }
    }
}
