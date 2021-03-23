import React, {useState, useEffect, useContext, useRef, render, useCallback} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import { useHistory } from "react-router-dom";
import {CoordinatesList} from "../components/CoordinatesList"
import {Loader} from "../components/Loader"
import { Layout, Menu, Breadcrumb } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, Circle, ser} from 'react-leaflet'
import L from 'leaflet'
import '../components/Map.css'


const { Header, Content, Footer } = Layout;

export const AnalysisPage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  var popup = L.popup();
  const {token} = useContext(AuthContext)
  const [coordinates, setCoordinates] = useState([])
  const [position, setPosition] = useState(null)
  const fetchCoordinates = useCallback ( async () => {
    try{
      const fetched = await request ('api/latlng/getLatLng', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCoordinates(fetched)
      console.log(fetched)
    }
    catch(e){
      
    }
  }, [token, request])

  useEffect(()=> {
    fetchCoordinates()
  }, [fetchCoordinates])

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
 
  

 


  if (loading) {
    return <Loader/>
  }
  return (
   <>
    {!loading && <CoordinatesList coordinates={coordinates}/>}
   </>
  );
};
