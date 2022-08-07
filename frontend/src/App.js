import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
// import { FiSettings } from 'react-icons/fi'
// import { Footer, ThemeSettings } from './components';

// import {  Area, Line, Blog, Pie } from './pages'
import { Navbar , Sidebar } from './components';
import { Dashboard, Kanban, Editor } from './pages'
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify'

const App = () => {
    const {activeMenu, ThemeSettings, setCurrentColor, themeSettings} = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        if (currentThemeColor) {
          setCurrentColor(currentThemeColor);
        }
      }, [setCurrentColor]);
  return (
    <>
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                    <TooltipComponent content="Settings" position="Top">
                        {/* <button type="button" className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" onClick={() => setThemeSettings(true)} style={{ background: 'rgb(185, 97, 97)', borderRadius: '50%'}}>

                            <FiSettings />
                        </button> */}
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}
                <div className={activeMenu ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '}>
                    <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                        <Navbar />
                    </div>
                
                <div className='container'>
                    {themeSettings && (<ThemeSettings />)}
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />}/>
                        {/* Dashboard */}
                        <Route path="/" element={<Dashboard />}/>
                        {/* Apps */}
                        <Route path="/statistic" element={<Editor />}/>
                        <Route path="/scheduler" element={<Kanban />}/>
                        {/* <Route path="/calendar" element={<Calendar />}/> */}
                    </Routes>
                </div>
                </div>
            </div>
        </BrowserRouter>
        <ToastContainer/>
    </>
  )
}

export default App