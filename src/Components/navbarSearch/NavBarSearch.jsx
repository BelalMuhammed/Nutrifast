import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  fetchSearchSuggestions,
  clearSuggestions,
} from "../../Redux/slices/productSlice";
import { FiSearch } from "react-icons/fi";

export default function NavBarSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { suggestions, suggestionsLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      dispatch(fetchSearchSuggestions(searchTerm));
    } else {
      dispatch(clearSuggestions());
    }
  }, [searchTerm, dispatch]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?name=${searchTerm}`);
      dispatch(clearSuggestions());
    }
  };

  // Home page: animated icon that expands to input
  if (location.pathname === "/") {
    return (
      <div
        style={{
          position: "relative",
          width: open ? 240 : 40,
          transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <button
          type="button"
          aria-label="Open search"
          style={{
            background: "none",
            border: "none",
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            fontSize: 24,
            cursor: "pointer",
            zIndex: 2,
            transition: "color 0.3s",
          }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <FiSearch
            style={{
              transition: "transform 0.3s",
              transform: open ? "scale(1.1)" : "scale(1)",
            }}
          />
        </button>
        <form
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            transition: "opacity 0.3s cubic-bezier(.4,0,.2,1)",
            width: open ? 200 : 0,
            marginLeft: 40,
            display: "inline-block",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
            setOpen(false);
          }}
          autoComplete="off"
        >
          <input
            type="text"
            style={{
              width: open ? 160 : 0,
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 9999,
              outline: "none",
              border: "1px solid #ccc",
              background: "transparent",
              color: "inherit",
              fontSize: 14,
              transition:
                "width 0.3s cubic-bezier(.4,0,.2,1), padding 0.3s, opacity 0.3s",
              opacity: open ? 1 : 0,
            }}
            placeholder={open ? "Search products..." : ""}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
              if (e.key === "Enter") handleSearch();
            }}
            aria-label="Search products"
            autoFocus={open}
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                left: 40,
                marginTop: 8,
                width: 200,
                background: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                borderRadius: 16,
                zIndex: 50,
                border: "1px solid #eee",
                padding: 0,
                listStyle: "none",
              }}
            >
              {suggestionsLoading ? (
                <li
                  style={{
                    padding: "8px 16px",
                    color: "#aaa",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <FiSearch style={{ animation: "spin 1s linear infinite" }} />{" "}
                  Loading...
                </li>
              ) : (
                suggestions.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      padding: "8px 16px",
                      fontSize: 16,
                      color: "#333",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Go to ${item.name}`}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      dispatch(clearSuggestions());
                      setOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        navigate(`/product/${item.id}`);
                        dispatch(clearSuggestions());
                        setOpen(false);
                      }
                    }}
                  >
                    <FiSearch style={{ color: "#aaa" }} />
                    {item.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </form>
      </div>
    );
  }
  // Other pages: default search
  return (
    <form
      style={{ position: "relative", width: "100%", maxWidth: 320 }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      autoComplete="off"
    >
      <button
        type="submit"
        style={{
          background: "none",
          border: "none",
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          color: "inherit",
          fontSize: 20,
          cursor: "pointer",
        }}
        aria-label="Search"
      >
        <FiSearch />
      </button>
      <input
        className="search-input"
        type="text"
        style={{
          width: "100%",
          paddingLeft: 32,
          paddingRight: 12,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 9999,
          outline: "none",
          border: "1px solid #eee",
          background: "#fff",
        }}
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        aria-label="Search products"
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            left: 0,
            marginTop: 8,
            width: "100%",
            background: "#fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            borderRadius: 16,
            zIndex: 50,
            border: "1px solid #eee",
            padding: 0,
            listStyle: "none",
          }}
        >
          {suggestionsLoading ? (
            <li
              style={{
                padding: "8px 16px",
                color: "#aaa",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FiSearch style={{ animation: "spin 1s linear infinite" }} />{" "}
              Loading...
            </li>
          ) : (
            suggestions.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: "8px 16px",
                  fontSize: 16,
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
                tabIndex={0}
                role="button"
                aria-label={`Go to ${item.name}`}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  dispatch(clearSuggestions());
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/product/${item.id}`);
                    dispatch(clearSuggestions());
                  }
                }}
              >
                <FiSearch style={{ color: "#aaa" }} />
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
}
