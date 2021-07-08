import React, { Component } from 'react';
import {Form, InputGroup, Row, Col, Button, Image} from 'react-bootstrap'
import './shoppingItemForm.component.css'
import {MdAddCircleOutline, MdRemoveCircleOutline} from 'react-icons/md'
import axios from 'axios'

//TODO: add logic for error handling on bad inputs
//TODO: handle cancel on image choise/ causes error
//TODO: add commenting
const SIZE_INDEX = {
    XS: 0, S: 1, M: 2, LG: 3, XL: 4
};

export default class ShoppingItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageLabels: new Array(0),
            images: new Array(0),
            name: "",
            price: 0,
            sizes: [
                        {size: 'xs', checked: false, qty: 0},
                        {size: 's', checked: false, qty: 0},
                        {size: 'm', checked: false, qty: 0},
                        {size: 'lg', checked: false, qty: 0},
                        {size: 'xl', checked: false, qty: 0}
                   ],
            description: "",
            numImageInputs: 0
        }
    }

    updateLabels = (e, i) => {
        let updatedLabels = this.state.imageLabels.slice();
        updatedLabels[i] = e.target.value;

        this.setState({
            imageLabels: updatedLabels,
        });
    }

    updateImages = (e, i) => {
        var that = this;
        var type = e.target.files[0].type
        e.target.files[0].arrayBuffer().then(function(buffer) {
            let updatedImages = that.state.images.slice();
            updatedImages[i] = {imageBuff: Buffer.from(buffer),
                                contentType: type};

            that.setState({
                images: updatedImages,
            });

            console.log(that.state.images);
        });
    }

    deleteImg = (i) => {
        let updatedImages = this.state.images;
        let updatedLabels = this.state.imageLabels;
        let updatedNumImgInputs = this.state.numImageInputs;

        updatedImages.splice(i, 1);
        updatedLabels.splice(i, 1);
        updatedNumImgInputs--;

        this.setState({
            images: updatedImages,
            imageLabels: updatedLabels,
            numImageInputs: updatedNumImgInputs
        });
    }

    handleSizeCheck = (size) => {
        let index;
        switch(size) {
            case 'xs':
                index = SIZE_INDEX.XS;
                break;
            case 's':
                index = SIZE_INDEX.S;
                break;
            case 'm':
                index = SIZE_INDEX.M;
                break;
            case 'lg':
                index = SIZE_INDEX.LG;
                break;
            default:
                index = SIZE_INDEX.XL;
                break;
        }
        let updatedSize = this.state.sizes.slice();
        updatedSize[index].checked = !updatedSize[index].checked;
        this.setState({
            size: updatedSize
        });
    }

    handleQtyUpdate = (e, size) => {
        let index;
        switch(size) {
            case 'xs':
                index = SIZE_INDEX.XS;
                break;
            case 's':
                index = SIZE_INDEX.S;
                break;
            case 'm':
                index = SIZE_INDEX.M;
                break;
            case 'lg':
                index = SIZE_INDEX.LG;
                break;
            default:
                index = SIZE_INDEX.XL;
                break;
        }
        let updatedSize = this.state.sizes.slice();
        updatedSize[index].qty = parseInt(e.target.value);
        this.setState({
            size: updatedSize
        });
    }

    isSizeChecked = (size) => {
        let index;
        switch(size) {
            case 'xs':
                index = SIZE_INDEX.XS;
                break;
            case 's':
                index = SIZE_INDEX.S;
                break;
            case 'm':
                index = SIZE_INDEX.M;
                break;
            case 'lg':
                index = SIZE_INDEX.LG;
                break;
            default:
                index = SIZE_INDEX.XL;
                break;
        }
        return this.state.sizes[index].checked;
    }

    handleSumbitForm = () => {
        let imgs = [];
        for (let i = 0; i < this.state.numImageInputs; i++) {
            imgs.push({
                image: this.state.images[i].imageBuff,
                label: this.state.imageLabels[i],
                contentType: this.state.images[i].contentType
            });
        }
        console.log(imgs);
        let size = [];
        for (let i = 0; i < this.state.sizes.length; i++) {
            if (this.state.sizes[i].checked) {
                size.push({
                    size: this.state.sizes[i].size,
                    numInStock: this.state.sizes[i].qty
                });
            }
        }

        const shopItem = {
            images: imgs,
            name: this.state.name,
            price: this.state.price,
            sizes: size,
            description: this.state.description,
        };

        var that = this
        axios.post('http://localhost:5000/shopItems/add', shopItem)
            .then(res => {
                console.log(res);
                that.props.parent.updateList();
            })
            .catch(err => {
                console.log(err);
            });

        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            imageLabels: new Array(0),
            images: new Array(0),
            name: "",
            price: 0,
            sizes: [
                        {size: 'xs', checked: false, qty: 0},
                        {size: 's', checked: false, qty: 0},
                        {size: 'm', checked: false, qty: 0},
                        {size: 'lg', checked: false, qty: 0},
                        {size: 'xl', checked: false, qty: 0}
                ],
            description: "",
            numImageInputs: 0
        });
        document.getElementById("form-control-name").value = "";
        document.getElementById("form-control-price").value = "";
        document.getElementById("form-control-description").value = "";
        let qtys = document.getElementsByClassName("qty-size");
        for (let i = 0; i < qtys.length; i++) {
            qtys[i].value = "";
        }
    }

    render() {
        const imageInputs = [];
        for (let i = 0; i < this.state.numImageInputs; i++) {
            imageInputs.push(<FormImageInput key={`form-img-input-${i}`} 
                img={this.state.images[i]} index={i} onChangeLabel={this.updateLabels} onChangeImage={this.updateImages}
                onClickDeleteImg={this.deleteImg}/>);
        }
        return(
            <div className={this.props.className}>
                <Form className="form">
                    <div className="image-input-label-container display-6">
                        <Form.Label className="label-format">Add Image</Form.Label>
                        <div className="add-bttn-container">
                            <Button className="add-bttn" onClick={() => {
                                let update = this.state.numImageInputs + 1;
                                let updatedImages = new Array(update);
                                let updatedLabels = new Array(update);
                                for (let i = 0; i < update; i++) {
                                    updatedImages[i] = this.state.images[i];
                                    updatedLabels[i] = this.state.imageLabels[i];
                                }
                                this.setState({
                                    images: updatedImages,
                                    imageLabels: updatedLabels,
                                    numImageInputs: update
                                });
                            }}>
                            <MdAddCircleOutline className="add-bttn-content"/>
                            </Button>
                        </div>
                    </div>
                    <Form.Group className="form-group">
                        {imageInputs}
                    </Form.Group>
                    <Form.Label className="display-6 label-format">Shopping Item Info</Form.Label>
                    <Form.Group className="form-group">
                        <Row className="row-padding">
                            <Col>
                                <Form.Control id="form-control-name" type="text" placeholder="Item Name..." onChange={
                                    e => {
                                        let updatedName = e.target.value;
                                        this.setState({
                                            name: updatedName
                                        });
                                    }
                                }/>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control id="form-control-price" aria-label="Amount (to the nearest dollar)" type="text" placeholder="Price..."
                                            onChange={
                                                e => {
                                                    let updatedPrice = parseFloat(e.target.value);
                                                    this.setState({
                                                        price: updatedPrice
                                                    });
                                                }
                                            }
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control id="form-control-description" type="text" placeholder="description..."
                                    onChange={
                                        e => {
                                            let updatedDescription = e.target.value;
                                            this.setState({
                                                description: updatedDescription
                                            });
                                        }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            {['xs', 's', 'm', 'lg', 'xl'].map((size) => {
                                return(
                                    <CheckGroup key={'key-' + size} size={size} onChange={() => this.handleSizeCheck(size)} isChecked={this.isSizeChecked(size)}
                                                onChangeQty={this.handleQtyUpdate}/>
                                );
                            })}
                        </Row>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Button onClick={() => this.handleSumbitForm()}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

function CheckGroup(props) {
    return (
        <Col>
            <Form.Check checked={props.isChecked ? 'checked' : ''} className="checkbox-size" inline label={props.size} name="group1" type="checkbox" onChange={props.onChange}/>
            <Form.Control className="qty-size" type="text" placeholder="qty..." onChange={e => props.onChangeQty(e, props.size)}/>
        </Col>
    );
}


function FormImageInput(props){
    const shoulShowImg = props.img !== undefined && props.img !== null;
        return(
            <div>
                <div className="img-input-files">
                    <div className="img-input-files-left">
                        <Form.Control type="text" placeholder="Label..." onChange={e => props.onChangeLabel(e, props.index)}/>
                        <Form.File className="img-file-input-bttn" onChange={e =>
                            props.onChangeImage(e, props.index)
                        } custom/>
                    </div>
                    {shoulShowImg
                        ?
                            <div className="img-input-files-img-container">
                                <Image className="img-input-files-img-show" src={
                                    URL.createObjectURL(new Blob([ props.img.imageBuff ], {type: props.img.contentType}))
                                }/>
                                <Button className="img-input-delete-icon" onClick={() => props.onClickDeleteImg(props.i)}>
                                    <MdRemoveCircleOutline/>
                                </Button>
                            </div>
                        : 
                            <div className="img-input-files-img-container"/>
                    }
                </div>
            </div>
        );
}