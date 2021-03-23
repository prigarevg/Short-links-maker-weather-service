import React, {useState, useEffect, useContext, useRef, render, useCallback} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import { useHistory, useParams } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, Circle, ser} from 'react-leaflet'
import L from 'leaflet'
import '../components/Map.css'
import {Loader} from '../components/Loader'


export const CoordinatesDetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [coordinates, setCoordinates] = useState([])
  const coordinateId = useParams().id
  //const [position, setPosition] = useState([48.69408737533759, 44.41986658271402])

  const getCoordinates = useCallback(async () => {
    try {
      const fetched = await request(`/api/latlng/${coordinateId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCoordinates(fetched)
      //console.log(fetched)
    } catch (e) {}
  }, [token, coordinateId, request])

  useEffect(() => {
    getCoordinates()
  }, [getCoordinates])

  function LocationMarker() {
  
    const latlng = [coordinates.lat, coordinates.lng]
    console.log(latlng)

    const map = useMapEvents({
      click() {
        map.flyTo(latlng, map.getZoom())
      }
    })
  
    return latlng === null ? null : (
      <Marker position={latlng}>
        <Popup>You are here</Popup>
      </Marker>
    )

  }
  //console.log(coordinates)

 

  if (loading) {
    return <Loader />
  }

  return (
    
    <MapContainer
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={16}
    scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/*coordinates.map((city, index)=><Marker
    position={[city.lat, city.lng]}
    key = {index}
    ></Marker>)*/
  }
  
    <LocationMarker />
  </MapContainer>
  )
}