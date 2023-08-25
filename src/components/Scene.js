import React, {useCallback, useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const Scene = ({
  objectColor,
  objectRef,
  cameraRef,
  originalCameraTargetRef,
  sceneRef,
  bounceAnimationCallback
}) => {
  const canvasRef = useRef(null);
  const objectMaterialRef = useRef(null);
    // Define drag behavior outside of the useEffect
    const dragBehavior = new BABYLON.PointerDragBehavior({
      dragPlaneNormal: new BABYLON.Vector3(1, 1, 1)
    });
    
 

  const bounceAnimation = useCallback((duration = 2000, height = 0.5, loopCount = 1) => {
    const object = objectRef.current;
    if (object) {
      const originalY = object.position.y;
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
  
      // Stop any existing animations on the object
      sceneRef.current.stopAnimation(object);
  
      // Clear any existing animations on the object
      object.animations = [];
  
      // Add the new animation to the object
      object.animations.push(animation);
  
      // Begin the animation
      const animatable = sceneRef.current.beginAnimation(object, 0, totalFrames, true);
  
      // Stop the animation after the total duration
      setTimeout(() => {
        animatable.stop();
      }, duration * loopCount);
    }
    },[objectRef,sceneRef]);

    

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
    console.log('sceneRef:', sceneRef);

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


    const highlightLayer = new BABYLON.HighlightLayer("hl1", scene);


    const onClick = (event) => {
      const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
    
      // If a mesh was clicked on
      if (pickInfo && pickInfo.hit && pickInfo.pickedMesh) {
        console.log('Mesh clicked:', pickInfo.pickedMesh.name); // Log the clicked mesh
        highlightLayer.addMesh(pickInfo.pickedMesh, BABYLON.Color3.Green());
    
        // Attach the drag behavior only if it's not already attached
        if (!dragBehavior.attachedNode) {
          pickInfo.pickedMesh.addBehavior(dragBehavior);
        }
    
        camera.detachControl(canvas);
      } else {
        // If the click was not on a mesh, remove any highlighting and disable dragging
        highlightLayer.removeAllMeshes();
    
        if (dragBehavior.attachedNode) {
          dragBehavior.attachedNode.removeBehavior(dragBehavior);
        }
    
        camera.attachControl(canvas, true);
      }
    };
    
    // Register the event handler
    canvas.addEventListener('click', onClick);






   
    // Clean up on unmount
    return () => {
        window.removeEventListener('resize', onResize);
        canvas.removeEventListener('click', onClick); // Remove the click event listener

      engine.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[] );


  useEffect(() => {
    if (objectMaterialRef.current) {
      objectMaterialRef.current.diffuseColor = BABYLON.Color3.FromHexString(objectColor);
    }
  }, [objectColor,objectRef]);

  return <canvas ref={canvasRef} id="renderCanvas"></canvas>;
};

export default Scene;
