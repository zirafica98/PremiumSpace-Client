
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import MyForm from "./Form";

const PopupAdd = props => {
    
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className="details">
            <div className="createBlogPage">
                <h3>Dodaj strucni tekst</h3>
                <MyForm action="add"></MyForm>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAdd;
