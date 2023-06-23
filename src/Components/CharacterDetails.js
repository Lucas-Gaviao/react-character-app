import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"


function CharacterDetails (props){

    const { characterId } = useParams()

    const navigate = useNavigate();

    const [details, setDetails] = useState({})

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
        .then((characterDetails) => {
          //console.log(characters.data)
          setDetails(characterDetails.data)
        })
        .catch((e) => console.log("error to get characters", e))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const deleteCharacter = (characterId) => {

       axios.delete(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
       .then((response) => {
        console.log("our character was successfully deleted...")
        //console.log(response);

        props.callback(); // update list on home page

        navigate("/"); //redirect to home page
        
       })
       .catch(e => console.log(e))
      }

    return (
        <div key={details.id} className="listDiv">
                <b>Name:</b> {details.name}
              <br /><br />
                <b>Occupation:</b> {details.occupation}
              <br /><br />
                <b>Weapon:</b> {details.weapon}
              <br /><br />
            <Link to="/">Back</Link>
            <button onClick={() => {deleteCharacter(details.id)}}>Delete</button>
        </div>

    )
}

export default CharacterDetails;