"use client"
import L from "leaflet"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import marketIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: marketIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

interface IMapProps {
  latlng?: number[]
}

const Map = ({ latlng }: IMapProps) => {
  return (
    <MapContainer
      center={(latlng as L.LatLngExpression) || [51, -0.09]}
      zoom={latlng ? 4 : 2}
      scrollWheelZoom={false}
      className={`h-[40vh] rounded-lg`}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {latlng && <Marker position={latlng as L.LatLngExpression} />}
    </MapContainer>
  )
}

export default Map
