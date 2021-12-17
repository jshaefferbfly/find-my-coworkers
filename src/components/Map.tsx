import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import { MapContainer, TileLayer, Circle, Tooltip, useMap, Popup } from "react-leaflet";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";
import { GestureHandling } from "leaflet-gesture-handling";
import { UserData } from "../App";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

interface Props {
	users: UserData[];
	me: UserData | undefined;
	handleOrderedUsers: (users: UserData[]) => void;
}

// const ChangeView = () => {
// 	const map = useMap();
// 	map.
// 	map.setView(center, zoom);
// 	return null;
// };

const Map = ({ users, me, handleOrderedUsers }: Props) => {
	useEffect(() => {
		L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
	}, []);

	const handleUserSelect = (user: UserData) => {
		const orderedUsers = users;
		orderedUsers.splice(orderedUsers.indexOf(user), 1);
		orderedUsers.push(user);
		handleOrderedUsers(orderedUsers);
	};

	return (
		<MapContainer center={[40.743439, -73.987251]} zoom={18} scrollWheelZoom={false} gestureHandling={true}>
			{/* <ChangeView /> */}
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{users.map((user) => {
				return (
					<div key={`${user.location}${user.name}${user.team}`}>
						<Circle center={user.location} radius={20}>
							<Popup closeOnClick={false} autoClose={false}>
								<div
									style={{
										display: "grid",
										placeItems: "center",
										margin: "-12px",
										marginLeft: "-20px",
										marginRight: "-20px",
										cursor: "pointer",
									}}
									onClick={() => handleUserSelect(user)}
								>
									<h5>{user.name}</h5>
									<p>{user.team}</p>
									<div style={{ maxWidth: "75px", minWidth: "75px" }}>
										<img
											src={`data:image/svg+xml;utf8,${encodeURIComponent(
												createAvatar(style, {
													seed: user.avatarId,
												})
											)}`}
										/>
									</div>
								</div>
							</Popup>
						</Circle>
					</div>
				);
			})}
		</MapContainer>
	);
};

export default Map;
