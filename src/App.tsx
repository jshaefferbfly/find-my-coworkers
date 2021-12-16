import { useState } from 'react'
import { LatLngExpression } from 'leaflet'
import Map from './components/Map'
import './App.css'

export interface UserData {
  location: LatLngExpression
  name: string
  team: string
}

function App() {
  const [users, setUsers] = useState<UserData[]>([
    {
      location: [40.743440, -73.987250],
      name: 'JD',
      team: 'Cloud'
    },
    {
      location: [40.743440, -73.987250],
      name: 'Bob',
      team: 'Cloud'
    }
  ])

  return (
    <>
      <Map users={users} />
    </>
  );
}

export default App
