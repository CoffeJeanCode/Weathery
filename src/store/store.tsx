import {
  h,
  createContext,
  FunctionalComponent,
  ComponentChildren,
} from 'preact';

import { useContext, useReducer } from 'preact/hooks';

const intialState: GlobalState = {
  date: new Date(),
  location: 'Co Bogota',
  weather: '228',
  temp: '0 °C',
  query: 'bogota',
};

const reducer = (state: GlobalState, action: ActionReducer) => {
  switch (action.type) {
    case 'SEARCH_WEATHER':
      return { ...state, query: action.payload.toLowerCase() };
    case 'GET_WEATHER':
      const { location, weather, temp } = action.payload;
      return {
        ...state,
        temp,
        location,
        weather,
      };
    default:
      return state;
  }
};

const GlobalStore = createContext<any>(intialState);

export const useGlobalStore = () => useContext(GlobalStore);

interface GlobalStoreProviderProp {
  children: ComponentChildren;
}

const GlobalStoreProvider: FunctionalComponent<GlobalStoreProviderProp> = ({
  children,
}) => {
  const store = useReducer(reducer, intialState);

  return <GlobalStore.Provider value={store}>{children}</GlobalStore.Provider>;
};

export default GlobalStoreProvider;
