import React, { Component } from 'react';
import './shopItem.component.css'
import { Carousel } from 'react-bootstrap';
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'

export default class ShopItem extends Component {
    constructor(props) {
        super(props);

        const shopItem = props.item;

        this.state = {
            images: shopItem.images,
            name: shopItem.name,
            price: shopItem.price,
            sizes: shopItem.sizes,
            description: shopItem.description,
        };
    }

    render() {

        return(
            <div className="shop-item">
                <ShopItemCarousel images={this.state.images} />
            </div>
        );
    }
}

function ShopItemCarousel(props) {
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
        <Carousel className="carousel" prevIcon={prev()} prevLabel="" nextIcon={next()} nextLabel="">
                {props.images.map(item => {
                     let imgURL = URL.createObjectURL(new Blob([Buffer.from(item.image.data)], {type: item.contentType}));
                    return(
                        <Carousel.Item key={item._id}>
                            <a href={imgURL}>
                                <img className="carousel-img" src={imgURL}
                                    alt="error loading img"
                                />
                            </a>
                            <Carousel.Caption>
                                <h1 className="carousel-caption">{item.label}</h1>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
        </Carousel>
    );
}