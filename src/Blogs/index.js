import React, { useEffect, useState } from 'react'
import {useNavigate,useParams} from "react-router-dom"
import { t } from 'i18next';


function Blogs() {
    const [blogs,setBlogs] = useState("");
    const [loading,setLoading] = useState(true);
    const [date,setDate] = useState("");
    const params = useParams();
    let history = useNavigate();

    const getBlogs = function(){
        var formData = new FormData();
        var myarray = new Array();
        formData.append('function', 'getBlogs');
        var params = {
            method:'POST',
            body:formData
        }

        fetch("https://server.premiumspace.rs/Blog.php",params)
            .then(response => response.json())
            .then((response) => {
                setLoading(true);
                setBlogs(response);
                var arrayDate=[];
                response.forEach((element,index)=>{
                    var newDate=new Date(element.updatedAt)
                    var day= newDate.getDate();
                    var month = newDate.getMonth() +1;
                    var year = newDate.getFullYear();
    
                    var dataString= day + "." + month + "." + year 
                    arrayDate.push(dataString);
                })
                setDate(arrayDate)
                setLoading(false);
            })
    }

    useEffect(() => {
        getBlogs();
      }, []);

      if(blogs.length == 0){
        return(
            <>
                <div className='container no-text'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3>{t("no-text")}</h3>
                        </div>
                    </div>
                </div>
            </>
        )
      }else{
        return (
            <>
            {loading && <div>Loading</div>}
            <div className='container list-blogs'> 
                {!loading && blogs.map((val,key) => {
                    if(val.allow !="0"){
                        return(
                            <div className='row'>
                                <div className='col-md-12 title'>
                                    <h4><a onClick = {() => {history('/strucni-tekst/'+val.id)}}>{val.title}</a></h4>
                                </div>
                                <div className='col-md-12 created'>
                                    <p>{date[key]}</p>
                                </div>
                                <div className='col-md-12 shortText'>
                                    <span>{(val.text).substring(0, 250)} ...</span>
                                </div>
                            </div>
                        )
                    }
                    
                })}
            </div>
            </>
            
          )
      }

}

export default Blogs
