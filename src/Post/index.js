import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { useTranslation } from "react-i18next";
import MessageBox from "../MessageBox";
import $ from 'jquery';

export default function Posts(data){
  const [filterData,setFilterData] = useState(data.filterData);
  const [productData,setProductData] = useState([]);
  const [noProduct,setNoProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [counter,setCounter] = useState();
  const [postsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState();
  const indexOfLastPost = currentPage * postsPerPage;
  const [pageNumbers,setPageNumber] = useState([]);
  const [startIndex,setStartIndex] = useState(0);
  const [endIndex,setEndIndex] = useState(5);

  let history = useNavigate();
  const { t } = useTranslation();

  const paginate = async function(pageNumber){
    setCurrentPage(pageNumber-1);
    getProductData(pageNumber)
  }

  const validateIndex = index => index >= -1;
  const prevPage = () => {
      if (validateIndex(startIndex - 5) && validateIndex(endIndex - 5)) {
          setStartIndex(startIndex-5);
          setEndIndex(endIndex-5);
      }
  };

  const nextPage = () => {
      if(endIndex < pageNumbers.length){
        if (validateIndex(startIndex + 5) && validateIndex(endIndex + 5)) {
          setStartIndex(startIndex+5);
          setEndIndex(endIndex+5);
        }
      }else{
        if (validateIndex(startIndex + (pageNumbers.length-endIndex)) && validateIndex(endIndex + (pageNumbers.length-endIndex))) {
          setStartIndex(startIndex+(pageNumbers.length-endIndex));
          setEndIndex(endIndex+(pageNumbers.length-endIndex));
        }
      }
      
  };

  const getProductData = async function(pageNumber){
    setLoading(false);
    var formData = new FormData();
    var myarray = new Array();
    var jsonObject=[];
    var jsonObject1=[];
    var pageNumberSet;
    formData.append('function', 'searchRealEstate');
    if(pageNumber == undefined){
      formData.append('page',0);
      pageNumberSet = 0;

    }else{
      formData.append('page',pageNumber-1);
      pageNumberSet=pageNumber-1;
    }
    myarray.push(filterData);
    var paramsData = { myarray: myarray };
    formData.append('data',JSON.stringify(paramsData));
    var params = {
        method:'POST',
        body:formData
    }


        $.post('https://server.premiumspace.rs/RealEstate.php',
                { 
                  searchWord:filterData.searchWord,
                  vrstaUsluge:filterData.vrstaUsluge,
                  tipNekretnine:filterData.tipNekretnine,
                  page:pageNumberSet,
                  function: "searchRealEstate"
                }, function(data){
                  var response = JSON.parse(data);
              if(response.length>0){
                (response).forEach((element,index)=>{
                  if(filterData.sizeFrom !="" && filterData.sizeOf != ""){
                    if(element.povrsina>filterData.sizeFrom && element.povrsina<filterData.sizeOf){
                      jsonObject.push(element);
                    }
                  }else if (filterData.sizeFrom =="" && filterData.sizeOf !=""){
                    if(element.povrsina<filterData.sizeOf){
                      jsonObject.push(element);
                    }
                  }else if(filterData.sizeFrom!="" && filterData.sizeOf==""){
                    if(element.povrsina>filterData.sizeFrom){
                      jsonObject.push(element);
                    }
                  }else if(filterData.sizeFrom =="" && filterData.sizeOf == ""){
                    jsonObject.push(element);
                  }
                })
      
                jsonObject.forEach((element,index)=>{
                  if(filterData.priceFrom !="" && filterData.priceOf != ""){
                    if(element.cena>filterData.priceFrom && element.cena<filterData.priceOf){
                      jsonObject1.push(element);
                    }
                  }else if (filterData.priceFrom =="" && filterData.priceOf !=""){
                    if(element.cena<filterData.priceOf){
                      jsonObject1.push(element);
                    }
                  }else if(filterData.priceFrom!="" && filterData.priceOf==""){
                    if(element.cena>filterData.priceFrom){
                      jsonObject1.push(element);
                    }
                  }else if(filterData.priceFrom =="" && filterData.priceOf == ""){
                    jsonObject1.push(element);
                  }
                  setLoading(true);
                })
              }else{
                setNoProduct(true);
              }
              setProductData(jsonObject1);
                }
                
            )

    // fetch("https://server.premiumspace.rs/RealEstate.php",params)
    //   .then(response => response.json())
    //   .then((response) => {
    //     if(response.length>0){
    //       (response).forEach((element,index)=>{
    //         if(filterData.sizeFrom !="" && filterData.sizeOf != ""){
    //           if(element.povrsina>filterData.sizeFrom && element.povrsina<filterData.sizeOf){
    //             jsonObject.push(element);
    //           }
    //         }else if (filterData.sizeFrom =="" && filterData.sizeOf !=""){
    //           if(element.povrsina<filterData.sizeOf){
    //             jsonObject.push(element);
    //           }
    //         }else if(filterData.sizeFrom!="" && filterData.sizeOf==""){
    //           if(element.povrsina>filterData.sizeFrom){
    //             jsonObject.push(element);
    //           }
    //         }else if(filterData.sizeFrom =="" && filterData.sizeOf == ""){
    //           jsonObject.push(element);
    //         }
    //       })

    //       jsonObject.forEach((element,index)=>{
    //         if(filterData.priceFrom !="" && filterData.priceOf != ""){
    //           if(element.cena>filterData.priceFrom && element.cena<filterData.priceOf){
    //             jsonObject1.push(element);
    //           }
    //         }else if (filterData.priceFrom =="" && filterData.priceOf !=""){
    //           if(element.cena<filterData.priceOf){
    //             jsonObject1.push(element);
    //           }
    //         }else if(filterData.priceFrom!="" && filterData.priceOf==""){
    //           if(element.cena>filterData.priceFrom){
    //             jsonObject1.push(element);
    //           }
    //         }else if(filterData.priceFrom =="" && filterData.priceOf == ""){
    //           jsonObject1.push(element);
    //         }
    //         setLoading(true);
    //       })
    //     }else{
    //       setNoProduct(true);
    //     }
    //     setProductData(jsonObject1);
    //   })

  }
  const getNumberCount = async function(){
    var formData = new FormData();
    var myarray = new Array();
    formData.append('function', 'getCountRow');
    myarray.push(filterData);
    var paramsData = { myarray: myarray };
    formData.append('data',JSON.stringify(paramsData));
    var params = {
        method:'POST',
        body:formData
    }

    fetch("https://server.premiumspace.rs/RealEstate.php",params)
      .then(response => response.text())
      .then((response)=>{
        setCounter(response);
        var pageNumberArray = [];
        for (let i = 1; i <= Math.ceil(response / postsPerPage); i++) {
          pageNumberArray.push(i);
        }
        setPageNumber(pageNumberArray);
      })
  }

  useEffect(()=>{
    
    getNumberCount();
    getProductData();

    
  },[])
    return (
      <div>
        { noProduct && <MessageBox text={t("no-product")} refresh={false} pressSearch = {noProduct}></MessageBox>}
        <div className='row'>
          <div className="result-count"><p><span>{counter}</span> {t("result_serach")}</p></div>
          {loading && productData.map(val => (
              <div className="realEstate col-lg-4 col-md-4 col-sm-6"  key={val.id} onClick = {() => {history('/products/'+val.id)}}>
                <a>
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
                    <span className="desc">
                      <span>{val.opis}</span>
                    </span>
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
          </div>
          <nav>
            <ul className='pagination'>
            <li className="page-item">
              <button className="page-link" onClick={prevPage} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
              {pageNumbers.slice(startIndex,endIndex).map(number => (
                <li key={number} className='page-item'>
                  <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                </li>
              ))}
              <li className="page-item">
                <button className="page-link" onClick={nextPage} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
    );
 }
