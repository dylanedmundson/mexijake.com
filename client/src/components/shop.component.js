import React, { Component } from 'react';
import './shop.component.css'
//TODO: fix so it uses react-bootstrap carousel

export default class Shop extends Component {
    render() {
        return(
            <div id="demo" className="carousel slide p-2" data-ride="carousel">

            <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" className="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div className="carousel-inner carousel-container">
                <div className="carousel-item active img-container">
                <img className="carousel-img" 
                    src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612298164-JunlIi2HBh_huckberry_huckberry_beanie_gifts_0_original.jpg" 
                    alt="Los Angeles"/>
                </div>
                <div className="carousel-item img-container">
                <img className="carousel-img"
                src="https://s7d4.scene7.com/is/image/WolverineWorldWide/MRLA-JMF25155-589-F20-P?wid=584&hei=484&op_usm=0.5,1&qlt=70&fmt=png-alpha" 
                    alt="Chicago"/>
                </div>
                <div className="carousel-item img-container">
                <img className="carousel-img"
                    src="https://images.dsw.com/is/image/DSWShoes/500650_001_ss_01?$colpg$" 
                    alt="New York"/>
                </div>
            </div>

            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon nav-arrow"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon nav-arrow"></span>
            </a>
            </div>
        );
    }
}