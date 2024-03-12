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
  
  // static async findCollaborator(wishlistId, collabId) {
  //   return await prisma.collaborator.findMany({
  //     where: {
  //       AND: {
  //         wishlistId: parseInt(wishlistId),
  //         userId: parseInt(collabId)
  //       }
  //     }
  //   });
  // }

  static async createCollab(wishlistId, collabId) {
    try {
      const collab = await prisma.collaborator.create({
        data: {
          wishlistId: parseInt(wishlistId),
          userId: parseInt(collabId)
        }
      });
      
      // const updatedWishlist = await prisma.wishlist.update({
      //   where: { id: parseInt(wishlistId) },
      //   data: {
      //     collaborators: {
      //       connect: { id: parseInt(collabId) }
      //     }
      //   }
      // });

      return collab;
    } catch (error) {
      console.error("Error while creating collaboration:", error);
      throw error;
    }
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
