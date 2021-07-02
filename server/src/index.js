require('dotenv').config();
const { ApolloServer, UserInputError } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

//Goes in requires
// const { UserInputError } = require("apollo-server");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const db = new Sequelize('postgres://localhost:5432/your-db')
//end

const server = new ApolloServer({typeDefs, resolvers});


let todos = [];

const Todo = db.define('Todo', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
    },
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
})

Todo.sync({force: true});
todos.push(new Todo({text: "hello", complete: false}));
console.log("OUTPUT==================")
console.log(todos[0]);

module.exports = {
    Query: {
        todos: async() => {
            return todos;
        }
    },

    Mutation: {
        createTodo: async(_, __, { textArg }, ___) => {
            const newTodo = new Todo({text: textArg, complete: false})
            todos.push(newTodo);
            return newTodo;
        }
    }
}

server.listen().then(() => {
    console.log(`
        Server is running!
        Listening on port 4000
        Explore at https://studio.apollographql.com/sandbox
    `);
});