import { io } from 'socket.io-client';
import { useEffect } from 'react';



function App() {

  useEffect(() => {
    let socket = io('ws://localhost:3003');
    socket.emit('test','ali')
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
