using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThermoWell.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailVerificationFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailVerificationToken",
                table: "UserProfiles",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EmailVerificationTokenGeneratedAt",
                table: "UserProfiles",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsEmailVerified",
                table: "UserProfiles",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailVerificationToken",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "EmailVerificationTokenGeneratedAt",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "IsEmailVerified",
                table: "UserProfiles");
        }
    }
}
