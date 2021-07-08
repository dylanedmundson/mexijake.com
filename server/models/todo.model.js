const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//mongoose schema for todo list items
const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});


//create and export model from schema
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
