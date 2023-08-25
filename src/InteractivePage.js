import React, { useState,useCallback,useRef } from 'react';
import Scene from './components/Scene';
import ControlPanel from './components/ControlPanel';
import MoodSelector from './components/MoodSelector';
import useObjectControls from './hooks/useObjectControls'; 
import ObjectMenu from './components/ObjectMenu'; 
import * as BABYLON from 'babylonjs';
import { SketchPicker } from 'react-color'; // Import color picker component


import './styles.css';

const InteractivePage = () => {

  const [bounceDuration, setBounceDuration] = useState(2000); // Default 2000ms
const [bounceHeight, setBounceHeight] = useState(0.1); // Default 0.1 units
const [bounceAnimationFunction, setBounceAnimationFunction] = useState(null);
const [sceneObjects, setSceneObjects] = useState([]);
const [selectedObject, setSelectedObject] = useState(null);
const [selectedObjectColor, setSelectedObjectColor] = useState('#ffffff');





  const [loopCount, setLoopCount] = useState(2);
  const cameraRef = useRef(null);
const originalCameraTargetRef = useRef(null);

const sceneRef = useRef(null);

  const objectControls = useObjectControls(cameraRef,originalCameraTargetRef);
 

  


  const bounceAnimationCallback = useCallback((bounceFunc) => {
    setBounceAnimationFunction(() => bounceFunc);
  }, []);


  const handleObjectSelect = (object) => {
     // Set the selected object in the useObjectControls hook
     objectControls.objectRef.current = object;
    // Deselect any previously selected objects
    sceneObjects.forEach((obj) => obj.material && (obj.material.emissiveColor = new BABYLON.Color3(0, 0, 0)));
  
    // Highlight the selected object
    if (object.material) {
      object.material.emissiveColor = new BABYLON.Color3(1, 0, 0); // Red highlight
    }
  
   
  
    // Optionally, you could set a selected object state and use it elsewhere
    setSelectedObject(object);
  };
  
  
  const handleAddObject = (object) => {
    setSceneObjects([...sceneObjects, object]);
  };
  const handleColorChange = (colorValue) => {
    objectControls.handleColorChange(objectControls.objectRef.current, colorValue);
  };
  const handleSelectedObjectColorChange = (color) => {
    setSelectedObjectColor(color.hex);
    objectControls.handleColorChange(selectedObject, color.hex);
  };
  
 

  return (
    <div id="content">
      <div className="top-left-container">
        <button className="neon-button">Click me</button>
        <h1>Welcome to Our Interactive Page</h1>
      </div>
      <div id="dynamicGreeting"></div>
      <div className="centering-container">
        <div id="scene-and-menu">
        <Scene
          objectColor={objectControls.objectColor}
          objectRef={objectControls.objectRef}
          cameraRef={cameraRef}
          originalCameraTargetRef={originalCameraTargetRef}
          sceneRef={sceneRef}
          wireframe={objectControls.wireframe}
          handleSizeIncrease={objectControls.handleSizeIncrease}
          handleSizeDecrease={objectControls.handleSizeDecrease}
          handleReset={objectControls.handleReset}
          handleWireframeToggle={objectControls.handleWireframeToggle}
          bounceAnimationCallback={bounceAnimationCallback} // pass callback to Scene
          />

          <ControlPanel
            handleReset={objectControls.handleReset}
            objectColor={objectControls.objectColor}
            handleColorChange={handleColorChange}
            handleSizeIncrease={objectControls.handleSizeIncrease}
            handleSizeDecrease={objectControls.handleSizeDecrease}
            handleWireframeToggle={objectControls.handleWireframeToggle}
            bounceDuration={bounceDuration}
            setBounceDuration={setBounceDuration}
            bounceHeight={bounceHeight}
            setBounceHeight={setBounceHeight}
            loopCount={loopCount}
            setLoopCount={setLoopCount}
            bounceAnimation={bounceAnimationFunction} // pass bounceAnimation function to ControlPanel
            />
           <ObjectMenu
  sceneRef={sceneRef}
  objects={sceneObjects}
  onObjectSelect={handleObjectSelect}
  handleAddObject={handleAddObject}
  objectColor={objectControls.objectColor} // Pass objectColor here
/>

    {selectedObject && (
        <div>
          <SketchPicker
            color={selectedObjectColor}
            onChangeComplete={handleSelectedObjectColorChange}
          />
        </div>
    )}
        </div>
      </div>
      <MoodSelector />
    </div>
  );
  
};

export default InteractivePage;
