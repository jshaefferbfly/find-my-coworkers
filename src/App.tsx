import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import firebase from "firebase/compat/app";
import { getFirestore, setDoc, doc, getDocs, collection, getDoc } from "firebase/firestore";
import Map from "./components/Map";
import UserModal from "./components/UserModal";
import Pass from "./components/Pass";
import "./App.css";
import ConnectedUsers from "./components/ConnectedUsers";
import { relative } from "path/posix";

export interface UserData {
	location: LatLngExpression;
	name: string;
	team: string;
	avatarId: string;
	zIndex: number;
}

function App() {
	const [users, setUsers] = useState<UserData[]>();
	const [me, setMe] = useState<UserData | undefined>();
	const [hasPassword, setHasPassword] = useState<string | null>();
	firebase.initializeApp({
		apiKey: process.env.REACT_APP_API_KEY,
		authDomain: "find-my-coworker.firebaseapp.com",
		projectId: "find-my-coworker",
		storageBucket: "find-my-coworker.appspot.com",
		messagingSenderId: "915603448833",
		appId: "1:915603448833:web:8d2c551cf209ed65a10c00",
		measurementId: "G-NWK2X73D3Q",
	});

	const db = getFirestore();

	// eslint-disable-next-line
	async function docRef(data: any) {
		const users = await getDocs(collection(db, "users"));

		const id = `${data.name}!${data.team}!${data.avatarId}!${users.size + 1}`;
		await setDoc(doc(db, "users", id), data.location);

		localStorage.setItem("name", data.name);
		localStorage.setItem("team", data.team);
		localStorage.setItem("location", `${data.location.latitude},${data.location.longitude}`);
		localStorage.setItem("avatarId", data.avatarId);
	}

	useEffect(() => {
		(async () => {
			const usersRef = collection(db, "users");
			const querySnapshot = await getDocs(usersRef);
			const newUserArr: UserData[] = [];
			querySnapshot.forEach((doc) => {
				const location: LatLngExpression = [doc.data().latitude, doc.data().longitude];
				const newUser = {
					location,
					name: doc.id.split("!")[0],
					team: doc.id.split("!")[1],
					avatarId: doc.id.split("!")[2],
					zIndex: +doc.id.split("!")[3],
				};
				newUserArr.push(newUser);
			});
			setUsers(newUserArr);
		})();
	}, [db]);

	useEffect(() => {
		setHasPassword(localStorage.getItem("butterfly"));
		const name = localStorage.getItem("name");
		const team = localStorage.getItem("team");
		const avatarId = localStorage.getItem("avatarId");
		const location: number[] | undefined = localStorage
			.getItem("location")
			?.split(",")
			.map((str) => +str);

		if (name && team && location && avatarId) {
			setMe({
				name,
				team,
				location: [location[0], location[1]],
				avatarId,
				zIndex: 0,
			});
		}
	}, []);

	const handleOrderedUsers = (orderedUsers: UserData[]) => {
		// delete all users
		// save all users
		setUsers([...orderedUsers]);
	};

	useEffect(() => {
		console.log(users);
	}, [users]);

	return !hasPassword ? (
		<Pass handlePass={() => setHasPassword("true")} />
	) : (
		<div style={{ position: "relative" }}>
			{users ? <ConnectedUsers users={users} /> : <></>}
			{!me ? <UserModal handleDB={docRef} /> : <></>}
			{users ? <Map users={users} me={me} handleOrderedUsers={handleOrderedUsers} /> : <></>}
		</div>
	);
}

export default App;
