import { useEffect } from 'react'
import * as L from 'leaflet'
import { MapContainer, Marker, TileLayer, Popup, Circle } from 'react-leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import { UserData } from '../App'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

interface Props {
	users: UserData[]
	me: UserData
}

const Map = ({ users, me }: Props) => {
	useEffect(() => {
		L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
	}, [])

	return (
		<MapContainer center={me.location} zoom={15} scrollWheelZoom={false} gestureHandling={true}>
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
