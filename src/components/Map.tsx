import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as L from "leaflet";
import { MapContainer, Marker, TileLayer, Circle, Tooltip } from "react-leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";
import { UserData } from "../App";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

interface Props {
	users: UserData[];
	me: UserData;
	// setUsers: (users: UserData[]) => void;
}

const Map = ({ users, me }: Props) => {
	useEffect(() => {
		L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
		console.log(users);
	}, [users]);

	// const handleUserSelect = (user: UserData) => {
	// 	const orderedUsers = users;
	// 	orderedUsers.splice(orderedUsers.indexOf(user), 1);
	// 	orderedUsers.push(user);
	// 	setUsers(orderedUsers);
	// };

	return (
		<MapContainer center={me.location} zoom={17} scrollWheelZoom={false} gestureHandling={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{users.map((me) => {
				return (
					<Marker position={me.location} key={`${me.location}${me.name}${me.team}`}>
						<Tooltip permanent direction="top" offset={[-15, 30]} opacity={1} interactive={true}>
							<div style={{ display: "grid", placeItems: "center" }}>
								<h5>{me.name}</h5>
								<p>{me.team}</p>
								<div style={{ maxWidth: "75px", minWidth: "75px" }}>
									<img
										src={`data:image/svg+xml;utf8,${encodeURIComponent(
											createAvatar(style, {
												seed: uuidv4(),
											})
										)}`}
									/>
								</div>
							</div>
						</Tooltip>
						<Circle center={me.location} radius={20} />
					</Marker>
				);
			})}
		</MapContainer>
	);
};

export default Map;
