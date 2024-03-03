const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class itemModel {
  static async findWishlistById(wishlistId) {
    return prisma.wishlist.findUnique({
      where: {
        id: parseInt(wishlistId),
      },
    });
  }

  static async findItemsByWishlistId(wishlistId) {
    return prisma.item.findMany({
      where: {
        wishlistId: parseInt(wishlistId),
      },
    });
  }

  static async findItemById(itemId) {
    return prisma.item.findUnique({
      where: {
        id: parseInt(itemId),
      },
    });
  }

  static async createItem(name, details, price, link, wishlistId) {
    return prisma.item.create({
      data: {
        name,
        details,
        price,
        link,
        wishlistId: parseInt(wishlistId),
      },
    });
  }

  static async updateItem(itemId, name, details, price, link) {
    return prisma.item.update({
      where: { id: itemId },
      data: {
        name,
        details,
        price,
        link,
      },
    });
  }

  static async deleteItem(itemId) {
    return prisma.item.delete({
      where: { id: itemId },
    });
  }
}

module.exports = itemModel;
