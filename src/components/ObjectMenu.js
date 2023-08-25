import React, {useState} from 'react';
import * as BABYLON from 'babylonjs';


const ObjectMenu = ({sceneRef, objects, onObjectSelect,handleAddObject,objectColor}) => {
  const [selectedObjectType, setSelectedObjectType] = useState('');

  const addNewObject = () => {
    const scene = sceneRef.current;
    let mesh;

    switch (selectedObjectType) {
      case 'cube':
        mesh = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
        break;
      case 'sphere':
        mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        break;
      case 'cylinder':
        mesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {}, scene);
        break;
      default:
        // Add more cases as needed
    }

    if (mesh) {
      mesh.name = selectedObjectType + " " + objects.length; // Give it a name
      mesh.position = new BABYLON.Vector3(Math.random() * 5, 1, Math.random() * 5);
      const pointerDragBehavior = new BABYLON.PointerDragBehavior();
      mesh.addBehavior(pointerDragBehavior);
      pointerDragBehavior.dragPlaneNormal = new BABYLON.Vector3(0, 1, 0);
      mesh.material = new BABYLON.StandardMaterial("material", scene); // Create material
      mesh.material.diffuseColor = BABYLON.Color3.FromHexString(objectColor); // Set initial color

            // Call the handleAddObject function from the parent component
            handleAddObject(mesh);


    }
  };

  return (
    <div>
      <select value={selectedObjectType} onChange={(e) => setSelectedObjectType(e.target.value)}>
        <option value="cube">Cube</option>
        <option value="sphere">Sphere</option>
        <option value="cylinder">Cylinder</option>
      </select>
      <button onClick={addNewObject}>Add Object</button>

      <div>
        {objects.map((object, index) => (
          <button key={index} onClick={() => onObjectSelect(object)}>
            {object.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ObjectMenu;

