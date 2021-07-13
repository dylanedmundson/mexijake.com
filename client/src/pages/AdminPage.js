import React, {Component} from 'react';
import TodoList from '../components/todolist.component';
import ShopListAdmin from '../components/shopListAdmin.component';
import './AdminPage.css'

export default class AdminPage extends Component {
    render() {
        return(
            <div className="background">
                <h1 className="display-1">Admin</h1>
                <TodoList className="todo-list"/>
                <ShopListAdmin className="shop-list"/>
            </div>
        );
    }
}