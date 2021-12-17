import { useEffect } from "react";
import * as L from "leaflet";
import { MapContainer, TileLayer, Circle, Popup, Tooltip } from "react-leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import { UserData } from "../App";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

interface Props {
	users: UserData[];
	me: UserData | undefined;
	handleOrderedUsers: (users: UserData[]) => void;
}

const Map = ({ users, me, handleOrderedUsers }: Props) => {
	useEffect(() => {
		L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
	}, [users]);

	const handleUserSelect = (user: UserData) => {
		const orderedUsers = users;
		orderedUsers.splice(orderedUsers.indexOf(user), 1);
		orderedUsers.push(user);
		orderedUsers.map((user) => (user.name += " "));
		handleOrderedUsers(orderedUsers);
	};

	return (
		<MapContainer center={[40.743439, -73.987251]} zoom={18} scrollWheelZoom={false} gestureHandling={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{users.map((user) => {
				return (
					<div key={`${user.location}${user.name}${user.team}`}>
						<Circle center={user.location} radius={20}>
							<Tooltip permanent direction="top" opacity={1} interactive={true}>
								<div
									style={{
										display: "grid",
										placeItems: "center",
										margin: "-8px",
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
							</Tooltip>
						</Circle>
					</div>
				);
			})}
		</MapContainer>
	);
};

export default Map;
