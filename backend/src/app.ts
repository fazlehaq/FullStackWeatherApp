// lib imports
import express, { Express, NextFunction, Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import cors from "cors";

// builtin modules
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// our module
import { getCitySuggestions, extract_cities_in_sqlite } from "./db.js";
import { validateWeatherSearchParams, buildUrlPath } from "./middleware.js";
import { ErrorResponse } from "./types.js";
import { formatWeatherData } from "./utils.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const app: Express = express();
const PORT_NUMBER: Number = 3000;

app.use(cors({ origin: "*" }));

app.get(
  "/weather",
  validateWeatherSearchParams,
  buildUrlPath,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Making the API call
      const response = await axios.get(res.locals.api_url!);

      return res.status(201).json(formatWeatherData(response.data));
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: "error",
        message: "An error occurred while fetching weather data.",
      };

      // Non-Axios error
      if (!axios.isAxiosError(error)) {
        console.error("Unknown Error: ", error);
        errorResponse.details = "An unexpected error occurred.";
        return res.status(500).json(errorResponse);
      }

      // Axios error
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error("API Response Error: ", error.response.data);
        errorResponse.message =
          error.response.data.message || "Weather API responded with an error.";
        errorResponse.details = {
          statusCode: error.response.status,
          data: error.response.data,
        };
        return res.status(error.response.status).json(errorResponse);
      } else if (error.request) {
        // No response received
        console.error("API Request Error: No response received", error.request);
        errorResponse.message =
          "No response received from the Weather API. Please try again later.";
        errorResponse.details = "Network or server issue.";
        return res.status(504).json(errorResponse);
      } else {
        // Error in setting up the request
        console.error("Axios Configuration Error: ", error.message);
        errorResponse.message = "Internal server error.";
        errorResponse.details = error.message;
        return res.status(500).json(errorResponse);
      }
    }
  }
);

app.get("/city_suggestions/:query", async (req, res, next) => {
  const { query } = req.params;
  try {
    const suggestions = await getCitySuggestions(query);
    res.status(200).json({ suggestions: suggestions });
  } catch (error) {
    console.error("Error while fetching city suggestions: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching city suggestions." });
  }
});

app.listen(PORT_NUMBER, async () => {
  console.log("Checks: ");
  console.log("Checking api key exists or not...");
  if (!process.env.OPEN_WEATHER_API_KEY) {
    /* shut down */
    process.exit(0);
  }

  console.log("Checking if cities db exists...");
  if (!fs.existsSync(path.resolve(__dirname, "../data/cities.db"))) {
    // create cities
    console.log(path.resolve(__dirname, "../data/cities.db"));
    console.log("Extracting cities into sqlite...");
    if (!extract_cities_in_sqlite()) {
      process.exit(0);
    }
    console.log("Done extracting city names.");
  }

  console.log("Server is up & running at port " + PORT_NUMBER);
});
