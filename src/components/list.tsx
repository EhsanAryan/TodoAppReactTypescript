import React from "react";
import "../styles/list-style.css"


interface PropsType {
    persons : {fName: string , lName: string , age: number , city: string , id: string}[];
    deletePerson: (personId: string) => void;
};

const List: React.FunctionComponent<PropsType> = (props) => {
    return(
        <ul className="main-list">
            {props.persons.map(person => {
                return(
                    <li id={person.id} className="list-item">
                        <span>{person.fName} , {person.lName} , {person.age} , {person.city}</span>
                        <button type="button" className="delete-btn" onClick={props.deletePerson.bind(null , person.id)}>Delete</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default List;