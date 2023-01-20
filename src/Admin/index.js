import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../helpers/AuthContext';
import {useState} from "react"
import Login from '../Login';
import Products from "./Product/Products"

export default function Admin() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    useEffect(() => {
      var formData = new FormData();
      var myarray = new Array();
      const data = { accessToken: localStorage.getItem("accessToken") };
      myarray.push(data);
      formData.append('function', 'checkTokenAccess');
      var paramsData = { myarray: myarray };
      formData.append('data',JSON.stringify(paramsData));
      var params = {
          method:'POST',
          body:formData
      }

      fetch("https://server.premiumspace.rs/User.php",params)
      .then(response => response.json())
      .then((response) => {
        if(response != false){
          setIsLogedIn(true);
        }else{
          setIsLogedIn(false);
        }
      })
    }, []);


    return(
       <div>
          {isLogedIn ? (
            <>
              <Products></Products>
            </>
          ):(
            <>
            <Login></Login>
            </>
          )}
       </div>
    )
}
