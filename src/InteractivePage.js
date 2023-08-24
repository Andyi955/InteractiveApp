import React, { useState,useRef,useCallback } from 'react';
import Scene from './components/Scene';
import ControlPanel from './components/ControlPanel';
import MoodSelector from './components/MoodSelector'; 
import * as BABYLON from 'babylonjs';
import './styles.css';

const InteractivePage = () => {
  const [cubeColor, setCubeColor] = useState('#ffffff');
  const [wireframe, setWireframe] = useState(false);
  const [bounceDuration, setBounceDuration] = useState(2000); // Default 2000ms
const [bounceHeight, setBounceHeight] = useState(0.1); // Default 0.1 units
const [bounceAnimationFunction, setBounceAnimationFunction] = useState(null);

  const [loopCount, setLoopCount] = useState(2);
  // Ref definitions
  const cubeRef = useRef(null);
  const cameraRef = useRef(null);
  const originalCameraTargetRef = useRef(null);
  const sceneRef = useRef(null);
  const cubeMaterialRef = useRef(null); // If you are using this ref inside Scene component

  const bounceAnimationCallback = useCallback((bounceFunc) => {
    setBounceAnimationFunction(() => bounceFunc);
  }, []);

  // ... handlers and other functions ...
  const handleColorChange = (event) => {
    const hexColor = event.target.value;
    setCubeColor(hexColor); // Update the cubeColor state with the selected color
  
    // Update the material color directly via the ref
    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.diffuseColor = BABYLON.Color3.FromHexString(hexColor);
    }
  };
  
 

  const handleSizeIncrease = () => {
    const cube = cubeRef.current;
    if (cube) {
      cube.scaling.addInPlace(new BABYLON.Vector3(0.1, 0.1, 0.1));
    }
  };

  const handleSizeDecrease = () => {
    const cube = cubeRef.current;
    if (cube) {
      cube.scaling.subtractInPlace(new BABYLON.Vector3(0.1, 0.1, 0.1));
    }
  };

  const handleReset = () => {
    const cube = cubeRef.current;
    const camera = cameraRef.current;
    if (cube) {
      cube.scaling = new BABYLON.Vector3(1, 1, 1); // Reset the cube size
      cube.rotation = new BABYLON.Vector3(0, 0, 0); // Reset the cube rotation
      cube.position = new BABYLON.Vector3(0, 0, 0); // Reset the cube position to the center
      cube.computeWorldMatrix(true); // Update the cube's world matrix to apply the changes immediately

    }
    if (cameraRef.current && originalCameraTargetRef.current) {
      cameraRef.current.target.copyFrom(originalCameraTargetRef.current);
    }
    if (camera) {
      camera.alpha = -Math.PI / 2;
      camera.beta = Math.PI / 2.5;
      camera.radius = 10;
    }
    // Reset the cube color to white
    setCubeColor('#ffffff');
    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.diffuseColor = BABYLON.Color3.FromHexString('#ffffff');
    }
  };
  const handleWireframeToggle = () => {
    const cube = cubeRef.current;
    if (cube) {
      setWireframe(!wireframe);
      cube.material.wireframe = !wireframe;
    }
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
          cubeColor={cubeColor}
          cubeRef={cubeRef}
          cameraRef={cameraRef}
          originalCameraTargetRef={originalCameraTargetRef}
          sceneRef={sceneRef}
          wireframe={wireframe}
          handleSizeIncrease={handleSizeIncrease}
          handleSizeDecrease={handleSizeDecrease}
          handleReset={handleReset}
          handleWireframeToggle={handleWireframeToggle}
          bounceAnimationCallback={bounceAnimationCallback} // pass callback to Scene
          />

          <ControlPanel
            handleReset={handleReset}
            cubeColor={cubeColor}
            handleColorChange={handleColorChange}
            handleSizeIncrease={handleSizeIncrease}
            handleSizeDecrease={handleSizeDecrease}
            handleWireframeToggle={handleWireframeToggle}
            bounceDuration={bounceDuration}
            setBounceDuration={setBounceDuration}
            bounceHeight={bounceHeight}
            setBounceHeight={setBounceHeight}
            loopCount={loopCount}
            setLoopCount={setLoopCount}
            bounceAnimation={bounceAnimationFunction} // pass bounceAnimation function to ControlPanel
            />
        </div>
      </div>
      <MoodSelector />
    </div>
  );
  
};

export default InteractivePage;
