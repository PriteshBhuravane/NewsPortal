import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (post) => {
    console.log("Adding favorite:", post.title);
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, post];
      console.log("New favorites:", newFavorites);
      return newFavorites;
    });
  };

  const removeFavorite = (postId) => {
    console.log("Removing favorite:", postId);
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(post => post.title !== postId);
      console.log("New favorites after removal:", newFavorites);
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);