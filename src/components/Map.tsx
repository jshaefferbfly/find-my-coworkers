import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup, Circle } from 'react-leaflet'

interface UserData {
  location: LatLngExpression
  name: string
  team: string
}

const Map = () => {
  const [users, setUsers] = useState<UserData[]>()
  const [me, setMe] = useState<UserData>({
    location: [40.743440, -73.987250],
    name: 'JD',
    team: 'Cloud'
  })

	return (
		<MapContainer center={me.location} zoom={15} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={me.location}>
				<Popup>
					{me.name} <br />
					{me.team}
				</Popup>
				<Circle center={me.location} radius={50} />
			</Marker>
		</MapContainer>
	)
}

export default Map
