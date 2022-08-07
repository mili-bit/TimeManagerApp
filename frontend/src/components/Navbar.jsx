import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FaSignInAlt, FaUser, FaSignOutAlt  } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider'
import { useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

import {Link, useNavigate } from 'react-router-dom'


function NavButton({ title, customFunc, icon, color, dotColor }) {

  return (

    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
        {icon}
      </button>
    </TooltipComponent>
  );
}

const Navbar = () => {
  const  { setActiveMenu,  screenSize, setScreenSize} = useStateContext();

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <header className='header'>
      <NavButton title="Menu" customFunc={()=> setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={"black"} icon={<AiOutlineMenu  />} />
      <div className='logo'>
        <Link to='/'><b>Time</b><i>Manager</i></Link>
      </div>
      <ul>
        {user ? (<>
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        
        </>) : (<>
        <li className="ml-3 relative">
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li className="ml-3 relative">
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>
        </>)}
      </ul>
      

    </header>
  )
}

export default Navbar