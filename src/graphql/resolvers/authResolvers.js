const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const authResolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return token;
    },

    // Signup resolver
    signup: async (_, { username, password, role }) => {
      // Validate input
      if (!username || !password || !role) {
        throw new Error("All fields are required: username, password, role");
      }

      // Check if username is already taken
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        throw new Error("Username is already taken");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role,
        },
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return token; 
    },
  },
};

module.exports = authResolvers;
