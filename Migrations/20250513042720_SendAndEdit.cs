using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SendAndEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EditDatetime",
                table: "CustomsDatas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SendBy",
                table: "CustomsDatas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SendById",
                table: "CustomsDatas",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EditDatetime",
                table: "CustomsDatas");

            migrationBuilder.DropColumn(
                name: "SendBy",
                table: "CustomsDatas");

            migrationBuilder.DropColumn(
                name: "SendById",
                table: "CustomsDatas");
        }
    }
}
