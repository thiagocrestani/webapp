/* eslint-disable testing-library/no-unnecessary-act */

import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import Dashboard from "../Dashboard";
import * as movieApi from "../../api/movieApi";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("Dashboard component", () => {
  let axiosMockInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    axiosMockInstance = new axiosMock(axios);
  });

  afterEach(() => {
    axiosMockInstance.restore();
  });

  it("displays initial data correctly", async () => {
    const getYearsWithMultipleWinnersMock = jest.spyOn(
      movieApi,
      "getYearsWithMultipleWinners"
    );
    getYearsWithMultipleWinnersMock.mockResolvedValue([
      { year: 2021, winnerCount: 3 },
    ]);

    const getMaxMinWinIntervalForProducersMock = jest.spyOn(
      movieApi,
      "getMaxMinWinIntervalForProducers"
    );
    getMaxMinWinIntervalForProducersMock.mockResolvedValue({
      max: [{ producer: "Producer A", interval: 4 }],
      min: [{ producer: "Producer B", interval: 1 }],
    });

    const getStudiosWithWinCountMock = jest.spyOn(
      movieApi,
      "getStudiosWithWinCount"
    );
    getStudiosWithWinCountMock.mockResolvedValue([
      { name: "Studio X", winCount: 5 },
      { name: "Studio Y", winCount: 4 },
      { name: "Studio Z", winCount: 3 },
    ]);

    render(<Dashboard />);

    await waitFor(() => {
      expect(getYearsWithMultipleWinnersMock).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText("Years with Multiple Winners")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Producers with Longest and Shortest Interval Between Wins"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Top 3 Studios with Winners")).toBeInTheDocument();
    expect(screen.getByText("List Movie Winners by Year")).toBeInTheDocument();

    expect(getMaxMinWinIntervalForProducersMock).toHaveBeenCalledTimes(1);
    expect(getStudiosWithWinCountMock).toHaveBeenCalledTimes(1);

    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Producer A")).toBeInTheDocument();
    expect(screen.getByText("Producer B")).toBeInTheDocument();
    expect(screen.getByText("Studio X")).toBeInTheDocument();
    expect(screen.getByText("Studio Y")).toBeInTheDocument();
    expect(screen.getByText("Studio Z")).toBeInTheDocument();
  });

  it("filters movies by year", async () => {
    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?winner=true&year=2022"
      )
      .reply(200, [
        { id: 1, year: 2022, title: "Movie A" },
        { id: 2, year: 2022, title: "Movie B" },
      ]);

    await act(async () => render(<Dashboard />));

    const formElement = screen.getByTestId("search-form");

    const searchBar = screen.getByPlaceholderText("Search by year...");
    fireEvent.change(searchBar, { target: { value: "2022" } });

    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(screen.getByText("Movie A")).toBeInTheDocument();
    });

    expect(screen.getByText("Movie B")).toBeInTheDocument();
  });
});
