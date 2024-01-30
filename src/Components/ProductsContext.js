import React, { createContext, useContext } from 'react';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children, products }) => {
  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
};
