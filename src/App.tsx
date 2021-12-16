import { LatLngExpression } from 'leaflet';
import Map from './components/Map';
import UserModal from './components/UserModal';
import { useEffect, useState } from 'react';
import './App.css';

export interface UserData {
	location: LatLngExpression;
	name: string;
	team: string;
}

function App() {
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
			<UserModal />
			<Map users={users} me={me} />
		</>
	);
}

export default App;
