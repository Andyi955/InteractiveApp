import { useState, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const useObjectControls = (cameraRef,originalCameraTargetRef,sceneObjects) => {
  const [objectColor, setObjectColor] = useState('#ffffff');
  const [wireframe, setWireframe] = useState(false);
  // ... other state ...

  const objectRef = useRef(null);
  const objectMaterialRef = useRef(null);

  const handleColorChange = (object, colorHex) => {
    if (object && object.material) {
      object.material.diffuseColor = BABYLON.Color3.FromHexString(colorHex);
    }
  };
  
  
 

  const handleSizeIncrease = () => {
    const object = objectRef.current;
    if (object) {
      object.scaling.addInPlace(new BABYLON.Vector3(0.1, 0.1, 0.1));
    }
  };
  const handleSizeDecrease = () => {
    const object = objectRef.current;
    if (object) {
      object.scaling.subtractInPlace(new BABYLON.Vector3(0.1, 0.1, 0.1));
    }
  };

  const handleReset = () => {
    const object = objectRef.current;
    const camera = cameraRef.current;
    if (object) {
      object.scaling = new BABYLON.Vector3(1, 1, 1); // Reset the object size
      object.rotation = new BABYLON.Vector3(0, 0, 0); // Reset the object rotation
      object.position = new BABYLON.Vector3(0, 0, 0); // Reset the object position to the center
      object.computeWorldMatrix(true); // Update the object's world matrix to apply the changes immediately

    }
    if (cameraRef.current && originalCameraTargetRef.current) {
      cameraRef.current.target.copyFrom(originalCameraTargetRef.current);
    }
    if (camera) {
      camera.alpha = -Math.PI / 2;
      camera.beta = Math.PI / 2.5;
      camera.radius = 10;
    }
    // Reset the object color to white
    setObjectColor('#ffffff');
    if (objectMaterialRef.current) {
      objectMaterialRef.current.diffuseColor = BABYLON.Color3.FromHexString('#ffffff');
    }
  };
  const handleWireframeToggle = () => {
    const object = objectRef.current;
    if (object && object.material) {
      setWireframe(!wireframe);
      object.material.wireframe = !wireframe;
    }
  };
  

  // ... other handlers ...

  return {
    objectColor,
    objectRef,
    objectMaterialRef,
    handleColorChange,
    handleSizeIncrease,
    handleSizeDecrease,
    handleReset,
    handleWireframeToggle,
    // ... other handlers ...
  };
};

export default useObjectControls;
