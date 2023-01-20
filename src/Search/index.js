import React, {useState } from "react"
import Posts from "../Post";
import { useTranslation } from "react-i18next";
export default function SearchForm() {
  const { t } = useTranslation();
  const [type, setType] = useState("Stan");
  const [searchWord, setsearchWord] = useState("");
  const [sizeFrom, setsizeFrom] = useState("");
  const [sizeOf, setSizeOf] = useState("");
  const [priceFrom, setpriceFrom] = useState("");
  const [priceOf, setpriceOf] = useState("");
  const [isSubmitted,setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeService,setTypeService] = useState("Prodaja");
  const [dataArray,setDataArray] = useState([]);
  const [key,setKey] =useState(0);
  const submitSearch = () => {
    var data = {
      searchWord:searchWord,
      vrstaUsluge:typeService,
      tipNekretnine:type,
      sizeFrom:sizeFrom,
      sizeOf:sizeOf,
      priceFrom:priceFrom,
      priceOf:priceOf
    }
    setDataArray(data);
    setLoading(true);
    setIsSubmitted(true);
    setKey(key+1);
  }
  return(
    <div>
      <div className="container forms">
              <div className="input-group">
                  <select name="type" id="typService"  onChange={(e) => {setTypeService(e.target.value)}}>
                      <option value="Prodaja">{t("sell")}</option>
                      <option value="Izdavanje">{t("rent")}</option>
                  </select>
                  <select name="type" onChange={(e) => {setType(e.target.value)}}>
                      <option value="Stan">{t("apartment")}</option>
                      <option value="Kuca">{t("house")}</option>
                      <option value="Lokal">{t("shop")}</option>
                      <option value="PoslovniProstor">{t("business_premises")}</option>
                      <option value="Zemljiste">{t("land")}</option>
                      <option value="Garaza">{t("garage")}</option>
                  </select>
                  <input name="searchWord" type="text"  placeholder={t("placeholder_serach_word")} onChange={(e) => {setsearchWord(e.target.value)}} />
                  <input name="sizeFrom" type="text"  placeholder={t("placeholder_sizeOf")} onChange={(e) => {setsizeFrom(e.target.value)}} />
                  <input name="sizeOf" type="text"  placeholder={t("placeholder_sizeFrom")} onChange={(e) => {setSizeOf(e.target.value)}} />
                  <input name="priceFrom" type="text"  placeholder={t("placeholder_priceOf")} onChange={(e) => {setpriceFrom(e.target.value)}} />
                  <input name="priceOf" type="text"  placeholder={t("placeholder_priceFrom")} onChange={(e) => {setpriceOf(e.target.value)}}/>
                  <button className="button-prime" id="searchButton" onClick={submitSearch}>{t("serach_button")}</button>
              </div>
      </div>
      <div className="container result">
          <div className="result-search">
            <div className="search-container row">
              {loading && isSubmitted && <Posts key={key} filterData = {dataArray} loading={loading} pressSearch={isSubmitted} />}
            </div>
          </div>
      </div>
    </div>
  )
}
