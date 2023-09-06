import './App.css';
import React from 'react';
import InteractivePage from './InteractivePage';
import NavBar from './components/NavBar';  // Import the NavBar component


function App() {
  return (
    <div className="App">
      <NavBar />  {/* Add the NavBar at the top */}
    <InteractivePage /> {/* Include the new component */}
    </div>
  );
}

export default App;
