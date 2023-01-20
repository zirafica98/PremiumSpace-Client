import React, { useEffect , useState } from 'react'
import HeaderAdmin from '../Header';
import Popup from './Popup';
import PopupAdd from './PopupAdd';
import MessageBox from '../../MessageBox';
import Login from '../../Login';


export default function Products() {
    const [productObject, setProductObject] = useState({});
    const [productDetailsObject, setProductDetailsObject] = useState({});
    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(true);
    const [isLogedIn,setIsLogedIn] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
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
      formData.append('function', 'deleteRealEstate');
      var params = {
        method:'POST',
        body:formData
      }
      fetch("https://server.premiumspace.rs/RealEstate.php",params)
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
        formData.append('function', 'getByIdRealEstate');
        var params = {
          method:'POST',
          body:formData
        }
        fetch("https://server.premiumspace.rs/RealEstate.php",params)
        .then(response => response.json())
        .then((response) => {
          setProductDetailsObject(response);
          setIsOpen(true);
        })
    };

    const openAdd = (state = {}) => {
      setIsOpenAdd(true);
  };

    useEffect(() => {
        const fetchData = async () =>{
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
            formData1.append('function', 'getRealEstate');
            var params1 = {
              method:'POST',
              body:formData1
            }
            fetch("https://server.premiumspace.rs/RealEstate.php",params1)
              .then(response => response.json())
              .then((response) => {
                setProductObject(response);
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
      <>
      {isLogedIn ? (
        <>
        <HeaderAdmin></HeaderAdmin>
            {loading && <div>Loading</div>}
            {success && <MessageBox text="Uspesno ste izbrisali" refresh={true}></MessageBox>}

            <table id="products">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Id</th>
                    <th scope="col">Tip nekretnine</th>
                    <th scope="col" style={{width:"250px"}}>Ulica</th>
                    <th scope="col">Broj</th>
                    <th scope="col">Broj soba</th>
                    <th scope="col">Uknjizenost</th>
                    <th scope="col">Povrsina</th>
                    <th scope="col">Stanje</th>
                    <th scope="col">Grejanje</th>
                    <th scope="col">Sprat</th>
                    <th scope="col">Cena</th>
                    <th scope="col">Opremljenost</th>
                    <th scope="col">Opis</th>
                    <th scope="col">Naslov</th>
                    <th scope="col">Opstina</th>
                    <th scope="col">Grad</th>
                    <th scope="col">Drzava</th>
                    <th scope="col">Vrsta usluge</th>
                    <th scope="col">Broj spratova</th>
                    <th scope="col">Datum kreiranja</th>
                    <th scope="col">Datum izmene</th>
                  </tr>
                </thead>
                <tbody> 
                {!loading && productObject.map((val,key) => (
                <tr key={key}>
                    <th scope="col"><input type="checkbox" name='mycheckboxes' value={val.id}></input></th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id} key={key} scope="col">{val.id}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id} scope="col">{val.tipNekretnine}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id} style={{width:"250px"}}  scope="col">{val.ulica}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.broj}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.brojSoba}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.uknjizenost}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.povrsina}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.stanje}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.grejanje}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.sprat}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.cena}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.opremljenost}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.opis}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.naslov}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.opstina}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.grad}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.drzava}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.vrstaUsluge}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.brojSpratova}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.createdAt}</th>
                    <th onClick={(state) => openDetails(state)} a-key={val.id}  scope="col">{val.updatedAt}</th>
                </tr>
                ))}
                </tbody>
              </table>
              <button className='deleteProduct' onClick={deleteRow}>Obrisi</button>
              <button onClick={(openAdd)} className="openAddProduct">Dodaj proizvod</button>
              {isOpen && <Popup
              content={productDetailsObject}
              handleClose={togglePopup}
              
            />}
            {isOpenAdd && <PopupAdd
              handleClose={togglePopupAdd}
            />}
        </>
      ):(
        <Login></Login>
      )}
      </>
    </>
  )
}
