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
  const [me, setMe] = useState<UserData>(
    {
      location: [40.743440, -73.987250],
      name: 'JD',
      team: 'Cloud'
    }
  )
  const [users, setUsers] = useState<UserData[]>([
    {
      location: [40.743440, -73.987250],
      name: 'JD',
      team: 'Cloud'
    },
    {
      location: [40.743350, -73.987030],
      name: 'Bob',
      team: 'Cloud'
    }
  ])

  return (
    <>
      <Map users={users} me={me} />
    </>
  );
}

export default App
