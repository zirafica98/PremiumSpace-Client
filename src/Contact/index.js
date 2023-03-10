import { useTranslation } from "react-i18next";
import React,{useState} from 'react'
import MailForm from '../Mail'


function Contact() {
    const [linkAddress,setLinkAddress] = useState("https://www.google.com/maps/embed/v1/place?key=AIzaSyBDsxzY2Lp_gp_9NwEWRa79mAgLxfSa5gQ&region=SR&language=sr&q=Mirjevski Bulevar 92");
    const { t } = useTranslation();
  return (
    <div>
        <div className='container contact'>
            <header><h3>{t("con")}</h3></header>
            <div className='map'>
                <iframe id="addressIframe" _ngcontent-serverapp-c116="" height="150" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" class="border-0" src={linkAddress}></iframe>
            </div>
            <div className='map-detail'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <span>Premium space agencija za nekretnine</span>
                        <a href='tel:+381611829110'>+38162489000</a>
                        <a href="tel:+381114576739">+381114576739</a>
                        <a href='mailto:office@premiumspace.rs'>office@premiumspace.rs</a>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <span>Mirjevski bulevar 92</span>
                        <span>Srbija,Beograd,11000</span>
                    </div>
                </div>
                
            </div>
            <div className='form'>
                <MailForm></MailForm>
            </div>
        </div>
    </div>
  )
}

export default Contact
