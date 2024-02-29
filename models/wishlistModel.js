const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class wishlistModel {
  static async findWishlistsByUserId(userId) {
    return prisma.wishlist.findMany({
      where: { userId },
    });
  }

  static async findWishlistByUserId(userId) {
    return prisma.wishlist.findFirst({
      where: { userId },
    });
  }

  static async findWishlistById(wishlistId) {
    return prisma.wishlist.findUnique({
      where: {
        id: parseInt(wishlistId, 20),
      },
    });
  }

  static async createWishlist(title, description, eventDate, type, userId) {
    return prisma.wishlist.create({
      data: {
        title,
        description,
        eventDate,
        type,
        userId,
      },
    });
  }

  static async updateWishlist(wishlistId, title, description, eventDate) {
    return prisma.wishlist.update({
      where: { id: wishlistId },
      data: {
        title,
        description,
        eventDate,
      },
    });
  }

  static async deleteWishlist(wishlistId) {
    return prisma.wishlist.delete({
      where: { id: wishlistId },
    });
  }
}

module.exports = wishlistModel;
