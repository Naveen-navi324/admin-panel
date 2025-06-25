import { 
  FaHome, 
  FaUser, 
  FaCog, 
  FaChartBar, 
  FaUsers, 
  FaShoppingCart, 
  FaFileAlt, 
  FaBell, 
  FaQuestionCircle,
  FaDatabase,
  FaChartLine,
  FaUserShield,
  FaTools,
  FaInbox,
  FaCalendar
} from 'react-icons/fa';

const menuConfig = {
  admin: [
    {
      title: 'Dashboard',
      icon: FaHome,
      path: '/dashboard'
    },
    {
      title: 'Analytics',
      icon: FaChart,
      submenu: [
        {
          title: 'Reports',
          icon: FaChartLine,
          path: '/analytics/reports'
        },
        {
          title: 'Statistics',
          icon: FaDatabase,
          path: '/analytics/statistics'
        }
      ]
    },
    {
      title: 'User Management',
      icon: FaUsers,
      submenu: [
        {
          title: 'All Users',
          icon: FaUsers,
          path: '/users'
        },
        {
          title: 'Roles & Permissions',
          icon: FaUserShield,
          path: '/users/roles'
        }
      ]
    },
    {
      title: 'Settings',
      icon: FaCog,
      submenu: [
        {
          title: 'General',
          icon: FaTools,
          path: '/settings/general'
        },
        {
          title: 'Security',
          icon: FaUserShield,
          path: '/settings/security'
        }
      ]
    }
  ],
  user: [
    {
      title: 'Dashboard',
      icon: FaHome,
      path: '/dashboard'
    },
    {
      title: 'Profile',
      icon: FaUser,
      path: '/profile'
    },
    {
      title: 'Orders',
      icon: FaShoppingCart,
      path: '/orders'
    },
    {
      title: 'Documents',
      icon: FaFileAlt,
      path: '/documents'
    }
  ],
  common: [
    {
      title: 'Messages',
      icon: FaInbox,
      path: '/messages'
    },
    {
      title: 'Calendar',
      icon: FaCalendar,
      path: '/calendar'
    },
    {
      title: 'Notifications',
      icon: FaBell,
      path: '/notifications'
    },
    {
      title: 'Help & Support',
      icon: FaQuestionCircle,
      path: '/help'
    }
  ]
};

export default menuConfig;