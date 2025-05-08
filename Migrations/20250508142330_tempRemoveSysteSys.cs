using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class tempRemoveSysteSys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "systemSettings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "systemSettings",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CEIRID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RODate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RONo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ediPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_systemSettings", x => x.id);
                });
        }
    }
}
