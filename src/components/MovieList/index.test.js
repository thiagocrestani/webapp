/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import MovieList from "../MovieList";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("MovieList component", () => {
  let axiosMockInstance;

  beforeEach(() => {
    axiosMockInstance = new axiosMock(axios);
  });

  afterEach(() => {
    axiosMockInstance.restore();
  });

  it("renders MovieList component", async () => {
    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=0&size=15&year=&winner="
      )
      .reply(200, {
        content: [
          {
            id: 1,
            year: 2023,
            title: "Movie 1",
            winner: true,
          },
          {
            id: 2,
            year: 2023,
            title: "Movie 2",
            winner: false,
          },
        ],
        totalPages: 1,
      });

    await act(async () => render(<MovieList />));

    expect(screen.getByText("List Movies")).toBeInTheDocument();

    expect(screen.getByRole("table")).toBeInTheDocument();

    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("handles pagination correctly", async () => {
    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=0&size=15&year=&winner="
      )
      .reply(200, {
        content: [
          {
            id: 1,
            year: 2023,
            title: "Movie 1",
            winner: true,
          },
          {
            id: 2,
            year: 2023,
            title: "Movie 2",
            winner: false,
          },
        ],
        totalPages: 2,
      });

    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=1&size=15&year=&winner="
      )
      .reply(200, {
        content: [
          {
            id: 3,
            year: 2023,
            title: "Movie 3",
            winner: false,
          },
          {
            id: 4,
            year: 2023,
            title: "Movie 4",
            winner: true,
          },
        ],
        totalPages: 2,
      });

    await act(async () => render(<MovieList />));

    const nextPageButton = screen.getByRole("button", { name: "Next Page" });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText("Movie 3")).toBeInTheDocument();
    });
    expect(screen.getByText("Movie 4")).toBeInTheDocument();
  });

  it("filters movies by year", async () => {
    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=0&size=15&year=&winner="
      )
      .reply(200, {
        content: [
          {
            id: 1,
            year: 2023,
            title: "Movie 1",
            winner: true,
          },
          {
            id: 2,
            year: 2023,
            title: "Movie 2",
            winner: false,
          },
        ],
        totalPages: 1,
      });

    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=0&size=15&year=2022&winner="
      )
      .reply(200, {
        content: [
          {
            id: 5,
            year: 2022,
            title: "Movie 5",
            winner: false,
          },
        ],
        totalPages: 1,
      });

    await act(async () => render(<MovieList />));

    const inputElement = screen.getByPlaceholderText("Filter by Year");

    fireEvent.change(inputElement, { target: { value: "2022" } });

    await waitFor(() => {
      expect(screen.getByText("Movie 5")).toBeInTheDocument();
    });
  });

  it("filters movies by winner status", async () => {
    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=0&size=15&year=&winner="
      )
      .reply(200, {
        content: [
          {
            id: 1,
            year: 2023,
            title: "Movie 1",
            winner: true,
          },
          {
            id: 2,
            year: 2023,
            title: "Movie 2",
            winner: false,
          },
        ],
        totalPages: 2,
      });

    axiosMockInstance
      .onGet(
        "https://tools.texoit.com/backend-java/api/movies?page=0&size=15&year=&winner=true"
      )
      .reply(200, {
        content: [
          {
            id: 6,
            year: 2023,
            title: "Movie 6",
            winner: true,
          },
        ],
        totalPages: 1,
      });

    await act(async () => render(<MovieList />));


    const selectElement = screen.getByRole("combobox");


    fireEvent.change(selectElement, { target: { value: "true" } });

    await waitFor(() => {
      expect(screen.getByText("Movie 6")).toBeInTheDocument();
    });
  });
});
