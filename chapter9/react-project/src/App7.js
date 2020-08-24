import React, { createContext, useContext } from 'react';

const MessageContext = createContext();

const App = () => {
  return (
    <MessageContext.Provider value="Context API in React">
      {/* <App2 /> */}
      {App2Wrapper}
    </MessageContext.Provider>
  );
};

const App2Wrapper = () => {
  const message = useContext(MessageContext); // getter
  return (
    <div>
      <App2 message={message} />
    </div>
  );
};

const App2 = ({ message }) => <div>App2: {message}</div>;

// const App3 = () => {
//   return (
//     <MessageContext.Consumer>
//       {(message) => `Level 3: ${message}`}
//     </MessageContext.Consumer>
//   );
// };

export default App;
