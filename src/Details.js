import { useContext } from "react"
import { countriesContext } from "./context/Countries"
import { Link } from "react-router-dom"
import style from './Details.module.css'

export default function Details() {

    const [state, dispatch] = useContext(countriesContext)

    const country = state.choosenCountry


    function backCB ()  {
        dispatch({
            type: 'backbtn'
        })
    }

    

    return (
        <>
            <div className={style.details} style={state.nightMode?{backgroundColor:'#222e37'}:{backgroundColor:"#fafafa"} }>
                <Link className={style.link} onClick={backCB} to='/'><div className={style.backbtn}
                style={state.nightMode?{backgroundColor:'#2b3743',color:'white'}:{backgroundColor:'#ffffff'}}>Back</div></Link>
                <div className={style.detailssection} style={state.nightMode?{color:'#ffffff'}:{color:'black'}}>
                    
                    <img src={country.flags.png} alt="flag"/>

                    <div className={style.countrydetails}>

                        <div className={style.firstsection}>

                        <h2 className={style.countryname}>{country.name.common}</h2>
                            <div>Official name:   {country.name.official}</div>
                            <div>Population:   {country.population}</div>
                            <div>Region:   {country.region}</div>
                            <div>Capital:   {country.capital}</div>
                        </div>

                        <div className={style.secondsection}>
                            <div>Money:   {Object.keys(country.currencies).map(i=>(`${i}  `))}</div>
                            <div>Languages:   {Object.keys(country.languages).map(i=>(`${i}  `))}</div>
                            <div>Area:   {country.area}</div>
                            <div>Time Zones:   {country.timezones.map(i=>(`${i}  `))}</div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}