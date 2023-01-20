import React, {useEffect, useState} from 'react'
import axios from 'axios';
import MessageBox from '../../MessageBox';
import { SERVER_NODE } from '../../Config/variable';

export default function MyFormEdit(data) {
  const [id,setId] = useState(data.data.id)
  const [naslov, setNaslov] = useState(data.data.naslov);
  const [text, setText] = useState(data.data.text);
  const [allow, setAllow] = useState(data.data.allow);
  const [success, setSuccess] = useState(false);



  const editBlog = () =>{
    var formData = new FormData();
    var myarray = new Array();
    var data = {
      id:id,
      title:naslov,
      text:text,
      allow:allow
    }
    myarray.push(data);
    var paramsData = { myarray: myarray };
    formData.append('data',JSON.stringify(paramsData));
    formData.append('function', 'editBlog');
    var params = {
      method:'POST',
      body:formData
    }
    fetch("https://server.premiumspace.rs/Blog.php",params)
      .then(response => response.json())
      .then((response) => {
        if(response){
          setSuccess(true)
        }else{
          alert("Error");
        }
      })
}

  return (
    <div>
        {success && <MessageBox  text="Uspesno ste izmenili strucni tekst" refresh={true}></MessageBox>}
        <div className="formContainer">
                <div className="content-form">
                  {/* NASLOV */}
                  <label>Naslov</label>
                  <input type="text" id="naslov" name='naslov' defaultValue={data.data.title} onChange={(event) => {setNaslov(event.target.value);}} ></input>
                  {/* OPIS */}
                  <label>Tekst</label>
                  <textarea name='text' id='text' defaultValue={data.data.text} onChange={(event) => {setText(event.target.value);}}></textarea>
                  {/* VIDLJIVOST */}
                  <div className='allow'>
                    <label>Vidljivost</label>
                    {data.data.allow ?(
                    <input type="checkbox" id="vidljivost" name='vidljivost' defaultChecked onChange={(event) => {setAllow(event.target.checked);}}></input>
                    ): (
                    <input type="checkbox" id="vidljivost" name='vidljivost' onChange={(event) => {setAllow(event.target.checked);}}></input> 
                    )}
                  </div>
                </div>
                <div className="button-section">
                    <button onClick={editBlog}>Azuriraj blog</button>
                </div>
        </div>
    </div>
  )
}
