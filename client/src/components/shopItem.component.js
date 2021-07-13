import React, { Component } from 'react';
import './shopItem.component.css'
import { Carousel, Card, Button } from 'react-bootstrap';
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'
import axios from 'axios';

//TODO: write add to cart and handle possiblility of overorder on item or color
//TODO: add checkbox for admin to make carousel item

export default class ShopItem extends Component {
    constructor(props) {
        super(props);

        const shopItem = props.item;

        this.state = {
            id: shopItem._id,
            images: shopItem.images,
            name: shopItem.name,
            price: shopItem.price,
            sizes: shopItem.sizes,
            description: shopItem.description,
        };
    }

    handleAddToCart = () => {
        alert("added to cart")
    }

    handleDelete() {
        axios.delete('http://localhost:5000/shopItems/' + this.state.id)
            .then(res => {
                console.log(res);
                this.props.parent.updateList();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let zeroAdditions = '';
        if ((this.state.price * 100) % 10 === 0) {
            zeroAdditions += '0';
            if ((this.state.price * 10) % 10 === 0) {
                zeroAdditions = '.0' + zeroAdditions;
            }
        }
        let priceString = `${this.state.price}${zeroAdditions}`
        return(
            <div className={this.props.className}>
                <Card style={{margin: '10px', width: '300px', height:'600px'}}>
                <ShopItemCarousel images={this.state.images}/>
                <Card.Body>
                    <Card.Title style={{textAlign: 'center', fontSize: '32pt'}}>
                        {this.state.name}
                    </Card.Title>
                        <div style={{fontSize: '14pt', textAlign: 'center'}}>
                            {this.state.description}
                        </div>
                        <hr/>
                        <div style={{float: 'left', fontSize: '22pt'}}>Available Sizes:</div>
                        {this.state.sizes.map(item => {
                            let opacity;
                            if (item.numInStock === 0) {
                                opacity = 0.4;
                            } else {
                                opacity = 1;
                            }
                            return (
                                <div key={`size-label-${item.size}`} style={{opacity: `${opacity}`, float: 'right', padding: '5px', fontSize: '18pt'}}>
                                    {item.size}
                                </div>
                            );
                        })}
                </Card.Body>
                    <div style={{textAlign: 'right', paddingRight: '10px', paddingBottom: '10px', paddingLeft: '10px'}}>
                        <label style={{fontSize: '18pt', marginRight: '10px', float:'left'}}>Price: ${priceString}</label>
                        {this.props.isProduction
                            ?   <Button className="card-bttn" onClick={() => this.handleAddToCart()}>Add To Cart</Button>
                            :   <Button className="card-bttn" onClick={() => this.handleDelete()}>Delete</Button>}
                        </div>
                </Card>

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