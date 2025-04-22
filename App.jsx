import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import BookSearch from './components/BookSearch'
import FavoriteBooks from './components/favorites'

function App() {
  const [isLightMode, setIsLightMode] =useState(true);
  
  const handleLightMode =() =>{
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("dark-mode")
  }

  return (
    <div>
    <button onClick={handleLightMode}>
      {isLightMode ? 'Light Mode' : 'Dark Mode'}
    </button>
   <BookSearch />
   <FavoriteBooks />
  </div>
  );
}

export default App
