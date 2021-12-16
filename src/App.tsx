import Map from './components/Map'
import './App.css'
import UserModal from './components/UserModal';
import { useEffect, useState } from 'react';

function App() {
  return (
    <>
      <UserModal/>
      <Map />
    </>
  );
}

export default App;
