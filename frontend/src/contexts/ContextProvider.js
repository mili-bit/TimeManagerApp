import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState ={
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('rgb(185, 97, 97)');
    const [themeSettings, setThemeSettings] = useState(false);
    

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
      };

    const handleClick = (clicked) => {
        setIsClicked({...initialState,[clicked]:true})
    }

    return(
        
    // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider
        value={{
            currentColor,
            activeMenu, 
            setActiveMenu, 
            isClicked, 
            setIsClicked,
            handleClick, 
            screenSize, 
            setScreenSize,
            setColor,
            themeSettings, setThemeSettings
            }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);