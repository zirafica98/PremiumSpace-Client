import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom';
function ViewBlog() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [date,setDate] = useState("");


    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try {
            var formData = new FormData();
            var myarray = new Array();
            var data = {
              id:params.id
            };
            myarray.push(data);
            formData.append('function', 'getBlogById');
            var paramsData = { myarray: myarray };
            formData.append('data',JSON.stringify(paramsData));
            var paramsData = {
                method:'POST',
                body:formData
            }
            fetch("https://server.premiumspace.rs/Blog.php",paramsData)
            .then(response => response.json())
            .then((response) => {
              var arrayDate=[];
              var newDate=new Date(response.updatedAt);
              var day= newDate.getDate();
              var month = newDate.getMonth() + 1;
              var year = newDate.getFullYear();
              var dataString= day + "." + month + "." + year;
              arrayDate.push(dataString);
              setDate(arrayDate);
              setData(response);      
            })
            
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        }
        
    
        fetchData();
      }, []);
  return (
    <div>
    {loading && <div>Loading</div>}
    {!loading && (
      <div className="blogs-detail container">
        <div className="row">
            <div className="col-md-12 title">
                <h3>{data.title}</h3>
            </div>
            <div className="col-md-12 date">
                <p>{date}</p>
            </div>
            <div className="col-md-12 text">
                <span>{data.text}</span>
            </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default ViewBlog
