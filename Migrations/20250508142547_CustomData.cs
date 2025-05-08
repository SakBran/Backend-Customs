using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class CustomData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomsDatas",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MyProperty = table.Column<int>(type: "int", nullable: false),
                    ReceivedDatetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MACCSCEIRID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RONo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RODate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SentDatetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EditBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomsDatas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "systemSettings",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ediPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CEIRID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RONo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RODate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RF = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_systemSettings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomsDatas");

            migrationBuilder.DropTable(
                name: "systemSettings");
        }
    }
}
