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
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [error, setError] = useState("");

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleSavePost = (post) => {
    if (favorites.some((fav) => fav.title === post.title)) {
      removeFavorite(post.title);
    } else {
      addFavorite(post);
    }
  };

  // Fetch news with error handling and pagination
  const getNews = async () => {
    setLoading(true);
    setError("");
    let allResults = [];
    let nextPage = null;
    let pageCount = 0;
    const maxPages = 3;

    try {
      do {
        let url = `https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEWSDATA_API_KEY}&q=${props.menu || "All"}&language=en`;
        if (nextPage) url += `&page=${nextPage}`;
        const response = await fetch(url);
        const json = await response.json();
        if (Array.isArray(json.results)) {
          allResults = allResults.concat(json.results);
          nextPage = json.nextPage;
          pageCount++;
        } else {
          setError(
            json.status === "error"
              ? `API Error: ${json.message || "Too many requests. Please try again later."}`
              : "Unexpected API response."
          );
          break;
        }
      } while (nextPage && pageCount < maxPages);
      setNews(allResults);
      setError("");
    } catch (error) {
      setNews([]);
      setError("Error fetching news: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [props.menu]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cardsPerPage, props.menu, props.search]);

  const filteredNews = Array.isArray(news)
    ? news.filter((data) =>
        data.title?.toLowerCase().includes(props.search.toLowerCase())
      )
    : [];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredNews.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / cardsPerPage));
  const latestNewsText = "Latest News".split("");
  const truncate = (str, n) =>
    str && str.length > n ? str.slice(0, n) + "..." : str;

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

      {error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}

      <div className="flex justify-end items-center px-10 pt-4">
        <label htmlFor="cardsPerPage" className="text-white mr-2">
          Cards per page:
        </label>
        <select
          id="cardsPerPage"
          value={cardsPerPage}
          onChange={(e) => setCardsPerPage(Number(e.target.value))}
          className="rounded px-2 py-1 bg-slate-800 text-white border border-gray-400"
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

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
              className="max-w-sm h-[480px] bg-black border border-gray-200 rounded-lg flex flex-col relative"
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
                    className="mb-2 text-2xl font-bold tracking-tight text-white line-clamp-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    title={data.title}
                  >
                    {data.title
                      ? truncate(data.title, 80)
                      : "Untitled"}
                  </motion.h5>
                </a>
                <p className="mb-3 font-normal text-gray-400 overflow-hidden line-clamp-3">
                  {data.description
                    ? truncate(data.description, 120)
                    : "No description available for this article."}
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
        className="mt-4 flex flex-col items-center justify-center"
      >
        <span className="text-white mb-2">
          Page {currentPage} of {totalPages}
        </span>
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-3 h-10 text-white bg-slate-900 border border-gray-400 rounded-s-lg ${
                currentPage === 1 ? "cursor-not-allowed" : "hover:bg-slate-950"
              }`}
              title="First"
            >
              &#171;
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 h-10 text-white bg-slate-900 border border-gray-400 ${
                currentPage === 1 ? "cursor-not-allowed" : "hover:bg-slate-950"
              }`}
              title="Previous"
            >
              &#8249;
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
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
          ))}

          <li>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 h-10 text-white bg-slate-900 border border-white ${
                currentPage === totalPages
                  ? "cursor-not-allowed"
                  : "hover:bg-slate-950"
              }`}
              title="Next"
            >
              &#8250;
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 h-10 text-white bg-slate-900 border border-white rounded-e-lg ${
                currentPage === totalPages
                  ? "cursor-not-allowed"
                  : "hover:bg-slate-950"
              }`}
              title="Last"
            >
              &#187;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}