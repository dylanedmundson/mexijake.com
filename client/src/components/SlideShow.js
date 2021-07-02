import React, {Component} from 'react'
import {ImagePicker} from 'react-file-picker'
import './SlideShow.css'
import {AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineDelete} from 'react-icons/ai'
import $ from 'jquery'

// admin page app
// https://blog.logrocket.com/admin-panel-with-react/

export class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgIndex: 0,
            slides: [],
        }
    }

    render() {
        let data = JSON.parse(localStorage.getItem('SliderData'));
        let slides = [];
        for (let i = 0; i < data.length; i++) {
            slides.push(<SlideImg imgIndex={i} id={"img-".concat(i)} key={"img-".concat(i)}/>);
            if (i === this.state.imgIndex) {
                $("#img-".concat(i)).fadeIn();
            } else {
                $("#img-".concat(i)).fadeOut();
            }
        }
        return(
            <div className="slide">
                {slides}
                <AiOutlineDoubleLeft className="left-arrow" onClick={this.previous} onMouseEnter={() => this.fadein(".left-arrow")}
                onMouseLeave={() => this.fadeout(".left-arrow")}/>
                <AiOutlineDoubleRight className="right-arrow" onClick={this.next} onMouseEnter={() => this.fadein(".right-arrow")}
                onMouseLeave={() => this.fadeout(".right-arrow")}/>
                <AiOutlineDelete className="remove" onClick={this.remove} onMouseEnter={() => this.fadein(".remove")}
                onMouseLeave={() => this.fadeout(".remove")}/>
                <div className="picker-button">
                    <ImagePicker
                        extensions={['jpg', 'jpeg', 'png']}
                        dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                        onChange={base64 => this.uploadImg(base64)}
                        onError={() => alert("Error: improper file input, must be jpg, jpeg, or png")}
                    >
                        <button>
                        Click to upload image
                        </button>
                    </ImagePicker>
                </div>
            </div>
        );
    }

    fadein = (className) => {
        $(className).css("animation-name", "fade-in");
        $(className).css("animation-duration", "1s");
        $(className).css("animation-fill-mode", "forwards");
        $(className).css("cursor", "pointer");
    }

    fadeout = (className) => {
        $(className).css("animation-name", "fade-out");
        $(className).css("animation-duration", "1s");
        $(className).css("animation-fill-mode", "forwards");
    }

    remove = () => {
        let index = this.state.imgIndex;
        let data = JSON.parse(localStorage.getItem('SliderData'));
        data.splice(index, 1);
        localStorage.setItem('SliderData', JSON.stringify(data));
        this.previous();
    }

    previous = () => {
        let index = this.state.imgIndex;
        $("#img-".concat(index)).fadeOut();
        index--;
        if (index < 0) {
            index = (JSON.parse(localStorage.getItem('SliderData'))).length - 1;
        }
        $("#img-".concat(index)).fadeIn();
        this.setState({
            imgIndex: index,
        });
    }

    next = () => {
        let index = this.state.imgIndex;
        $("#img-".concat(index)).fadeOut();
        index++;
        if (index >= (JSON.parse(localStorage.getItem('SliderData')).length)) {
            index = 0;
        }
        $("#img-".concat(index)).fadeIn();
        this.setState({
            imgIndex: index,
        });
    }

    uploadImg = (base64) => {
            let data = localStorage.getItem('SliderData');
            let arr;
            if (data !== null) {
                arr = JSON.parse(data);
                arr.push(base64);
            } else {
                arr = [];
                arr.push(base64);
            }
            localStorage.setItem('SliderData', JSON.stringify(arr));
            this.setState({
                imgIndex: arr.length - 1,
            })
    }
}

class SlideImg extends Component {
    render() {
        let imgData = JSON.parse(localStorage.getItem('SliderData'));
        return(
            <div>
                <img src={imgData[this.props.imgIndex]} alt="" className="slide-img" id={this.props.id}/>
            </div>
        );
    }
}

