import React, { useEffect ,useState} from 'react';
import Axios from 'axios'
import {useNavigate} from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { SERVER_NODE } from '../Config/variable';
import $ from 'jquery';

export default function NewPost() {
 const [data, setData] = useState([])
 const [isLoading, setIsLoading] = useState(false);
 const [numberSlide,setNumberSlide] = useState();
 let history = useNavigate();
 const { t } = useTranslation();

 async function fetchData() {
  var formData = new FormData();
  formData.append('function', 'getLastRealEstate');  
  var params = {
      method:'POST',
      body:formData
  }
  // fetch("https://server.premiumspace.rs/RealEstate.php",params)
  //     .then(response => response.json())
  //     .then((response) => {
  //         setData(response);
  //         setIsLoading(true);
  //     }
  // )

      $.post('https://server.premiumspace.rs/RealEstate.php',
          { function: "getLastRealEstate"
          },
          function(data) {
              var result = JSON.parse(data);
               setData(result);
                setIsLoading(true);
                if(result.length<3){
                  setNumberSlide(2);
                }else{
                  setNumberSlide(3);
                }
          }
      )

}

   useEffect ( ()=>{
   
      fetchData();
  },[data])

  const settings = {
      dots: false,
      autoplay: true,
      infinite: true,
      slidesToShow:numberSlide,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 2658,
          settings: {
            slidesToShow: numberSlide,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: numberSlide,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:false
          }
        }
      ]
  };

  return (
    <div className="container result newPost">
        <div className="result-search">
            <div className="search-container">
                <div className='title'><h2>{t("latest-real-estate")}</h2></div>
                    <Slider {...settings}>
                    {isLoading && (data).map(val => (
                        <div className="realEstate" key={val.id} onClick = {() => {history('/products/'+val.id)}}>
                            <a href='#' ket={val.id}>
                                <div className="up-section">
                                    <div className="img">
                                        {val.base64 == null ? (
                                            <img src='no-image.png' alt='No image'></img>
                                        ):(
                                            <img src={(val.base64).toString().split('|||')[0]} alt="image" />
                                        )}
                                    </div>
                                    <div className="price">
                                        <span>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.cena)}</span>
                                    </div>
                                    <div className="type">
                                        <span>{t(val.vrstaUsluge)}</span>
                                    </div>
                                </div>
                                <div className="center-section">
                                    <div className="title">
                                        <span>{val.naslov}</span>
                                    </div>
                                    <div className="location">
                                        <span>{val.opstina}</span>
                                    </div>
                                    <div className="desc">
                                    <span>{val.opis}</span>
                                    </div>
                                </div>
                                <div className="bottom-section">
                                    <div className="number-room">
                                        <img src="room-icon.png" alt="room-icon"></img>
                                        <span>{val.brojSoba}</span>
                                    </div>
                                    <div className="size">
                                        <img src="size-icon.png" alt="size-icon"></img>
                                        <span>{val.povrsina} m²</span>
                                    </div>
                                </div>
                            </a>
                    </div>
                   
                    ))}
                     </Slider>
                </div>
        </div>
    </div>
  );
};
