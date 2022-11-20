import React , { FormEvent , useState } from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import Form from "./components/form";
import List from "./components/list";


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


type validPersons = {fName: string , lName: string , age: number , city: string , id: string}[];

type validValue = {
    fName: string ,
    lName: string ,
    age: number ,
    city: string
}


function validate(value: validValue): boolean {
    let isValid = true;

    isValid = isValid && value.fName.trim().length !== 0;

    isValid = isValid && value.lName.trim().length !== 0;

    isValid = isValid && !Number.isNaN(value.age) && value.age > 0;

    isValid = isValid && value.city.trim().length !== 0;

    return isValid;
}




const App: React.FunctionComponent = () => {

  let [personsArray , changeState] = useState<validPersons>([]);


  const submitInformation = (event: FormEvent) => {
    event.preventDefault();

    let firstName_input = ReactDOM.findDOMNode(document.getElementById("firstName")) as HTMLInputElement;
    let firstName = firstName_input.value;
    let lastName_input = ReactDOM.findDOMNode(document.getElementById("lastName")) as HTMLInputElement;
    let lastName = lastName_input.value;
    let age_input = ReactDOM.findDOMNode(document.getElementById("age")) as HTMLInputElement;
    let age = Number(age_input.value);
    let city_input = ReactDOM.findDOMNode(document.getElementById("city")) as HTMLInputElement;
    let city = city_input.value;


    if(validate({fName: firstName , lName: lastName , age: age , city: city})){
        let newPerson: {
            fName: string ,
            lName: string ,
            age: number , 
            city: string ,
            id: string
        } = {
            fName: firstName , 
            lName: lastName ,
            age: age ,
            city: city ,
            id: Math.random().toString()
        }

        changeState(pervArray => [...pervArray , newPerson]);

        firstName_input.value = "";
        lastName_input.value = "";
        age_input.value = "";
        city_input.value = "";
    }
    else {
        alert("Invalid values or empty fields !!!");
    }
  }

  const deleteInformation = (personId: string) => {
    changeState(prevArray => {
        return (prevArray.filter(person => person.id !== personId));
    })
  }
  

  return (
    <>
      <Form submitPerson={submitInformation} />
      <List persons={personsArray} deletePerson={deleteInformation} />
    </>
  );
}




export default App;
