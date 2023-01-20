import React, { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom"
import Admin from "../Admin";
import { AuthContext } from "../helpers/AuthContext";
import MessageBox from "../MessageBox";
import { useSetState } from 'react-use';


const initialState = {
  email: '',
  password: ''
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);
  const [errors,setError] = useState(false);
  const [textAlert,setTextAlert] = useState("");
  let history = useNavigate();
  const { state: ContextState, login } = useContext(AuthContext);
  const [state, setState] = useSetState(initialState);
  const [isLogedIn,setIsLogedIn] = useState(false); 

  const loginFunc = () => {
    var formData = new FormData();
    var myarray = new Array();
    const data = { email: email, password: password };
    myarray.push(data);
    formData.append('function', 'checkUsers');
    var paramsData = { myarray: myarray };
    formData.append('data',JSON.stringify(paramsData));
    var params = {
        method:'POST',
        body:formData
    }

    fetch("https://server.premiumspace.rs/User.php",params)
    .then(response => response.json())
    .then((response) => {
        if(response.message == "Ne postoji korisnika sa ovim kredencijalima"){
          setTextAlert(response.message);
          setError(true);
          setIsLogedIn(false);
        }else{
          localStorage.setItem("accessToken",response.tokensAcces);
          setIsLogedIn(true);
          history("/admin");
        }
    })
    
   
  };

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



  return (
          <>{!isLogedIn ? (
            <>
            {errors && <MessageBox text={textAlert} refresh={false}></MessageBox>}
            <div className="loginContainer">
              <label>Email:</label>
              <input
                type="text"
                //value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                } } />
              <label>Password:</label>
              <input
                type="password"
                //value={password} 
                onChange={(e) => {
                  setPassword(e.target.value)
                } } />

              <button onClick={loginFunc}> Login </button>
          </div>
            </>
            
          ):(
            <>
              <Admin></Admin>
            </>
          )}

      </>
  );
}

export default Login;
