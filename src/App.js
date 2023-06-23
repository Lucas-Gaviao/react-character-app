import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, NavLink, Link } from 'react-router-dom';
import CharacterDetails from './Components/CharacterDetails'

function App() {

  const [characterList, setCharacterList] = useState(null)

  useEffect(() => { getCharactersFromApi() }, [])

  const getCharactersFromApi = () => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/characters`)
    .then((characters) => {
      //console.log(characters.data)
      setCharacterList(characters.data.slice(0, 10)) // storing the information into characterList state.
    })
    .catch((e) => console.log("error to get characters", e))
  }



  const renderListOfCharacters = () => {
    if(characterList === null){
      return <p>loading....</p>;
    } else {
      return characterList.map((characterObj) => {
        return (
          <div key={characterObj.id} className="listDiv">
            Name: {characterObj.name} <br />
            Weapon: {characterObj.weapon} <br />
            <Link to={`/characters/${characterObj.id}`}>More details</Link>
          </div>
        )
      })
    }
  }

  


  return (
    <div className="App">
        <h1>React App Do Pai</h1>

        <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={ renderListOfCharacters() } />
        <Route path='/characters/:characterId' element={ <CharacterDetails callback={getCharactersFromApi}/> } />
        <Route path='/contact' element={<p>This is the contact page</p>} />
 
      </Routes>

    </div>
  );
}

export default App;
