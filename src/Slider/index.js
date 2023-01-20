import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 10000,
      arrows : false,
      responsive: [
        {
          breakpoint: 2658,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };
    return (
      <div className="mainSlider">
        <Slider {...settings}>
          <div>
            <img src="/slider/1.jpg" alt="image" />
          </div>
          <div>
            <img src="/slider/2.jpg" alt="image" />
          </div>
          <div>
          <img src="/slider/3.jpg" alt="image" />
          </div>
          <div>
          <img src="/slider/4.jpg" alt="image" />
          </div>
        </Slider>
      </div>
    );
  }
}
