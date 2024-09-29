import React, { createContext, useState } from 'react';
import { initialUser } from './datatypes';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  return (
    <GlobalContext.Provider value={{
      users, setUsers
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    return (
        <UserContext.Provider value={{ 
            currentUser, setCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const [currentCalendar, setCurrentCalendar] = useState([]);

    return (
        <CalendarContext.Provider value={{ 
            currentCalendar, setCurrentCalendar
        }}>
            {children}
        </CalendarContext.Provider>
    );
}