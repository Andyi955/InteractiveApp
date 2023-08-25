const SceneMenu = ({ objects, onObjectSelect }) => {
    return (
      <div>
        {objects.map((object, index) => (
          <button key={index} onClick={() => onObjectSelect(object)}>
            {object.name}
          </button>
        ))}
      </div>
    );
  };
  