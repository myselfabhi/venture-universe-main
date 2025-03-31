import axios from "axios";

const API_KEY = "DEMO_KEY"; 
const BASE_URL = "https://api.nasa.gov/planetary/apod";

export interface ApodData {
  title: string;
  explanation: string;
  url: string;
  date: string;
}

export async function fetchApod(count: number = 3): Promise<ApodData[]> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY,
        count, // Fetch multiple entries 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    return [];
  }
}
