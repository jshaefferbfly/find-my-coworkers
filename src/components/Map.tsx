import { useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup, Circle } from 'react-leaflet'
import { UserData } from '../App'

interface Props {
	users: UserData[]
	me: UserData
}

const Map = ({ users, me }: Props) => {

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
