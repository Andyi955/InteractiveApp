import React from 'react';

const ControlPanel = ({
  handleReset,
  objectColor,
  handleColorChange,
  handleSizeIncrease,
  handleSizeDecrease,
  handleWireframeToggle,
  bounceDuration,
  setBounceDuration,
  bounceHeight,
  setBounceHeight,
  loopCount,
  setLoopCount,
  bounceAnimation,
  selectedObject
}) => {
  return (
    <div className="vertical-menu">
      <button onClick={handleReset}>Reset</button>
      <input
  type="color"
  value={objectColor}
  onChange={(e) => handleColorChange(e.target.value)}
/>
          <button onClick={handleSizeIncrease}>Increase Size</button>
          <button onClick={handleSizeDecrease}>Decrease Size</button>
          <button onClick={handleWireframeToggle}>Toggle Wireframe</button>
          <div className="bounce-controls">
  <label>
    Bounce Duration (ms):
    <input type="number" value={bounceDuration} onChange={e => setBounceDuration(e.target.value)} />
  </label>
  <label>
    Bounce Height:
    <input type="number" value={bounceHeight} onChange={e => setBounceHeight(e.target.value)} />
  </label>
  <label>
  Loop Count:
  <input type="number" value={loopCount} onChange={e => setLoopCount(e.target.value)} />
</label>
<button onClick={() => bounceAnimation(Number(bounceDuration), parseFloat(bounceHeight), Number(loopCount))}>Bounce</button>
</div>
    </div>
  );
};

export default ControlPanel;
