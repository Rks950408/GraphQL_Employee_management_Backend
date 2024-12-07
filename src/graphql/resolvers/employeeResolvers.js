const { PrismaClient } = require("@prisma/client");
const { isAuthorized } = require("../auth");
const prisma = new PrismaClient();

const employeeResolvers = {
  Query: {
    listEmployees: async (
      _,
      { page = 1, size = 10, filter },
      { user, token }
    ) => {
      // Authorization check
      if (!isAuthorized(user, ["admin"])) {
        throw new Error("Unauthorized");
      }
      const skip = (page - 1) * size;
      const where = filter ? { name: { contains: filter } } : {};
      return prisma.employee.findMany({ skip, take: size, where });
    },
    getEmployee: async (_, { id }, { user, token }) => {
      // Authorization check
      if (!isAuthorized(user, ["admin"])) {
        throw new Error("Unauthorized");
      }
      return prisma.employee.findUnique({ where: { id } });
    },
  },
  Mutation: {
    addEmployee: async (
      _,
      { name, age, class: empClass, subjects, attendance }
    ) => {
      if (!Array.isArray(attendance)) {
        throw new Error("Attendance should be an array of strings");
      }

      const employee = await prisma.employee.create({
        data: {
          name,
          age,
          class: empClass,
          subjects,
          attendance,
        },
      });

      return employee;
    },
    updateEmployee: async (
      _,
      { id, name, age, class: empClass, subjects, attendance }
    ) => {
      const updatedData = {
        name,
        age,
        class: empClass,
        subjects,
        attendance: Array.isArray(attendance) ? attendance : undefined,
      };

      return prisma.employee.update({
        where: { id },
        data: updatedData,
      });
    },
  },
};

module.exports = employeeResolvers;
