import './App.css'
import L from 'leaflet'

function App() {
  const map = L.map('map').setView([51.505, -0.09], 13);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>yo</h1>
        <div id='map'></div>
      </header>
    </div>
  );
}

export default App;
