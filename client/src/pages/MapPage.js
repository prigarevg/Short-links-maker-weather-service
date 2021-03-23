import React, {useState, useEffect, useContext, useRef, render} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import { useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, message } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, Circle, ser} from 'react-leaflet'
import L from 'leaflet'
import '../components/Map.css'


const { Header, Content, Footer } = Layout;

export const MapPage = () => {const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  var popup = L.popup();
  const {token} = useContext(AuthContext)
  const [position, setPosition] = useState(null)
  const pressHandler = async ()=>{
    {
      try {
        console.log(position.lat, position.lng, auth.token)
        const data = await request('api/latlng/setLatLng', 'POST', {lat:position.lat, lng:position.lng}, {Authorization: `Bearer ${token}`})
        message.success('Координаты успешно добавлены!');
        
       console.log(data)
      } catch (e){
        message.error('Что-то пошло не так!');
        
      }
    }
  }
  
  function MyComponent() {
    const map = useMapEvent('click', (e) => {
      setPosition(e.latlng)
      
    
      //console.log(lat, lng, latitude, longitude);
   
    })
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  /*
  const pressHandler = async event =>{
    if (event.key === 'Enter') {
      try {
        console.log(position.lat, position.lng, auth.token)
        const fetched = await request ('api/latlng/getLatLng', 'GET', null, {
          Authorization: `Bearer ${auth.token}`})
    
        
       console.log(fetched)
      } catch (e){
        
      }
    }
  }
 */
 
  

 


  return (
      <div>
        <button  onClick={pressHandler}>Добавить</button>
    <MapContainer
      center={{ lat: 48.71291, lng: 44.52693 }}
      zoom={13}
      scrollWheelZoom={false}>
         
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     
     <MyComponent />
    </MapContainer>
    </div>
    
  );
};
