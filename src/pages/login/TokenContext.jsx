// TokenContext.js
import { createContext, useContext } from 'react';

const TokenContext = createContext(null);

export const useToken = () => {
  return useContext(TokenContext);
};

export default TokenContext;
