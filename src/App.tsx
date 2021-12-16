import { LatLngExpression } from 'leaflet';
import Map from './components/Map';
import UserModal from './components/UserModal';
import { useEffect, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import { getFirestore, setDoc, doc, getDocs } from 'firebase/firestore';

export interface UserData {
	location: LatLngExpression;
	name: string;
	team: string;
}

function App() {
	firebase.initializeApp({
		apiKey: 'AIzaSyBWZ5AmsQTC78sCqXgYQccigjC5PJIhYAI',
		authDomain: 'find-my-coworker.firebaseapp.com',
		projectId: 'find-my-coworker',
		storageBucket: 'find-my-coworker.appspot.com',
		messagingSenderId: '915603448833',
		appId: '1:915603448833:web:8d2c551cf209ed65a10c00',
		measurementId: 'G-NWK2X73D3Q',
	});

	const db = getFirestore();
	// eslint-disable-next-line
	async function docRef(data:any) {
		const id = `${data.name}-${data.team}`;
		await setDoc(doc(db, 'users', id), data.location);
	}

	const [me, setMe] = useState<UserData>({
		location: [40.74344, -73.98725],
		name: 'JD',
		team: 'Cloud',
	});

	const [users, setUsers] = useState<UserData[]>([
		{
			location: [40.74344, -73.98725],
			name: 'JD',
			team: 'Cloud',
		},
		{
			location: [40.74335, -73.98703],
			name: 'Bob',
			team: 'Cloud',
		},
	]);

	return (
		<>
			<UserModal handleDB={docRef} />
			<Map users={users} me={me} />
		</>
	);
}

export default App;
