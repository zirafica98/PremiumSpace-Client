import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga"


export default function Product() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [image,setImage] = useState([])
    const [linkAddress, setLinkAddress] = useState([]);
    const { t } = useTranslation();

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      };

    useEffect(() => {
      ReactGA.event({"category":"Product","action":"load","label":"label"})
        const fetchData = async () =>{
          setLoading(true);
          try {

            var formData = new FormData();
            var myarray = new Array();
            formData.append('function', 'getByIdRealEstate');
            var data = {
              id:params.id
            }
            myarray.push(data);
            var paramsData = { myarray: myarray };
            formData.append('data',JSON.stringify(paramsData));
            var paramsData = {
                method:'POST',
                body:formData
            }
            fetch("https://server.premiumspace.rs/RealEstate.php",paramsData)
            .then(response => response.json())
            .then((response)=>{
              var imageArray=[];
              var image=response.base64;
              imageArray=image.split("|||");
              var imageArrayCheck=[];
              imageArray.forEach(element => {
                if(element != ""){
                  imageArrayCheck.push(element)
                }
              });
              setImage(imageArrayCheck);
              setData(response);

              setLinkAddress("https://www.google.com/maps/embed/v1/place?key=AIzaSyBDsxzY2Lp_gp_9NwEWRa79mAgLxfSa5gQ&region=SR&language=sr&q="+ response.drzava +","+response.grad + "," +response.opstina +" "+ response.ulica + " " + response.broj);
            })
            
            
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        }
        
    
        fetchData();
      }, []);

  return(
    <div>
    {loading && <div>Loading</div>}
    {!loading && (
      <div className="product-detail container-fluid">
            <div className="container" key={data.id}>
                <div className="row">
                    <div className="col-md-12 title">
                        <h2>{data.naslov}</h2>
                    </div>
                </div>
                <div className="image-carousel row">
                    <div className="col-md-7 col-sm-12">
                        <Slider {...settings}>
                            {image.map(val =>(
                                <div key={0}>
                                    <img src={val} alt="image" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
              <div className="section-wrap">
                <div className="row location">
                    <div className="col-md-3 col-sm-12">
                        <span>{data.drzava},{data.grad}</span>
                    </div>
                </div>
                <div className="row priceAndSize">
                  <div className="col-md-5  col-lg-3 col-sm-12">
                  <span className="price">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.cena)}</span>
                  <span className="priceWithSize">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseInt(data.cena)/parseInt(data.povrsina))}/m²</span>
                  </div>
                </div>
                <div className="row details">
                  <span className="title">{t("detail-title")}</span>
                  <div className="section section-1">
                    <span className="subtitle">{t("detail-subtitle-relestate")}</span>
                    <ul>
                      <li>{t("type-of-service")} <strong>{data.vrstaUsluge}</strong></li>
                      <li>{t("square-footage")}<strong> {data.povrsina} m²</strong></li>
                      <li>{t("condition-of-the-property")}<strong>{data.stanje}</strong></li>
                      <li>{t("number-of-rooms")}<strong>{data.brojSoba}</strong> </li>
                      <li>{t("floor")}<strong>{data.sprat}</strong></li>
                      <li>{t("equipment")}<strong>{data.opremljenost}</strong></li>
                      <li>{t("total-number-of-floors")}<strong>{data.brojSpratova}</strong></li>
                      <li>{t("heating")}<strong>{data.grejanje}</strong></li>

                    </ul>
                  </div>
                </div>
                <div className="row text-desc">
                  <span className="title">{t("description")}</span>
                  <div className="section-1">
                    <span>Opstina {data.opstina}</span>
                    <span>{data.ulica} {data.broj}</span>
                    <p>{data.opis}</p>
                  </div>
                </div>
                <div className="row location-map">
                  <span className="title">{t("location")}</span>
                  <div className="section-1">
                    <span><b>{data.drzava} - {data.grad} - {data.opstina} - {data.ulica} {data.broj}</b></span>
                  </div>
                  <div className="section-2">
                  <iframe id="addressIframe" _ngcontent-serverapp-c116="" height="150" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" class="border-0" src={linkAddress}></iframe>
                  </div>
                </div>
              </div>
            </div>
      </div>
    )}
    </div>
  )
}
