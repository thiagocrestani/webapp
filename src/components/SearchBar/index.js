import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      data-testid="search-form"
    >
      <input
        type="number"
        placeholder="Search by year..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
