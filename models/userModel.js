const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userModel {
  static async isUsernameTaken(username, userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      return Boolean(user && user.id !== userId);
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      throw new Error("Database error checking username");
    }
  }

  static async updateUserUsername(userId, username) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { username, hasSetUsername: true },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async findPaymentInfoByUserId(userId) {
    return prisma.paymentInfo.findFirst({
      where: { userId },
    });
  }

  static async findPaymentInfoById(paymentInfoId) {
    return prisma.paymentInfo.findUnique({
      where: {
        id: parseInt(paymentInfoId, 10),
      },
    });
  }

  static async createPaymentInfo(
    userId,
    paymentMethod,
    accountHolder,
    accountNumber
  ) {
    try {
      const result = await prisma.$transaction([
        prisma.paymentInfo.create({
          data: {
            userId,
            paymentMethod,
            accountHolder,
            accountNumber: accountNumber.toString(),
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { hasSetPayment: true },
        }),
      ]);

      return result[0];
    } catch (error) {
      console.error("Error during payment information creation:", error);
      throw new Error("Failed to create payment information and update user.");
    }
  }

  static async updatePaymentInfo(
    paymentInfoId,
    paymentMethod,
    accountHolder,
    accountNumber
  ) {
    return prisma.paymentInfo.update({
      where: { id: paymentInfoId },
      data: {
        paymentMethod,
        accountHolder,
        accountNumber: accountNumber.toString(),
      },
    });
  }

  static async findAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
        },
      });
      return users;
    } catch (error) {
      console.error("Error fetching all users from database:", error);
      throw new Error("Database error fetching all users");
    }
  }

  static async findUserById(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          profileImage: true,
          wishlists: true,
          paymentInfos: true,
          collaborators: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Database error fetching user by ID");
    }
  }
}

module.exports = userModel;
