import { useEffect } from "react";
import * as L from "leaflet";
import { MapContainer, Marker, TileLayer, Circle, Tooltip } from "react-leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import { UserData } from "../App";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

interface Props {
	users: UserData[];
	me: UserData;
}

const Map = ({ users, me }: Props) => {
	useEffect(() => {
		L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
	}, []);

	const handleUserSelect = () => {
		console.log("hello");
	};

	return (
		<MapContainer center={me.location} zoom={17} scrollWheelZoom={false} gestureHandling={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={me.location}>
				<Tooltip permanent direction="top" offset={[-15, 30]} opacity={1} interactive={true}>
					<div onClick={handleUserSelect}>
						{me.name} <br />
						{me.team}
					</div>
				</Tooltip>
				<Circle center={me.location} radius={20} />
			</Marker>
		</MapContainer>
	);
};

export default Map;
