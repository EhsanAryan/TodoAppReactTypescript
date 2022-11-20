import React , { FormEvent } from "react";
import "../styles/form-style.css"


interface PropsType {
    submitPerson: (event: FormEvent) => void;
}



const Form: React.FunctionComponent<PropsType> = (props) => {

    return(
        <form className="form">
            <section id="firstName-section">
                <label className="label-style">First Name :</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter the first name..." className="name-input" />
            </section>
            <section id="lastName-section">
                <label className="label-style">Last Name :</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter the last name..." className="name-input" />
            </section>
            <section id="age-section">
                <label className="label-style">Age :</label>
                <input type="text" id="age" name="age" placeholder="Enter the age..." className="name-input" />
            </section>
            <section id="city-section">
                <label className="label-style">City :</label>
                <input type="text" id="city" name="city" placeholder="Enter your city..." className="name-input" list="city-list" />
                <datalist id="city-list">
                    <option value="Qom" />
                    <option value="Tehran" />
                    <option value="Shiraz" />
                    <option value="Mashhad" />
                    <option value="Ahwaz" />
                </datalist>
            </section>
            <section id="btn-section">
                <button type="reset" className="form-btn">Reset</button>
                <button type="submit" className="form-btn" onClick={props.submitPerson}>Submit</button>
            </section>
        </form>
    
    );
}

export default Form;