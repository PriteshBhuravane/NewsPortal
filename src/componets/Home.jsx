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
        `https://newsdata.io/api/1/latest?apikey=${
          import.meta.env.VITE_NEWSDATA_API_KEY
        }&q=${props.menu || "All"}&language=en`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setNews(json.results);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [props.menu]);

  const filteredNews = news.filter((data) =>
    data.title?.toLowerCase().includes(props.search.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredNews.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const latestNewsText = "Latest News".split("");

  return (
    <div className="min-h-screen">
      <motion.h1 className="text-white mt-3 text-center text-3xl font-bold ">
        {latestNewsText.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <div className="p-5 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-white">Loading...</div>
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
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={
                    data.image_url ||
                    "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
                  }
                  alt={data.title || "Image"}
                />
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.h5
                    key={`${currentPage}-${index}`}
                    className="mb-2 text-2xl font-bold tracking-tight text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
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
                      : "Untitled"}
                  </motion.h5>
                </a>
                <p className="mb-3 font-normal text-gray-400 overflow-ellipsis">
                  {data.description ||
                    "No description available for this article."}
                </p>
                <motion.a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-500"
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
                  onClick={() => handleSavePost(data)}
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
              className={`px-4 h-10 ms-0 leading-tight text-white bg-slate-900 border border-gray-400 rounded-s-lg ${
                currentPage === 1 ? "cursor-not-allowed" : "hover:bg-slate-950"
              }`}
            >
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
                  className={`px-4 h-10 text-white bg-slate-700 border border-white hover:bg-slate-800 ${
                    currentPage === i + 1 ? "text-2xl bg-gray-900" : ""
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
              className={`px-4 h-10 text-white bg-slate-900 border border-white rounded-e-lg ${
                currentPage === Math.ceil(filteredNews.length / cardsPerPage)
                  ? "cursor-not-allowed"
                  : "hover:bg-slate-950"
              }`}
            >
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
  );
}
