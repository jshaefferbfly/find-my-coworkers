import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import './App.css'

function App() {
  const position: LatLngExpression = [51.505, -0.09]

  return (
    <>
      <h1>yo</h1>
      <MapContainer className='map' center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
