import React, {useCallback, useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const Scene = ({
  cubeColor,
  cubeRef,
  cameraRef,
  originalCameraTargetRef,
  sceneRef,
  bounceAnimationCallback
}) => {
  const canvasRef = useRef(null);
  const cubeMaterialRef = useRef(null);
 

  const bounceAnimation = useCallback((duration = 2000, height = 0.5, loopCount = 1) => {
    const cube = cubeRef.current;
    if (cube) {
      const originalY = cube.position.y;
      const framesPerLoop = 60;
      const totalFrames = framesPerLoop * loopCount;
  
      // Define the animation properties
      const animation = new BABYLON.Animation(
        'bounceAnimation',
        'position.y',
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT
      );
  
      // Define the keyframes using a sine curve
      const keys = [];
      for (let frame = 0; frame <= totalFrames; frame++) {
        const value = originalY + height * Math.sin((frame / framesPerLoop) * Math.PI);
        keys.push({ frame, value });
      }
      animation.setKeys(keys);
  
      // Stop any existing animations on the cube
      sceneRef.current.stopAnimation(cube);
  
      // Clear any existing animations on the cube
      cube.animations = [];
  
      // Add the new animation to the cube
      cube.animations.push(animation);
  
      // Begin the animation
      const animatable = sceneRef.current.beginAnimation(cube, 0, totalFrames, true);
  
      // Stop the animation after the total duration
      setTimeout(() => {
        animatable.stop();
      }, duration * loopCount);
    }
    },[cubeRef,sceneRef]);

    useEffect(() => {
        bounceAnimationCallback(bounceAnimation); // Pass bounceAnimation to parent through callback
      }, [bounceAnimation,bounceAnimationCallback]);


  // ... useEffect hooks for initializing the scene ...
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
// Set the canvas's rendering size to match its display size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
    // Initialize Babylon.js engine and scene
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine); // Create the scene here
    sceneRef.current = scene; // Assign it to the ref

    
    

    // Create a camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    cameraRef.current = camera; // Assign camera to ref
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 50; // Adjust the value to slow down the zoom
    originalCameraTargetRef.current = camera.target.clone(); // Store the original target


    // Create a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;

// Create a cube
const cube = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
// Assign cube to the ref
cubeRef.current = cube;
cube.rotation = new BABYLON.Vector3(0, 0, 0); // Set initial rotation values

// Define a material for the cube
const cubeMaterial = new BABYLON.StandardMaterial("material", scene);
cube.material = cubeMaterial;
// Assign material to ref
cubeMaterialRef.current = cubeMaterial;

// Update the material color based on the state
cubeMaterial.diffuseColor = BABYLON.Color3.FromHexString(cubeColor);;




    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize the engine when the window is resized
    window.addEventListener('resize', function() {
      engine.resize();
    });
     // Resize the engine when the window is resized
  const onResize = () => {
    engine.resize();
  };
    window.addEventListener('resize', onResize);

   
    // Clean up on unmount
    return () => {
        window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[] );


  useEffect(() => {
    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.diffuseColor = BABYLON.Color3.FromHexString(cubeColor);
    }
  }, [cubeColor,cubeRef]);

  return <canvas ref={canvasRef} id="renderCanvas"></canvas>;
};

export default Scene;
