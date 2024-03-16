const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class wishlistModel {
  static async findWishlistsByUserId(userId) {
    return prisma.wishlist.findMany({
      where: { userId },
      include: {
        collaborators: {
          select: {
            userId: true,
            user: {
              select: {
                email: true,
                username: true,
              },
            },
          },
        },
      },
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
        id: parseInt(wishlistId),
      },
      include: {
        collaborators: {
          select: {
            userId: true,
            user: {
              select: {
                email: true,
                username: true,
              },
            },
          },
        },
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

  static async createWishlistWithCollaborators(
    title,
    description,
    eventDate,
    type,
    userId,
    collabIds
  ) {
    return prisma.$transaction(async (prisma) => {
      const wishlist = await prisma.wishlist.create({
        data: {
          title,
          description,
          eventDate,
          type,
          userId,
        },
      });

      if (collabIds && collabIds.length > 0) {
        const uniqueCollabIds = [...new Set(collabIds)].filter(
          (id) => id !== userId
        );

        const collaboratorsData = uniqueCollabIds.map((collabId) => {
          return {
            wishlistId: wishlist.id,
            userId: collabId,
          };
        });

        await prisma.collaborator.createMany({
          data: collaboratorsData,
          skipDuplicates: true,
        });
      }

      return prisma.wishlist.findUnique({
        where: { id: wishlist.id },
        include: {
          collaborators: true,
        },
      });
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
