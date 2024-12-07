const employeeResolvers = require("../resolvers/employeeResolvers");

const queries = {
  listEmployees: employeeResolvers.listEmployees,
  getEmployee: employeeResolvers.getEmployee,
};

module.exports = queries;
