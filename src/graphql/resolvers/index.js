const employeeResolvers = require("./employeeResolvers");
const authResolvers = require("./authResolvers");

module.exports = {
  Query: {
    ...employeeResolvers.Query,
  },
  Mutation: {
    ...employeeResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};
