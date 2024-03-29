import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getWeatherAction, removeOtherCity } from '../../redux/actions';
import { returnImagesSource } from '../../services/ImageGiver';
import './OtherCityCard.css'

import { useSelector } from 'react-redux';



const OtherCityCard = ({oth_city}) => {

  
  let condition = oth_city.weather[0].description;
  let a = condition[0].toUpperCase();
  condition = a + condition.substring(1)

  
  let imgsrc;

  const dispatch = useDispatch()

  imgsrc = returnImagesSource(oth_city.weather[0].description);

  const DeleteOtherCity = () => {
    dispatch(removeOtherCity(oth_city.name))
    setTemp('true')
  }

    const[temp,setTemp] =useState('false')

  const cityChangeHandler = () =>{
      oth_city && dispatch(getWeatherAction(oth_city.name))
  }

  useEffect(() => {
    
  }, [temp])
  
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;



  return (
    <div className={!isdarkMode ?'other-city-card' :'other-city-card light-other-city-card'}
    onClick={cityChangeHandler}
      // {...bindDivPos()}
      style={{
        cursor: "pointer",
      }}>

      <div className='location-name-condn'>
        <span>{oth_city.name}</span>
        <span>{condition}</span>
      </div>

    
      <div className='location-weather-img'>
        <img src={imgsrc} alt='weather'></img>
        <span>{oth_city.temp}</span>
      </div>

      <div className='location-del-icon'>
        <i className='fas fa-trash' onClick={DeleteOtherCity} style={{'cursor':'pointer'}}/>
      </div>
    </div>
  )
}

export default OtherCityCard