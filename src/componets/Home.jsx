import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import noResultsImage from "../assets/not_found.png";
import savedPostIcon from "../assets/saved_post_icon_white.png";
import unsavedPostIcon from "../assets/saved_post_icon_black.png";
import { useFavorites } from "../context/FavoritesContext";

export default function Home(props) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleSavePost = (post) => {
    if (favorites.some((fav) => fav.title === post.title)) {
      removeFavorite(post.title);
    } else {
      addFavorite(post);
    }
    console.log("Current favorites after action:", favorites);
  };

  const getNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${props.menu || "All"}&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setNews(json.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [props.menu]);

  // Filter news based on search term
  const filteredNews = news.filter((data) =>
    data.title.toLowerCase().includes(props.search.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredNews.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const latestNewsText = "Latest News".split("");

  return (
    <>
      <div className="min-h-screen">
        <motion.h1 className="text-white mt-3 text-center text-3xl font-bold ">
          {latestNewsText.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <div className="p-5 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-white">
              Loading...
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="col-span-full flex justify-center">
              <img
                src={noResultsImage}
                alt="No results found"
                className="max-w-full h-auto"
              />
            </div>
          ) : (
            currentCards.map((data, index) => (
              <motion.div
                key={index}
                className="max-w-sm bg-black border border-gray-200 rounded-lg flex flex-col relative"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                }}
                transition={{ duration: 0.15 }}
              >
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={
                      data.urlToImage ||
                      "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
                    }
                    alt={data.title || "Image"}
                  />
                </a>
                <div className="p-5 flex flex-col flex-grow">
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.h5
                      key={`${currentPage}-${index}`}
                      className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                      }}
                    >
                      {data.title
                        ? data.title.split("").map((letter, letterIndex) => (
                            <motion.span
                              key={letterIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.2,
                                delay: letterIndex * 0.04,
                              }}
                            >
                              {letter}
                            </motion.span>
                          ))
                        : "Hello Everyone!!!"}
                    </motion.h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-400 dark:text-gray-400 overflow-ellipsis">
                    {data.content ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."}
                  </p>
                  <motion.a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    whileHover={{
                      x: [0, 20, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </motion.a>
                </div>
                <div className="absolute top-2 right-2">
                  <img
                    src={
                      favorites.some((fav) => fav.title === data.title)
                        ? savedPostIcon
                        : unsavedPostIcon
                    }
                    alt="Save Post"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      handleSavePost(data);
                      console.log("Saving post:", data.title);
                    }}
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        <nav
          aria-label="Page navigation example"
          className="mt-4 flex justify-center"
        >
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-white bg-slate-900 border border-e-0 border-gray-400 rounded-s-lg hover:bg-slate-950 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {Array.from(
              { length: Math.ceil(filteredNews.length / cardsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-white bg-slate-700 border border-white hover:bg-slate-800 hover:text-white hover:text-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === i + 1
                        ? "z-10 bg-gray-900 text-white text-2xl shadow-lg"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredNews.length / cardsPerPage)
                }
                className={`flex items-center justify-center px-4 h-10 leading-tight text-white bg-slate-900 border border-white border-solid rounded-e-lg hover:bg-slate-950 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === Math.ceil(filteredNews.length / cardsPerPage)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
