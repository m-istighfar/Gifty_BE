const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PollModel {
  static async validateWishlistAndOptions(userId, wishlistId, optionIds) {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: parseInt(wishlistId) },
    });

    if (!wishlist || wishlist.userId !== userId) {
      return false;
    }

    const options = await prisma.item.findMany({
      where: {
        id: { in: optionIds },
        wishlistId: parseInt(wishlistId),
      },
    });

    return options.length === optionIds.length;
  }

  static async createPollWithOptionIds(title, wishlistId, optionIds) {
    const poll = await prisma.poll.create({
      data: {
        title,
        wishlistId: parseInt(wishlistId),
      },
    });

    await Promise.all(
      optionIds.map((optionId) =>
        prisma.item.update({
          where: { id: optionId },
          data: { pollId: poll.id },
        })
      )
    );

    return poll;
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

  static async getAllPolls() {
    try {
      const polls = await prisma.poll.findMany({
        include: { items: true },
      });
      return polls;
    } catch (error) {
      throw new Error("Error fetching polls: " + error.message);
    }
  }

  static async getPollById(pollId) {
    try {
      const poll = await prisma.poll.findUnique({
        where: { id: parseInt(pollId, 10) },
        include: { items: true },
      });
      return poll;
    } catch (error) {
      throw new Error("Error fetching poll by ID: " + error.message);
    }
  }
}

module.exports = PollModel;
