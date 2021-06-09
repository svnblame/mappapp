import React, { useState, useLayoutEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import { render } from "react-dom";

function App() {
  const [marker, setMarker] = useState(); // default value is undefined

  // Mock store locations from db.
  const stores = {
    central: [12.567898, 55.67583],
    norrebro: [12.553806, 55.699299],
    airport: [12.650784, 55.618042]
  }

  function handleStoreChange(event) {
    const location = event.target.value;
    marker.setLgnLat(stores[location]);
  }

  mapboxgl.accessToken = "pk.eyJ1Ijoic3ZuYmxhbWUiLCJhIjoiY2twN2c1NHZpMDhobDJ3bGlkNjF0NWszaCJ9.go5qKdpS6kG93XxNP2v73w";

  useLayoutEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // matches <div id="map" />
      style: 'mapbox://styles/mapbox/dark-v10', // sets the dark mode
      center: [12.567898, 55.675830], // Sets the center of the map (long, lat)
      zoom: 9
    });

    // Add marker
    const marker = new mapboxgl.Marker()
      .setLngLat([12.567898, 55.675830])
      .addTo(map);

      setMarker(marker);
  }, []);

  return <>
    <div className='map-overlay'>
      <h3>Choose Store: </h3>
      <select onChange={handleStoreChange}>
        <option value="central">Central Station</option>
        <option value="norrebro">Norrebro street</option>
        <option value="airport">CPH Airport</option>
      </select>
    </div>
    <div id="map"></div>
  </>;
}

// Do NOT modify the code below
// Special map loading setup
// specific to react-tutorial.app
const script = document.createElement("script");
script.src = "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js";
script.onload = () => {
  render(<App />, document.querySelector("#react-root"));
}

document.body.appendChild(script)
