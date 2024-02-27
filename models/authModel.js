const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
  static async createUser(email, name, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findUserByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new Error(error.message);
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

  static generateToken(userId) {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ userId }, secret, { expiresIn: "1h" });
  }
}

module.exports = UserModel;
