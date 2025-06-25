import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './componets/SignUp'
import Main from './componets/Main'
import Fav from './componets/Fav'
import { FavoritesProvider } from './context/FavoritesContext'
import './App.css'

function App() {
  return (
    <FavoritesProvider>
      <div className='bg-slate-900 min-w-fit'>
        <Routes>
          <Route path='/signin' element={<SignUp />} />
          <Route path='/' element={<Main />} />
          <Route path='/fav' element={<Fav />} />
        </Routes>
      </div>
    </FavoritesProvider>
  )
}

export default App