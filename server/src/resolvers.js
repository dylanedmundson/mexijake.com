let todos = [];

const { UserInputError } = require("apollo-server");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Todo = sequelize.define('Todo', {
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