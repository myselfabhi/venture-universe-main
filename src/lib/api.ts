// src/lib/api.ts
import axios from "axios";

const BASE_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "xo03lkuZpoNNY2X1fCVl5HvCubJGUHSAyFReE8hQ";

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
    throw error;
  }
}