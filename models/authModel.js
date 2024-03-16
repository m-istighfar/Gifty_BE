const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class authModel {
  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
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

  static generateToken(userId) {
    const secret = process.env.JWT_SIGN;
    return jwt.sign({ userId }, secret, { expiresIn: "1h" });
  }
}

module.exports = authModel;
