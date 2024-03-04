import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "a@a.com" });

  const fetchData = async () => {
    //we can specify fetching function in the context and then pass it to the screens where we want to use it
  };

  useEffect(() => {
    // fetchData()
    // We can also fetch the data in the provider (then ideally set a state here also). Then we can send fetched state across our provider screens consumers
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        // fetchData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
