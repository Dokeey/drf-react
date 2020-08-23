import React, { useState, createContext, useContext } from 'react';

const CounterContext = createContext();

const App = () => {
  const [value, setValue] = useState(0);
  const onIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <div>
      <button onClick={onIncrement}>App : {value}</button>
      <CounterContext.Provider value={{ value, onIncrement }}>
        <Level3 />
      </CounterContext.Provider>
    </div>
  );
};

const Level3 = () => {
  const { value, onIncrement } = useContext(CounterContext);
  return <div onClick={onIncrement}>Level3 : {value}</div>;
};

export default App;
