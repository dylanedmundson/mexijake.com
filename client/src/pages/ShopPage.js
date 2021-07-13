import React, { Component } from 'react';
import ShopItem from '../components/shopItem.component';
import axios from 'axios'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Carousel } from 'react-bootstrap';
import './ShopPage.css'

export default class ShopPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shopListItems: [],
            carouselImages: []
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
                shopListItems: items,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <div className="shop-page-container">
                <div className="carousel-container">
                    <ShopCarousel images={this.state.shopListItems} />
                </div>
            {
                this.state.shopListItems.map(shopItem => {
                    console.log(shopItem._id)
                    return(
                        <div id={shopItem._id}>
                            <ShopItem item={shopItem} key={'shop-item-' + shopItem._id}
                                    isProduction={true} parent={this}/>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}

function ShopCarousel(props) {
    const prev = () => {
        return(
            <MdNavigateBefore className="carousel-icon"/>
        );
    }
    const next = () => {
        return(
            <MdNavigateNext className="carousel-icon"/>
        );
    }
    return(
        <Carousel className="head-carousel" prevIcon={prev()} prevLabel="" nextIcon={next()} nextLabel="">
                {props.images.map(item => {
                     let imgURL = URL.createObjectURL(new Blob([Buffer.from(item.images[0].image.data)], {type: item.images[0].contentType}));
                    console.log("#" + item._id)
                     return(
                            <Carousel.Item key={item._id}>
                                <a href={"#" + item._id}>
                                    <img className="head-carousel-img" src={imgURL}
                                        alt="error loading img"
                                    />
                                </a>
                                <h1 className="display-6">{item.name}</h1>
                            </Carousel.Item>
                    );
                })}
        </Carousel>
    );
}