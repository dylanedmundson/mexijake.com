//router for todo CRUD operations
const router = require('express').Router();
let Todo = require('../models/todo.model');

// get all todos router
router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add todo router
router.route('/add').post((req, res) => {
    const text = req.body.text;
    const newTodo = new Todo({text, complete: false});

    newTodo.save()
        .then(() => res.send(newTodo))
        .catch(err => res.status(400).json('Error: ' + err))
})

//get by id
router.route('/:id').get((req, res) => {
    Todo.findById(req.params.id)
        .then((todo => res.json(todo)))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

//update
router.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            todo.complete = req.body.complete;
            todo.text = req.body.text;
        
            todo.save()
                .then(() => res.json('Todo updated!' + req.params.id))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

//delete
router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Todo deleted!'))
        .catch(err => res.json(`Error: ${err}`));
});

//export router
module.exports = router;