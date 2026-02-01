import React, { createContext, useState, useCallback } from 'react';

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const updateMenuItems = useCallback((items) => {
    setMenu(items);
  }, []);

  const value = {
    menu,
    setMenu,
    searchQuery,
    setSearchQuery,
    updateMenuItems
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}
