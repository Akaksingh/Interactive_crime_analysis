// import React, { useState } from 'react';
// import { FaBars, FaTachometerAlt, FaFileAlt, FaMapMarkedAlt, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';

// const menuItems = [
//   { icon: <FaTachometerAlt />, label: 'Dashboard', to: '/' },
//   { icon: <FaFileAlt />, label: 'Reports', to: '/reports' },
//   { icon: <FaMapMarkedAlt />, label: 'Crime Map', to: '/map' },
//   { icon: <FaBell />, label: 'Alerts', to: '/alerts' },
//   { icon: <FaCog />, label: 'Settings', to: '/settings' },
// ];

// function Sidebar() {
//   const [open, setOpen] = useState(window.innerWidth > 900);
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   React.useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 900) setOpen(true);
//       else setOpen(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = window.innerWidth <= 900;

//   const handleLogout = () => {
//     // Simulate logout by redirecting to login
//     navigate('/login');
//   };

//   return (
//     <>
//       <div className="hamburger" onClick={() => setOpen(true)}>
//         <FaBars size={28} />
//       </div>
//       <div className={`sidebar${open ? ' open' : ' collapsed'}`}> 
//         <div className="logo">CAP</div>
//           <div className="logo1">Crime Analysis platform</div>
//         <div className="menu">
//           {menuItems.map((item) => (
//             <NavLink
//               to={item.to}
//               key={item.label}
//               className={({ isActive }) =>
//                 'menu-item' + (isActive ? ' active' : '')
//               }
//               onClick={() => isMobile && setOpen(false)}
//               end={item.to === '/'}
//             >
//               <span className="icon">{item.icon}</span>
//               {open && <span className="label">{item.label}</span>}
//             </NavLink>
//           ))}
//         </div>
//         <div className="user-info">
//           <img src="/profile_pic.jpg" alt="user" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginBottom: 6 }} />
//           {open && <span>Anonymous 123</span>}
//         </div>
//         <div className="logout-section">
//           <button className="logout-btn" onClick={handleLogout}>
//             <FaSignOutAlt style={{ marginRight: open ? 8 : 0 }} />
//             {open && 'Logout'}
//           </button>
//         </div>
//       </div>
//       {isMobile && open && <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>}
//     </>
//   );
// }

// export default Sidebar; 
import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaFileAlt, FaMapMarkedAlt, FaBell, FaCog, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: <FaTachometerAlt />, label: 'Dashboard', to: '/' },
  { icon: <FaFileAlt />, label: 'Reports', to: '/reports' },
  { icon: <FaMapMarkedAlt />, label: 'Crime Map', to: '/map' },
  { icon: <FaBell />, label: 'Alerts', to: '/alerts' },
  { icon: <FaCog />, label: 'Settings', to: '/settings' },
];

function Sidebar() {
  const [open, setOpen] = useState(window.innerWidth > 900);
  const location = useLocation();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setOpen(true);
      else setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = window.innerWidth <= 900;

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="hamburger" onClick={() => setOpen(true)}>
        <FaBars size={28} />
      </div>
      <div className={`sidebar${open ? ' open' : ' collapsed'}`}>
        <div className="logo-section">
          <div className="logo">CAP</div>
          {open && <div className="logo1">Crime Analysis platform</div>}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <div className="menu">
          {menuItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.label}
              className={({ isActive }) =>
                'menu-item' + (isActive ? ' active' : '')
              }
              onClick={() => isMobile && setOpen(false)}
              end={item.to === '/'}
            >
              <span className="icon">{item.icon}</span>
              {open && <span className="label">{item.label}</span>}
            </NavLink>
          ))}
        </div>
        <div className="user-info">
          <img src="/profile_pic.jpg" alt="user" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginBottom: 6 }} />
          {open && <span>Anonymous 123</span>}
        </div>
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: open ? 8 : 0 }} />
            {open && 'Logout'}
          </button>
        </div>
      </div>
      {isMobile && open && <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
}

export default Sidebar;