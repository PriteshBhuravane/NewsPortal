import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './componets/SignUp'
import Navbar from './componets/Navbar'
import { Route, Routes } from 'react-router-dom'
import Main from './componets/Main'
import Fav from './componets/Fav'
import { FavoritesProvider } from './context/FavoritesContext'



function App() {
  const [count, setCount] = useState(0)
  

  return (
    
    <FavoritesProvider>
    <div className='bg-slate-900 min-w-fit'>
      <Routes>
        <Route path='/signin' element={<SignUp/>}  />
        <Route path='/' element={<Main/>}  />
        <Route path='/fav' element={<Fav/>}/>
      </Routes>
    </div>
  </FavoritesProvider>
  )
}

export default App
