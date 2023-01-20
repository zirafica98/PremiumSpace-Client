import React, { useState} from 'react'
import MessageBox from '../../MessageBox';
import FileBase64 from 'react-file-base64';


export default function MyForm() {
  const [success, setSuccess] = useState(false);


  //VALUE FROM INPUT
  const [vrstaUsluge, setVrstaUsluge] = useState("Prodaja");
  const [tipNekretnine, setTipNekretnine] = useState("Stan");
  const [naslov, setNaslov] = useState("");
  const [opis, setOpis] = useState("");
  const [drzava, setDrzava] = useState("");
  const [grad, setGrad] = useState("");
  const [opstina, setOpstina] = useState("");
  const [ulica, setUlica] = useState("");
  const [broj, setBroj] = useState("");
  const [uknjizenost, setUknjizenost] = useState("Uknjizeno");
  const [stanje, setStanje] = useState("Uobicajno");
  const [povrsina, setPovrsina] = useState("");
  const [brojSoba, setBrojSoba] = useState("");
  const [grejanje, setGrejanje] = useState("Nema grejanja");
  const [sprat, setSprat] = useState("");
  const [brojUkupnoSpratova, setBrojUkupnoSpratova] = useState("");
  const [opremljenost, setOpremljenost] = useState("Prazan");
  const [cena, setCena] = useState("Prazan");
  const [listingData,setListingData] = useState();



  const handleUpload = () => {

    var data = {
      vrstaUsluge:vrstaUsluge,
      tipNekretnine:tipNekretnine,
      naslov:naslov,
      opis:opis,
      drzava:drzava,
      grad:grad,
      opstina:opstina,
      ulica:ulica,
      broj:broj,
      uknjizenost:uknjizenost,
      stanje:stanje,
      povrsina:povrsina,
      brojSoba:brojSoba,
      grejanje:grejanje,
      sprat:sprat,
      brojSpratova:brojUkupnoSpratova,
      opremljenost:opremljenost,
      cena:cena,
      slika:"",
      base64:listingData
  }

  var formData = new FormData();
    var myarray = new Array();
    myarray.push(data);
    var paramsData = { myarray: myarray };
    formData.append('data',JSON.stringify(paramsData));
    formData.append('function', 'putRealEstate');
    var params = {
      method:'POST',
      body:formData
    }
    fetch("https://server.premiumspace.rs/RealEstate.php",params)
      .then(response => response.text())
      .then((response) => {
        if(response){
          setSuccess(true)
        }else{
          alert("Error");
        }
      })}

  const getFiles = (files) =>{
    var string="";
    files.forEach((element,index)=>{
      string=string+element.base64+"|||"
    })
    setListingData(string)
  }

  return (
    <div>
          {success && <MessageBox text="Uspesno ste dodali nekretninu" refresh={true}></MessageBox>}
          <div className="formContainer">
                <div className="content-form">
                    <div id="basicInf">
                        <h5>Osnovne informacije</h5>
                        {/* VRSTA USLUGE */}
                        <label>Vrsta usluge *</label>
                        <select name="vrstaUsluge" id="vrstaUsluge" onChange={(event) => {setVrstaUsluge(event.target.value);}}>
                            <option value="Prodaja">Prodaja</option>
                            <option value="Izdavanje">Izdavanje</option>
                        </select>
                        {/* TIP NEKRETNINE */}
                        <label>Tip nekretnine *</label>
                        <select name="tipNekretnine" id="tipNekretnine" onChange={(event) => {setTipNekretnine(event.target.value);}}>
                            <option value="Stan">Stan</option>
                            <option value="Kuca">Kuca</option>
                            <option value="Poslovni prostor">Poslovni prostor</option>
                            <option value="Plac">Plac</option>
                            <option value="Garaza">Garaza</option>
                        </select>
                        {/* NASLOV */}
                        <label>Naslov *</label>
                        <input type="text" id="naslov" name='naslov' placeholder='Unesite naslov...' onChange={(event) => {setNaslov(event.target.value);}} ></input>
                        {/* OPIS */}
                        <label>Opis</label>
                        <textarea name='opis' id='opis' placeholder='Unesite opis proizvoda' onChange={(event) => {setOpis(event.target.value);}}></textarea>
                        {/* DRZAVA */}
                        <label>Drzava *</label>
                        <input type="text" id="drzava" name='drzava' placeholder='Unesite drzavu...' onChange={(event) => {setDrzava(event.target.value);}}></input>
                        {/* GRAD */}
                        <label>Grad *</label>
                        <input type="text" id="grad" name='grad' placeholder='Unesite grad...' onChange={(event) => {setGrad(event.target.value);}}></input>
                        {/* OPSTINA */}
                        <label>Opstina *</label>
                        <input type="text" id="opstina" name='opstina' placeholder='Unesite opstinu...' onChange={(event) => {setOpstina(event.target.value);}}></input>
                        {/* ULICA */}
                        <label>Ulica</label>
                        <input type="text" id="ulica" name='ulica' placeholder='Unesite ulicu...' onChange={(event) => {setUlica(event.target.value);}}></input>
                        {/* BROJ */}
                        <label>Broj</label>
                        <input type="text" id="broj" name='broj' placeholder='Unesite broj...' onChange={(event) => {setBroj(event.target.value);}}></input>
                        {/* UKNJIZENOST */}
                        <label>Uknjizenost</label>
                        <select name="uknjizenost" id="uknjizenost" onChange={(event) => {setUknjizenost(event.target.value);}}>
                            <option value="Uknjizeno">Uknjizeno</option>
                            <option value="Nije uknjizeno">Nije uknjizeno</option>
                            <option value="U procesu uknjizenja">U procesu uknjizenja</option>
                            <option value="Delimicno uknjizeno">Delimicno uknjizeno</option>
                        </select>
                        {/* STANJE */}
                        <label>Stanje</label>
                        <select name="stanje" id="stanje" onChange={(event) => {setStanje(event.target.value);}}>
                            <option value="Uobicajno">Uobicajno</option>
                            <option value="Novo">Novo</option>
                            <option value="U izgradnji">U izgradnji</option>
                            <option value="Renovirano">Renovirano</option>
                            <option value="Potrebno renoviranje">Potrebno renoviranje</option>
                            <option value="Dobro stanje">Dobro stanje</option>
                            <option value="Staro">Staro</option>
                            <option value="Odrzavano">Odrzavano</option>
                            <option value="Luksuzno">Luksuzno</option>
                        </select>
                        {/* POVRSINA */}
                        <label>Povrsina</label>
                        <input type="text" id="povrsina" name='povrsina' placeholder='Unesite povrsinu...' onChange={(event) => {setPovrsina(event.target.value);}}></input>
                    </div>
                    <div id="moreInf">
                        <h5>Dodatne informacije</h5>
                        {/* BROJ SOBA */}
                        <label>Broj soba</label>
                        <input type="text" id="brojSoba" name='brojSoba' placeholder='Unesite broj soba...' onChange={(event) => {setBrojSoba(event.target.value);}}></input>
                        {/* GREJANJE */}
                        <label>Grejanje</label>
                        <select name='grejanje' id='grejanje' onChange={(event) => {setGrejanje(event.target.value);}}>
                            <option value="Nema grejanja">Nema grejanja</option>
                            <option value="Centralno">Centralno</option>
                            <option value="Erazno">Etazno</option>
                            <option value="Struja">Struja</option>
                            <option value="Gas">Gas</option>
                            <option value="Kaljeva pec">Kaljeva pec</option>
                            <option value="Ta pex">Ta pec</option>
                            <option value="Norveski radijatori">Norveski radijatori</option>
                            <option value="Podno">Podno</option>
                            <option value="Cvrsto gorivo">Cvrsto gorivo</option>
                            <option value="Alokatori">Alokatori</option>
                            <option value="Toplotna pumpa">Toplotna pumpa</option>
                            <option value="Klima">Klima</option>
                            <option value="Merni radijator">Mermerni radijator</option>
                        </select>
                        {/* SPRAT */}
                        <label>Sprat</label>
                        <input type="text" id="sprat" name='sprat' placeholder='Unesite sprat...' onChange={(event) => {setSprat(event.target.value);}}></input>
                        {/* BROJ SPRATOVA */}
                        <label>Broj ukupno spratova u zgradi</label>
                        <input type="text" id="brojSpratova" name='brojSpratova' placeholder='Unesite ukupan broj spratova...' onChange={(event) => {setBrojUkupnoSpratova(event.target.value);}}></input>
                        {/* OPREMLJENOST */}
                        <label>Opremljenost</label>
                        <select name='opremljenost' id='opremljenost' onChange={(event) => {setOpremljenost(event.target.value);}}>
                            <option value="prazan">Prazan</option>
                            <option value="polunamesten">Polunamesten</option>
                            <option value="namesten">Namesten</option>
                        </select>
                        {/* DODAVANJE FOTOGRAFIJA */}
                        <label>Dodaj fotografije</label>
                        <FileBase64 type="file" multiple={true} onDone={ getFiles.bind(this) } />
                        {/* CENA */}
                        <label>Cena</label>
                        <input type="text" id="cena" name='cena' placeholder='Unesite cenu nekretnine...' onChange={(event) => {setCena(event.target.value);}}></input>
                    </div>
                </div>
                <div className="button-section">
                    <button onClick={handleUpload}>Dodaj proizvod</button>
                </div>
        </div>
    </div>
  )
}
