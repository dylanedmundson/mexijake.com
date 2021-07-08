import React, {Component} from 'react'
import axios from 'axios'
import {MdCheckBoxOutlineBlank, MdCheckBox, MdDelete} from 'react-icons/md';
import './todolist.component.css'
import {Navbar, Nav, Form, Button} from 'react-bootstrap'

function TodoItem(props) {
    return(
        <div className="todo-item display-6"> 
            <div className="todo-item-text-container">
                {props.text}
            </div>
            <div className="button-container">
                <button className="check-box" onClick={props.onClickCheckbox}>
                    {props.checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                </button>
                <button className="check-box" id="delete-todo" onClick={props.onClickDelete}>
                    <MdDelete />
                </button>
            </div>
        </div>
    );
}

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            addTodoText: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/todos/')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleToggleCompelte = (id) => {
        let updatedTodos = this.state.todos.slice();
        let index;
        for (let i = 0; i < updatedTodos.length; i++) {
            if (this.state.todos[i]._id === id) {
                updatedTodos[i].complete = !updatedTodos[i].complete;
                index = i;
            }
        }
        axios.post('http://localhost:5000/todos/update/' + id, updatedTodos[index])
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        this.setState ({
            todos: updatedTodos
        });
        
    }

    todoList = () => {
        return this.state.todos.slice().reverse().map(curTodo => {
            return (
                <Nav.Item key={'todo-list-' + curTodo._id}>
                    <TodoItem text={curTodo.text}
                        checked={curTodo.complete} onClickCheckbox={() => this.handleToggleCompelte(curTodo._id)} 
                        onClickDelete={() => this.handleDeleteTodo(curTodo._id)}
                    />
                </Nav.Item>
            );
        });
    }

    handleSubmitTodo = () => {
        if (this.state.addTodoText !== '') {
            let todo = {
                _id: "",
                text: this.state.addTodoText,
                complete: false,
                createdAt: "",
                updatedAt: "",
                __v: 0
            }

            axios.post('http://localhost:5000/todos/add', todo)
                .then(res => {
                    todo._id = res.data._id;
                    todo.text = res.data.text;
                    todo.complete = res.data.complete;
                    todo.createdAt = res.data.createdAt;
                    todo.updatedAt = res.data.updatedAt;
                    todo.__v = res.data.__v;
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            
            let updatedTodos = this.state.todos.slice();
            updatedTodos.push(todo);
            document.getElementById("todo-text-input").value="";
            this.setState({
                todos: updatedTodos
            });
        }
    }

    handleDeleteTodo = (id) => {
        let updatedTodos = this.state.todos.slice();
        for(let i = 0; i < updatedTodos.length; i++) {
            if (updatedTodos[i]._id === id) {
                updatedTodos.splice(i, 1);
            }
        }

        axios.delete('http://localhost:5000/todos/' + id)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        
        this.setState({
            todos: updatedTodos
        })
    }

    todoInputChange = (e) => {
        this.setState({
            addTodoText: e.target.value
        })
    }

    render() {
        return(
            <div className={this.props.className}>
            <Navbar bg="light" expand="sm|md|lg" style={{maxWidth: '250px', minWidth: '250px'}}>
            <Navbar.Brand href="#">Todo List</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: '200px'}}
                navbarScroll
                >
                    <Nav.Item className="todo-input-container">
                        <Form>
                            <Form.Group className="mb-3">
                                <div className="todo-input-text-container">
                                    <Form.Control type="text" placeholder="todo..."
                                        onChange={e => this.todoInputChange(e)}
                                        id="todo-text-input"/>
                                </div>
                                <div className="todo-input-bttn-container">
                                    <Button onClick={this.handleSubmitTodo}>
                                        Add
                                    </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Nav.Item>
                    {this.todoList()}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}