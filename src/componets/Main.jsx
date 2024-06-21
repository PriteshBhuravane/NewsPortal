import React, { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Footer from './Footer'

export default function Main() {

    const [menu,setMenu] = useState("")
    const [search,setSearch] = useState("")
    

  return (
    <>
    <Navbar setMenu={setMenu} setSearch={setSearch}/>
    
    <Home  menu={menu} search={search}/>
    <Footer setMenu={setMenu}/>
    </>
  )
}
