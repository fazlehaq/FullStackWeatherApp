import { Request, Response, NextFunction } from "express";
import "dotenv/config";

export function validateWeatherSearchParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cityId: string | undefined =
    req.query.hasOwnProperty("cityId") && typeof req.query.cityId === "string"
      ? (req.query.cityId as string)
      : undefined;
  const cityName: string | undefined =
    req.query.hasOwnProperty("cityName") &&
    typeof req.query.cityName === "string"
      ? (req.query.cityName as string)
      : undefined;
  const units: string | undefined =
    req.query.hasOwnProperty("units") && typeof req.query.units === "string"
      ? (req.query.units as string)
      : undefined;

  // At least one of cityId or cityName is required
  if (!cityId && !cityName) {
    return res.status(400).json({
      status: "error",
      message: "CityId or CityName is required.",
    });
  }

  // Units should be one of "metric", "imperial", or "standard"
  if (units && !["metric", "imperial", "standard"].includes(units)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid units provided.",
    });
  }

  // Assigning validated values to res.locals for subsequent middlewares
  if (cityId) res.locals.cityId = cityId;
  if (cityName) res.locals.cityName = cityName;
  if (units) res.locals.units = units;

  // Calling the next middleware
  next();
}

export function buildUrlPath(req: Request, res: Response, next: NextFunction) {
  const api_url = new URL(process.env.OPEN_WEATHER_BASE_URL!);

  if (res.locals?.cityId) api_url.searchParams.append("id", res.locals.cityId);
  else api_url.searchParams.append("q", res.locals.cityName);

  if (res.locals?.units) api_url.searchParams.append("units", res.locals.units);

  // api key
  api_url.searchParams.append("appid", process.env.OPEN_WEATHER_API_KEY!);

  // attaching url to req object
  res.locals.api_url = api_url.href;

  next();
}
