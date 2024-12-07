const employeeResolvers = require("../resolvers/employeeResolvers");
const authResolvers = require("../resolvers/authResolvers");

const mutations = {
  addEmployee: employeeResolvers.addEmployee,
  updateEmployee: employeeResolvers.updateEmployee,
  login: authResolvers.login,
  signup: authResolvers.signup,
};

module.exports = mutations;
