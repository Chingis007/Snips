import { createContext, useContext } from "react";

export interface TCardContext {
  radius?: number;
}

export const CardContext = createContext<TCardContext>({
  radius: undefined,
});

export const useCardContext = () => useContext(CardContext);
