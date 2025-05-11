using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMaccsCeiridName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MACCSCEIRID",
                table: "CustomsDatas",
                newName: "MaccsCEIRID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaccsCEIRID",
                table: "CustomsDatas",
                newName: "MACCSCEIRID");
        }
    }
}
