import React, { Component } from 'react';
import ShoppingItemForm from './shoppingItemForm.component';
import ShopItem from './shopItem.component';
import axios from 'axios'

export default class ShopListAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shopListItems: []
        }
        this.updateList();
    }

    updateList = () => {
        console.log("update list");
        var that = this;
        axios.get("http://localhost:5000/shopItems")
        .then(res => {
            let items = res.data;
            that.setState({
                shopListItems: items
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <div className={this.props.className}>
            <ShoppingItemForm parent={this}/>
            {
                this.state.shopListItems.map(shopItem => {
                    return(
                        <ShopItem item={shopItem} key={'shop-item-' + shopItem._id}
                                    isProduction={false} parent={this}/>
                    );
                })
            }
            </div>
        );
    }
}
