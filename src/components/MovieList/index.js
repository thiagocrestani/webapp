import React, { useEffect, useState } from "react";
import "./styles.css";
import { getAllMovies } from "../../api/movieApi";
import Table from "../Table";

function MovieList() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [year, setYear] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await getAllMovies(currentPage, 15, year, winner);
        setTotalPages(response.totalPages);
        setTableData(
          response.content.map((movie) => [
            movie.id,
            movie.year,
            movie.title,
            movie.winner ? "Yes" : "No",
          ])
        );
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    fetchMovies();
  }, [currentPage, year, winner]);

  const tableHeaders = [
    { name: "Id" },
    {
      name: "Year",
      filterable: true,
      type: "text",
      value: year,
      setValue: setYear,
    },
    { name: "Title" },
    {
      name: "Winner",
      filterable: true,
      type: "custom",
      input: (
        <select
          value={winner}
          onChange={(e) => {
            setCurrentPage(1);
            setWinner(e.target.value);
          }}
        >
          <option value="">Yes/No</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      ),
    },
  ];
  return (
    <div className="movie-list">
      <div className="table-container">
        <h2>List Movies</h2>
        <Table
          headers={tableHeaders}
          data={tableData}
          showPagination={{
            currentPage,
            setCurrentPage,
            totalPages: totalPages,
          }}
        />
      </div>
    </div>
  );
}

export default MovieList;
