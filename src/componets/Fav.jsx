import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useFavorites } from '../context/FavoritesContext'
import { motion } from "framer-motion"

export default function Fav() {
  const { favorites, removeFavorite } = useFavorites();
  useEffect(() => {
    console.log("Favorites in Fav component on mount:", favorites);
  }, []);

  console.log("Favorites in Fav component:", favorites);

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <motion.h1 
          className="text-white mt-8 mb-6 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Favorite Articles
        </motion.h1>
        <div className="p-5 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.length === 0 ? (
            <motion.div 
              className="col-span-full text-center text-white text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No favorites saved yet. Start saving some articles!
            </motion.div>
          ) : (
            favorites.map((post, index) => (
              <motion.div
                key={index}
                className="max-w-sm bg-black border border-gray-200 rounded-lg flex flex-col relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  className="rounded-t-lg w-full h-48 object-cover" 
                  src={post.urlToImage || "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"} 
                  alt={post.title} 
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{post.title}</h5>
                  <p className="mb-3 font-normal text-gray-400 overflow-ellipsis">{post.content || "No content available"}</p>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-500 transition-colors duration-300"
                  >
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </a>
                </div>
                <button 
                  onClick={() => removeFavorite(post.title)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-300"
                >
                  Remove
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  )
}