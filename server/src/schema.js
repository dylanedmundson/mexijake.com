const { gql } = require('apollo-server');

const typeDefs = gql`
    #shcemas
    type Todo {
        id: ID!
        text: String!
        complete: Boolean!
    }

    type Mutation {
        createTodo(text:String!): Todo
    }

    type Query {
        todos: [Todo]
        todo(id: ID!): Todo
    }
`;

module.exports = typeDefs;