Here's the corrected and formatted README file:

---

# FullStack Weather App

## Project Overview
The FullStack Weather App is a full-stack application designed to provide weather information for specific cities. It features a search suggestion functionality with a database of over 200,000 city names for an enhanced user experience. The app uses modern web technologies, prioritizes clean code organization, and includes robust error handling.

### Key Features
- **Weather Search:** Fetch and display weather details for any city.
- **Search Suggestions:** Auto-completed city names using a large SQLite database.
- **Error Handling:** Comprehensive error management in both frontend and backend.
- **Custom Hooks:** Includes reusable hooks like `useLocalStorage` and `useSearchHistory`.
- **Responsive Design:** Styled with Tailwind CSS for a modern and user-friendly interface.
- **State Management:** Efficient state handling using React.
- **Code Organization:** Clean and modular structure.
- **Deployment:**
  - Frontend hosted on GitHub Pages.
  - Backend hosted on Replit.

---
## Links 
**frontend** : https://fazlehaq.github.io/FullStackWeatherApp/ 
**backend** : https://replit.com/@1200Shaikh-Moha/OrnateCreativeDimension

---

## Setup Instructions

### Prerequisites
- **Node.js** (>=16.x)
- **npm** (or **yarn**)
- **SQLite**
- **Git**

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/FullStackWeatherApp.git
   cd FullStackWeatherApp
   ```

2. **Install Dependencies:**
   - **Backend:**
     ```bash
     cd backend
     npm install
     ```
   - **Frontend:**
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Environment Variables:**
   Create a `.env` file in both `backend` and `frontend` directories:
   - **Backend (`backend/.env`):**
     ```env
     WEATHER_API_KEY=your_api_key
     ```
   - **Frontend (`frontend/.env`):**
     ```env
     VITE_API_BASE_URL=http://localhost:3000
     ```

4. **Initialize the SQLite Database:**
   Run the backend server for the first time to seed the SQLite database automatically.

5. **Start the Application:**
   - **Backend:**
     ```bash
     cd backend
     node start
     ```
   - **Frontend:**
     ```bash
     cd ../frontend
     npm run dev
     ```

6. **Access the Application:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

---

## API Documentation

### Base URL
- **Local:** `http://localhost:3000`
- **Production:** Replace with the Replit-hosted URL.

### Endpoints

1. **GET /weather**
   - **Parameters:**
     - `cityId` (number, optional)
     - `cityName` (string, optional)
     - `units` (string, optional)
   - **Example Request:**
     ```
     /weather?cityId=1259229&units=metric
     ```
   - **Response:**
     ```json
     {
       "cityInfo": {
         "id": 1259229,
         "name": "Pune",
         "timezone": 19800,
         "coord": {
           "lon": 73.8553,
           "lat": 18.5196
         }
       },
       "weather": [
         {
           "id": 800,
           "main": "Clear",
           "description": "clear sky",
           "icon": "https://openweathermap.org/img/wn/01n.png"
         }
       ],
       "visibility": 10000,
       "temprature": {
         "temp": 292.88,
         "feels_like": 292.45,
         "temp_min": 292.88,
         "temp_max": 292.88,
         "humidity": 59
       },
       "wind": {
         "speed": 1.5,
         "deg": 83,
         "gust": 1.82
       }
     }
     ```

2. **GET /city_suggestion/:query**
   - **Parameters:**
     - `query` (string): The city name query.
   - **Example Request:**
     ```
     /city_suggestion/Lon
     ```
   - **Response:**
     ```json
     [
       "London",
       "Long Beach",
       "Longueuil"
     ]
     ```

---

## Design Decisions
- **Frontend Framework:** React with TypeScript for type safety and developer productivity.
- **Backend Framework:** Express.js for a scalable and efficient API server.
- **Database:** SQLite for lightweight and fast data storage.
- **Styling:** Tailwind CSS for consistent and responsive design.
- **API Calls:** Axios for streamlined and reliable HTTP requests.
- **Hosting:** GitHub Pages (frontend) and Replit (backend).
- **Custom Hooks:** 
  - `useLocalStorage` for persistent client-side storage.
  - `useSearchHistory` for maintaining user search history.

---

## Future Improvements
1. User authentication with profiles and settings (personalization).
2. Caching frequently searched cities to reduce API calls.
3. Advanced search suggestions with fuzzy matching.
4. Adding weather alerts and notifications.
5. Progressive Web App (PWA) version for offline functionality.
6. Units change from frontend.
7. Adding Accessebility.
---

## Notes About Platform Limitations
- **Replit:** May experience cold starts, causing slight delays in initial requests.
- **SQLite:** Effective for smaller-scale applications; may require migration to a relational database like PostgreSQL for larger datasets.

---
