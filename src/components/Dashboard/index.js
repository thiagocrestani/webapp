import React, { useEffect, useState } from "react";
import {
  getYearsWithMultipleWinners,
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
} from "../../api/movieApi";
import Table from "../Table";
import "./styles.css";
import SearchBar from "../SearchBar";

const Dashboard = () => {
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] = useState([]);
  const [maxMinWinIntervalForProducers, setMaxMinWinIntervalForProducers] =
    useState({});
  const [topStudios, setTopStudios] = useState([]);
  const [winnersByYear, setWinnersByYear] = useState([]);

  useEffect(() => {
    async function fetchYearsWithMultipleWinners() {
      try {
        const data = await getYearsWithMultipleWinners();
        setYearsWithMultipleWinners(data);
      } catch (error) {
        console.error("Erro ao buscar anos com múltiplos vencedores:", error);
      }
    }

    async function fetchMaxMinWinIntervalForProducers() {
      try {
        const data = await getMaxMinWinIntervalForProducers();
        setMaxMinWinIntervalForProducers(data);
      } catch (error) {
        console.error(
          "Erro ao buscar produtores com maior e menor intervalo entre vitórias:",
          error
        );
      }
    }

    async function fetchTopStudios() {
      try {
        const data = await getStudiosWithWinCount();
        const top3Studios = data.slice(0, 3);
        setTopStudios(top3Studios);
      } catch (error) {
        console.error(
          "Erro ao buscar os três estúdios com mais vencedores:",
          error
        );
      }
    }

    fetchYearsWithMultipleWinners();
    fetchMaxMinWinIntervalForProducers();
    fetchTopStudios();
  }, []);

  async function fetchWinnersForYear(year) {
    try {
      const data = await getWinnersByYear(year);
      setWinnersByYear(data);
    } catch (error) {
      console.error(`Erro ao buscar vencedores para o ano ${year}:`, error);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="column">
        <div className="table-container">
          <h2>Years with Multiple Winners</h2>
          <Table
            headers={[{ name: "Year" }, { name: "Win Count" }]}
            data={yearsWithMultipleWinners.map((yearData) => [
              yearData.year,
              yearData.winnerCount,
            ])}
          />
        </div>
        <div className="table-container">
          <h2>Producers with Longest and Shortest Interval Between Wins</h2>
          <h2>Maximun</h2>
          <Table
            headers={[
              { name: "Producer" },
              { name: "Interval" },
              { name: "Previous Year" },
              { name: "Following Year" },
            ]}
            data={maxMinWinIntervalForProducers?.max}
          />
          <h2>Minimun</h2>
          <Table
            headers={[
              { name: "Producer" },
              { name: "Interval" },
              { name: "Previous Year" },
              { name: "Following Year" },
            ]}
            data={maxMinWinIntervalForProducers?.min}
          />
        </div>
      </div>
      <div className="column">
        <div className="table-container">
          <h2>Top 3 Studios with Winners</h2>
          <Table
            headers={[{ name: "Name" }, { name: "Win Count" }]}
            data={topStudios.map((studioData) => [
              studioData.name,
              studioData.winCount,
            ])}
          />
        </div>
        <div className="table-container">
          <h2>List Movie Winners by Year</h2>
          <div className="search-section">
            <SearchBar onSearch={fetchWinnersForYear} />
          </div>
          <Table
            headers={[{ name: "Id" }, { name: "Year" }, { name: "Title" }]}
            data={winnersByYear.map((movieData) => [
              movieData.id,
              movieData.year,
              movieData.title,
            ])}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
