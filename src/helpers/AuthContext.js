// import { createContext } from "react";

// export const AuthContext = createContext("")


import React from 'react';
import { useSetState } from 'react-use';

export const AuthContext = React.createContext("");

// const initialState = {
//   isLoggedIn: false,
//   isLoginPending: false,
//   loginError: null
// }

export const ContextProvider = props => {
  const [state, setState] = useSetState();

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});

  const login = (email, password) => {
    setLoginPending(true);
    //setLoginSuccess(false);
    setLoginError(null);

    //   setLoginPending(false);

    //   if (!error) {
    //     setLoginSuccess(true);
    //   } else {
    //     setLoginError(error);
    //   }

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
      if(response != false){
        if(response == "Password is not equal"){
            setLoginSuccess(false);
        }else{
          localStorage.setItem("accessToken",response.tokensAcces);
          setLoginSuccess(true);
          setLoginPending(false);
        }
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }

  const checkToken = () => {
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
        setLoginSuccess(true);
      }else{
        setLoginSuccess(false);
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        checkToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
