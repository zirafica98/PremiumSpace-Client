import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate,useParams} from "react-router-dom"
import { SERVER_NODE } from '../Config/variable';
import { t } from 'i18next';


function Blogs() {
    const [blogs,setBlogs] = useState("");
    const [loading,setLoading] = useState(true);
    const [date,setDate] = useState("");
    const params = useParams();
    let history = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
            axios.get(SERVER_NODE+`blog/`).then((response) => {
                var arrayBlogs=[];
                arrayBlogs.push(response.data);
                // arrayApprow.push(response.data);
                // (arrayBlogs[0]).forEach((element,index)=>{
                //     if(element.allow == 0){
                //         arrayApprow[0].splice(index,1)
                //     }
                // })
                setBlogs(arrayBlogs[0]);
                var dateformat= response.data
                var arrayDate=[];
                dateformat.forEach((element,index)=>{
                    var newDate=new Date(element.updatedAt)
                    var day= newDate.getDate();
                    var month = newDate.getMonth();
                    var year = newDate.getFullYear();
    
                    var dataString= day + "." + month + "." + year 
                    arrayDate.push(dataString);
                })
                
                setDate(arrayDate)
                setLoading(false);
            });
        }
        
    
        fetchData();
      }, []);

      if(blogs.length == 0){
        return(
            <>
                <h3>{t("no-text")}</h3>
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
