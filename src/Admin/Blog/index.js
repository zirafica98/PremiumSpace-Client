import HeaderAdmin from '../Header'
import React, { useEffect , useState } from 'react'
import Popup from './Popup';
import PopupAdd from './PopupAdd';
import MessageBox from '../../MessageBox';
import Login from '../../Login';


function Blog() {

  const [blogObject, setBlogObject] = useState({});
  const [blogDetailsObject, setBlogObjectDetails] = useState({});
  const [isLogedIn, setIsLogedIn] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const togglePopupAdd = () => {
    setIsOpenAdd(!isOpenAdd);
  }
  const deleteRow = () =>{
    var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
    var idList=[];
      checkedBoxes.forEach((element,index) =>{
        idList.push(element.value)
      })
      var formData = new FormData();
      var myarray = new Array();
      myarray.push(idList);
      var paramsData = { myarray: myarray };
      formData.append('data',JSON.stringify(paramsData));
      formData.append('function', 'deleteBlogs');
      var params = {
        method:'POST',
        body:formData
      }
      fetch("https://server.premiumspace.rs/Blog.php",params)
        .then(response => response.json())
        .then((response) => {
          if(response){
            setSuccess(true);
          }else{
            alert("Error");
          }
        })
  }
  const openDetails = (state = {}) => {
      var id= state.target.getAttribute('a-key');
      var data = {
        id:id
      }
      var formData = new FormData();
      var myarray = new Array();
      myarray.push(data);
      var paramsData = { myarray: myarray };
      formData.append('data',JSON.stringify(paramsData));
      formData.append('function', 'getBlogById');
      var params = {
        method:'POST',
        body:formData
      }
      fetch("https://server.premiumspace.rs/Blog.php",params)
      .then(response => response.json())
      .then((response) => {
        setBlogObjectDetails(response);
        setIsOpen(true);
      })

  };

  const openAdd = (state = {}) => {
    setIsOpenAdd(true);
};

  useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);

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
                var formData1 = new FormData();
                formData1.append('function', 'getBlogs');
                var params1 = {
                  method:'POST',
                  body:formData1
                }
                fetch("https://server.premiumspace.rs/Blog.php",params1)
                  .then(response => response.json())
                  .then((response) => {
                    setBlogObject(response);
                    setLoading(false);
                  })
                }else{
                  setIsLogedIn(false);
                }
              })
        
      }
      fetchData();
    }, []);

  return (
    <>
      {isLogedIn ? (
        <>
            {success && <MessageBox text="Uspesno ste izbrisali" refresh={true}></MessageBox>}

            <HeaderAdmin></HeaderAdmin>
            {loading && <div>Loading</div>}
        <table id="blogs">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Id</th>
                <th scope="col">Naslov</th>
                <th scope="col">Tekst</th>
                <th scope="col">Vidljivost</th>
              </tr>
            </thead>
            <tbody> 
            {!loading && blogObject.map((val,key) => (
            <tr key={key}>
                <th scope="col"><input type="checkbox" name='mycheckboxes' value={val.id}></input></th>
                <th onClick={(state) => openDetails(state)} a-key={val.id} key={key} scope="col">{val.id}</th>
                <th onClick={(state) => openDetails(state)} a-key={val.id} scope="col">{val.title}</th>
                <th onClick={(state) => openDetails(state)} a-key={val.id} scope="col">{val.text}</th>
                <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.allow}</th>
            </tr>
            ))}
            </tbody>
          </table>
          <button className='deleteBlog' onClick={deleteRow}>Obrisi</button>
          <button onClick={(openAdd)} className="openAddBlog">Dodaj strucni tekst</button>
          {isOpen && <Popup
          content={blogDetailsObject}
          handleClose={togglePopup}
          
        />}
        {isOpenAdd && <PopupAdd
          handleClose={togglePopupAdd}
        />}
        </>
        ):(
          <>
            <Login></Login>
          </>
       )}
    </>
  )
}

export default Blog
