const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PollModel {
  static async createPoll(userId, title, wishlistId) {
    try {
      const isUserWishlist = await this.isUserWishlist(userId, wishlistId);
      if (!isUserWishlist) {
        throw new Error(
          "You are not authorized to create a poll for this wishlist."
        );
      }

      const poll = await prisma.poll.create({
        data: {
          title,
          wishlistId: parseInt(wishlistId, 10),
        },
      });

      const items = await prisma.item.findMany({
        where: {
          wishlistId: parseInt(wishlistId, 10),
        },
      });

      for (const item of items) {
        await prisma.item.update({
          where: { id: item.id },
          data: { pollId: poll.id },
        });
      }

      return poll;
    } catch (error) {
      throw new Error("Error creating poll: " + error.message);
    }
  }

  static async isUserWishlist(userId, wishlistId) {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: parseInt(wishlistId, 10) },
      select: { userId: true },
    });

    if (!wishlist) {
      return false;
    }

    return wishlist.userId === userId;
  }
}

module.exports = PollModel;
