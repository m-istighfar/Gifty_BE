const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class collabModel {
  static async findWishlistById(wishlistId) {
    return prisma.wishlist.findUnique({
      where: {
        id: parseInt(wishlistId),
      },
    });
  }

  static async findUserByUsername(username) {
    return prisma.user.findUnique({
      where: { username: username },
    });
  }

  static async findUserByUserId(userId) {
    return prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
  }
  
  static findCollaborator(wishlistId, collabId) {
    return prisma.collaborator.findUnique({
      where: {
        AND: {
          wishlistId: parseInt(wishlistId),
          userId: parseInt(collabId)
        }
      }
    });
  }

  static async createCollab(wishlistId, collabId) {
    return prisma.collaborator.create({
        data: {
          wishlistId: parseInt(wishlistId),
          userId: parseInt(collabId)
        }
      });
  }
  

  static async generateLink(wishlistId) {
    const iv = crypto.randomBytes(12).toString("hex");

    return {
      wishlistId: wishlistId,
      iv: iv,
    };
  }
}

module.exports = collabModel;
