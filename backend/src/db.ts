import fs from "fs";
import path, { dirname } from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define types for city data
interface Coordinates {
  lon: number;
  lat: number;
}

interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinates;
}

interface CityShort {
  id: number;
  name: String;
  country: String;
}

export function extract_cities_in_sqlite(): boolean {
  try {
    // Initialize SQLite Database
    const dbPath = path.resolve(__dirname, "../data/cities.db");

    const db = new sqlite3.Database(dbPath, (err: any) => {
      if (err) {
        console.error("Error opening the database:", err.message);
        return false;
      }
    });

    console.log("Database opened successfully.");

    // Read and parse the JSON file synchronously with error handling
    const filePath = path.resolve(__dirname, "../data/city.list.json");
    let data: string;
    try {
      data = fs.readFileSync(filePath, "utf8");
    } catch (err: any) {
      console.error(`Error reading file at ${filePath}:`, err.message);
      return false;
    }

    let parsedData: City[];
    try {
      parsedData = JSON.parse(data);
    } catch (err: any) {
      console.error("Error parsing the JSON file:", err.message);
      return false;
    }

    console.log("Total cities available:", parsedData.length);

    // Prepare the cleaned data
    const cleanedData: CityShort[] = parsedData.map((element: City) => ({
      id: element.id,
      name: element.name,
      country: element.country,
    }));

    // Serialize database operations
    db.serialize(() => {
      // Create the table and index if they don't exist
      db.run(
        `CREATE TABLE IF NOT EXISTS cities (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          country TEXT NOT NULL
        );`,
        (err: any) => {
          if (err) {
            console.error("Error creating table:", err.message);
            return false;
          }
        }
      );

      db.run(
        `CREATE INDEX IF NOT EXISTS idx_city_name ON cities (name);`,
        (err: any) => {
          if (err) {
            console.error("Error creating index:", err.message);
            return false;
          }
        }
      );

      // Insert data in a single transaction
      db.run("BEGIN TRANSACTION;", (err: any) => {
        if (err) {
          console.error("Error starting transaction:", err.message);
          return false;
        }
      });

      const insertStmt = db.prepare(
        "INSERT INTO cities (id, name, country) VALUES (?, ?, ?)"
      );

      // Insert each city into the database
      for (let index = 0; index < cleanedData.length; index++) {
        const city = cleanedData[index];
        insertStmt.run(city.id, city.name, city.country, (err: any) => {
          if (err) {
            console.error(
              `Error inserting city [ID: ${city.id}]:`,
              err.message
            );
          }
        });

        if (index % 10000 === 0) {
          console.log(`${index} rows inserted...`);
        }
      }

      insertStmt.finalize((err: any) => {
        if (err) {
          console.error("Error finalizing statement:", err.message);
          return false;
        }
      });

      db.run("COMMIT;", (err: any) => {
        if (err) {
          console.error("Error committing transaction:", err.message);
          return false;
        }
        console.log("All rows inserted successfully.");
      });
    });

    // Close the database after insertion
    db.close((err: any) => {
      if (err) {
        console.error("Error closing the database:", err.message);
        return false;
      } else {
        console.log("Database closed successfully.");
        return true;
      }
    });

    return true; // Return true if all operations succeed
  } catch (err: any) {
    console.error("Error during database operations:", err.message);
    return false; // Return false in case of error
  }
}

export async function getCitySuggestions(query: string): Promise<any[]> {
  const dbPath = path.resolve(__dirname, "../data/cities.db");

  return new Promise((resolve, reject) => {
    const dbForQuery = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error opening the database for querying:", err);
        reject(err);
        return;
      }

      dbForQuery.all(
        "SELECT name,id,country FROM cities WHERE name LIKE ? order by name LIMIT 10",
        [`${query}%`],
        (err, rows) => {
          if (err) {
            console.error("Error fetching city suggestions:", err);
            reject(err);
          } else {
            console.log(rows[0]);
            const result = rows.map((row: any) => ({
              name: row.name,
              id: row.id,
              country: row.country,
            }));
            resolve(result);
          }

          // Close the database after querying
          dbForQuery.close((err) => {
            if (err) {
              console.error("Error closing the database after querying:", err);
            }
          });
        }
      );
    });
  });
}
