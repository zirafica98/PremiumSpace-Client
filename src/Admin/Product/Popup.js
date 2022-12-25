
import React, {useCallback,useState} from "react";
import { Formik, Form, Field, ErrorMessage,useField } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
import MyFormEdit from "./FormEdit";




const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}

const Popup = props => {
  const [imageNames, setImageNames] = useState(props.content.slika);
  let history = useNavigate();
  const onDrop = useCallback(acceptedFiles => {
    var string="";
    acceptedFiles.forEach((element,index) =>{
      string=string+element.name+";"
    })
    setImageNames(string);
  }, [])

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className="details">
          <div className="createPostPage">
            <h3>Nekretnina broj {props.content.id}</h3>
            <MyFormEdit data={props.content}></MyFormEdit>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
