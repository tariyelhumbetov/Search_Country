import { Link } from 'react-router-dom'
import styles from './Cards.module.css'
import { useContext } from 'react'
import { countriesContext } from './context/Countries'



export default function Card(props) {

    const [state, dispatch] = useContext(countriesContext)
    

    function details() {
   
        dispatch({
            type:'country',
            payload:props.value

        })
    }

    return (
        <>
            <Link  onClick={details} className={styles.card} to='./details' style={state.nightMode?{backgroundColor:'#91c5ce'}:{backgroundColor:'#ffffff'}}>
                <img src={props.img} alt='img'></img>
                <h2>{props.name}</h2>
                <p>Population:{props.population}</p>
                <p>Region:{props.region}</p>
                <p>Capital:{props.capital}</p>
            </Link>
        </>
    )
}