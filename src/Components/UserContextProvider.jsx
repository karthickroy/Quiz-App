import React, { useState } from "react";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <App />
    </UserContext.Provider>
  );
}

export default App;
