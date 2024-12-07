const { gql } = require("apollo-server");

const typeDefs = gql`
  type Employee {
    id: Int
    name: String
    age: Int
    class: String
    subjects: [String]
    attendance: [String]
  }

  type User {
    id: Int
    username: String
    role: String
  }

  type Query {
    listEmployees(page: Int, size: Int, filter: String): [Employee!]
    getEmployee(id: Int): Employee
  }

  type Mutation {
    addEmployee(
      name: String
      age: Int
      class: String
      subjects: [String]
      attendance: [String]
    ): Employee
    updateEmployee(
      id: Int
      name: String
      age: Int
      class: String
      subjects: [String]
      attendance: String
    ): Employee
    login(username: String, password: String!): String
    signup(username: String!, password: String!, role: String!): String
  }
`;

module.exports = typeDefs;
