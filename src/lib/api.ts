import axios, { AxiosError } from "axios";
import fs from "fs/promises";
import path from "path";

const BASE_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "xo03lkuZpoNNY2X1fCVl5HvCubJGUHSAyFReE8hQ";
const CACHE_FILE = path.join(process.cwd(), "cache", "apod.json");
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface ApodData {
  title: string;
  explanation: string;
  url: string;
  date: string;
}

// Mock data for fallback
const mockApodData: ApodData[] = [
  {
    title: "Mock APOD 1",
    explanation: "This is a mock APOD entry for testing purposes. It shows a beautiful image of a galaxy.",
    url: "https://apod.nasa.gov/apod/image/2410/NGC6946_Hubble_960.jpg",
    date: "2024-10-01",
  },
  {
    title: "Mock APOD 2",
    explanation: "This is another mock APOD entry. It features a stunning nebula in deep space.",
    url: "https://apod.nasa.gov/apod/image/2410/M16_Hubble_960.jpg",
    date: "2024-10-02",
  },
  {
    title: "Mock APOD 3",
    explanation: "A third mock APOD entry. This one showcases a lunar eclipse.",
    url: "https://apod.nasa.gov/apod/image/2410/LunarEclipse_2024_960.jpg",
    date: "2024-10-03",
  },
];

// Ensure the cache directory exists
async function ensureCacheDir() {
  const cacheDir = path.dirname(CACHE_FILE);
  try {
    await fs.mkdir(cacheDir, { recursive: true });
  } catch (error: unknown) {
    console.error("Error creating cache directory:", error);
  }
}

// Read from cache
async function readFromCache(): Promise<{ data: ApodData[]; timestamp: number } | null> {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(cacheData);
  } catch (error: unknown) {
    console.error("Error reading from cache:", error);
    return null;
  }
}

// Write to cache
async function writeToCache(data: ApodData[]): Promise<void> {
  try {
    await ensureCacheDir();
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  } catch (error: unknown) {
    console.error("Error writing to cache:", error);
  }
}

export async function fetchApod(count: number = 3): Promise<ApodData[]> {
  // Check cache first
  const cached = await readFromCache();
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("Using cached APOD data");
    return cached.data.slice(0, count);
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY,
        count, // Fetch multiple entries
      },
    });
    const data = response.data;
    // Cache the new data
    await writeToCache(data);
    return data;
  } catch (error: unknown) {
    // Narrow the type to AxiosError
    if (error instanceof AxiosError) {
      if (error.response?.status === 429) {
        console.warn("Rate limit exceeded. Using mock APOD data.");
        return mockApodData.slice(0, count);
      }
      console.error("Error fetching APOD data:", error.message);
    } else {
      console.error("Unexpected error fetching APOD data:", error);
    }
    return mockApodData.slice(0, count);
  }
}