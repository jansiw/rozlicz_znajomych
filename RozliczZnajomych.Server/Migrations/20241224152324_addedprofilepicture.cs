using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RozliczZnajomych.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedprofilepicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ProfilePicture",
                table: "Accounts",
                type: "longblob",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Accounts");
        }
    }
}
