/*eslint eqeqeq:0*/

import { LatLngExpression } from "leaflet";
import Map from "./components/Map";
import UserModal from "./components/UserModal";
import { useEffect, useState } from "react";
import "./App.css";

import firebase from "firebase/compat/app";
import { getFirestore, setDoc, doc, getDocs, getDoc, collection, query, where } from "firebase/firestore";

export interface UserData {
	location: LatLngExpression;
	name: string;
	team: string;
}

function App() {
	firebase.initializeApp({
		apiKey: "AIzaSyBWZ5AmsQTC78sCqXgYQccigjC5PJIhYAI",
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
		const id = `${data.name}-${data.team}`;
		await setDoc(doc(db, "users", id), data.location);
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
					name: doc.id.split("-")[0],
					team: doc.id.split("-")[1],
				};
				newUserArr.push(newUser);
			});
			setUsers(newUserArr);
		})();
	}, [db]);

	const [me, setMe] = useState<UserData>({
		location: [40.74344, -73.98725],
		name: "JD Shaeffer",
		team: "Cloud",
	});

	const [users, setUsers] = useState<UserData[]>();

	return (
		<>
			<UserModal handleDB={docRef} />
			{users ? <Map users={users} me={me} /> : <></>}
		</>
	);
}

export default App;
