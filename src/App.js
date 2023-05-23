import {  useContext, useRef } from 'react';
import './App.css';
import Card from './Cards';
import { countriesContext } from './context/Countries';
import moon from './moon-regular.svg'
import { Outlet } from 'react-router-dom';


function App() {


  const inputValue = useRef()
  const [state, dispatch] = useContext(countriesContext)

  async function getRegion(e) {
    if (e.target.value === "") {
      return
    }
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${e.target.value}`);
      const json = await response.json();

      dispatch({
        type: 'region',
        payload: json
      })
    } catch (error) {
      console.error(error)

    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${inputValue.current.value}`);
      const json = await response.json();

      if (json instanceof Array) {
        dispatch({
          type: 'region',
          payload: json
        })
      } else {
        dispatch({
          type: 'region',
          payload: []
        })
        alert('netice tapilmadi')
      }
    } catch (error) {
      console.error(error)

    }
    inputValue.current.value = ''
  }

  function modeChange()  {
    dispatch({
      type: 'mode',
    })
  }




  return (
    <>
      <div className='header' style={state.nightMode ? { backgroundColor: '#2b3743' } : { backgroundColor: '#ffffff' }}>
        <h1>Where in the world?</h1>
        <button className='darkmode' onClick={modeChange} style={state.nightMode ? { backgroundColor: '#2b3743',color:'white' } : { backgroundColor: '#ffffff' }}><img className='moon' alt='moon' src={moon}
        />Dark Mode</button>
      </div>
      {!state.details ?
        <div className='body' style={state.nightMode ? { backgroundColor: '#222e37' } : { backgroundColor: "#fafafa" }}     >
          <div className='firstsection'>
            <form onSubmit={submitHandler}>
              <input className='input' placeholder='Search for a country...' ref={inputValue} ></input>
            </form>
            <select onChange={getRegion} name="regions" id="region" >
              <option value="">Select region</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="america">America</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
          <div className='cards'>
            {

              state.countries.map((item, index) => (
                <Card value={item} key={index + item.name.common} name={item.name.common} population={item.population} region={item.region} capital={item.capital} img={item.flags.png} />
              ))
            }
          </div>
        </div>
        :
        <Outlet />
      }
    </>
  );
}

export default App;
