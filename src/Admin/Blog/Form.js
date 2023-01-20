import React, {useState} from 'react'
import MessageBox from '../../MessageBox';

export default function MyForm() {

  //VALUE FROM INPUT
  const [naslov, setNaslov] = useState("");
  const [text, setText] = useState("");
  const [allow, setAllow] = useState(false);
  const [success, setSuccess] = useState(false);


  const addBlog = () =>{
    var formData = new FormData();
    var myarray = new Array();
    var data = {
        title:naslov,
        text:text,
        allow:allow,
    }
    myarray.push(data);
    var paramsData = { myarray: myarray };
    formData.append('data',JSON.stringify(paramsData));
    formData.append('function', 'putBlogs');
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
        {success && <MessageBox  text="Uspesno ste dodali strucni tekst" refresh={true}></MessageBox>}
        <div className="formContainer">
                <div className="content-form">
                  {/* NASLOV */}
                  <label>Naslov</label>
                  <input type="text" id="naslov" name='naslov' placeholder='Unesite naslov...' onChange={(event) => {setNaslov(event.target.value);}} ></input>
                  {/* OPIS */}
                  <label>Tekst</label>
                  <textarea name='text' id='text' placeholder='Unesite tekst...' onChange={(event) => {setText(event.target.value);}}></textarea>
                  {/* VIDLJIVOST */}
                  <div className='allow'>
                    <label>Vidljivost</label>
                    <input type="checkbox" id="vidljivost" name='vidljivost' onChange={(event) => {setAllow(event.target.checked);}}></input>
                  </div>
                </div>
                <div className="button-section">
                    <button onClick={addBlog}>Dodaj strucni tekst</button>
                </div>
        </div>
    </div>
  )
}
