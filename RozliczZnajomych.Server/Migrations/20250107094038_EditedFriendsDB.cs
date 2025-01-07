using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RozliczZnajomych.Server.Migrations
{
    /// <inheritdoc />
    public partial class EditedFriendsDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RequesterId",
                table: "Friends",
                newName: "RequesterName");

            migrationBuilder.RenameColumn(
                name: "AddresseeId",
                table: "Friends",
                newName: "AddresseeName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RequesterName",
                table: "Friends",
                newName: "RequesterId");

            migrationBuilder.RenameColumn(
                name: "AddresseeName",
                table: "Friends",
                newName: "AddresseeId");
        }
    }
}
