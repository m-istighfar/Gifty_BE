const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DoneModel {
  static async markWishlistAsDone(wishlistId) {
    return prisma.wishlist.update({
      where: { id: wishlistId },
      data: { isDone: true },
    });
  }

  static async getAllDoneWishlists() {
    return prisma.wishlist.findMany({
      where: { isDone: true },
    });
  }

  static async getCollaboratorsForWishlist(wishlistId) {
    return prisma.collaborator.findMany({
      where: { wishlistId },
      include: { user: true },
    });
  }
}

module.exports = DoneModel;
