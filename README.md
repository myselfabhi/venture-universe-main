🌌 Venture Universe

Venture Universe is your gateway to the cosmos, offering the latest space news, articles, and milestones in an immersive, space-themed experience. Dive into NASA’s Astronomy Picture of the Day (APOD), explore ISRO’s historic odyssey, and celebrate humanity’s journey through the stars—all wrapped in a stunning nebula-inspired design with dynamic animations and particle effects. 🚀
🔗 Live Site: https://ventureuniverse.vercel.app/
✨ Features.

Space News via NASA API: Fetches and displays the latest space articles and images from NASA’s APOD API in the News section.
ISRO Odyssey Timeline: A scroll-animated timeline showcasing key milestones in ISRO’s space exploration journey, from Aryabhata to Chandrayaan-3.
Cosmic Design: Immersive nebula backgrounds, starry particle effects, and space-themed SVGs across all sections for a cohesive experience.
Interactive Elements: Floating astronaut animations, scroll-driven timeline effects, and hover animations for an engaging user experience.
Responsive Layout: Fully responsive design with Tailwind CSS, ensuring a seamless experience on mobile, tablet, and desktop.
Accessibility: Semantic HTML, ARIA labels, and focusable elements for improved accessibility.

🛠️ Tech Stack

Frontend: React, Next.js
Styling: Tailwind CSS
Animations: Framer Motion
Particles: react-tsparticles, tsparticles
API Integration: NASA APOD API for space news
Deployment: Vercel

📂 Project Structure
venture-universe/
├── public/
│   ├── assets/
│   │   ├── images/           # Space images (e.g., nebula-background.png, aryabhata.jpg)
│   │   ├── icons/            # SVG icons (e.g., rocket.svg, moon.svg)
│   │   └── space-background.svg
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section with astronaut and CTA
│   │   ├── Timeline.jsx      # Scroll-animated timeline component
│   │   ├── NewsItem.jsx      # Individual news item for the News section
│   │   ├── NewsDetails.jsx   # Modal for detailed news articles
│   │   ├── Particles.jsx     # Particle effects component
│   │   └── ...               # Other components (About, Contact, etc.)
│   ├── constants/
│   │   ├── cosmicMilestones.js  # ISRO milestones data
│   │   ├── nasaNews.js       # Mock NASA APOD data
│   │   └── ...               # Other constants
│   ├── pages/
│   │   ├── index.jsx         # Homepage with Hero section
│   │   ├── news.jsx          # News section with NASA APOD articles
│   │   ├── cosmicJourney.jsx # ISRO Odyssey timeline section
│   │   └── ...               # Other pages
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation

🚀 Getting Started
Prerequisites

Node.js (v18 or higher)
npm or yarn
NASA API Key (sign up at https://api.nasa.gov/ to get one)

Installation

Clone the repository:
git clone https://github.com/your-username/venture-universe.git
cd venture-universe


Install dependencies:
npm install
# or
yarn install


Set up environment variables:Create a .env.local file in the root directory and add your NASA API key:
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here


Run the development server:
npm run dev
# or
yarn dev

Open http://localhost:3000 to view the site in your browser.


Building for Production

Build the project:
npm run build
# or
yarn build


Start the production server:
npm start
# or
yarn start



🌠 Usage

Homepage: Features a hero section with a floating astronaut, nebula background, and a CTA to the News section.
News Section: Displays the latest space articles fetched from NASA’s APOD API, with scrollable modals for detailed views.
ISRO Odyssey: A timeline of ISRO’s milestones, with images, icons, and a rocket-themed background.
Assets:
Ensure /public/assets/nebula-background.png and /public/assets/space-background.svg are present for backgrounds.
Add milestone images (e.g., /public/assets/images/chandrayaan3.jpg) and icons (e.g., /public/assets/icons/rocket.svg) as needed.



🤝 Contributing
We welcome contributions to make Venture Universe even better! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a Pull Request with a detailed description of your changes.

Please ensure your code follows the project’s style guide (Prettier, ESLint) and includes relevant tests if applicable.
📜 License
This project is licensed under the MIT License—see the LICENSE file for details.
📬 Contact
For questions, feedback, or collaboration, reach out via:

Email: your-email@example.com
GitHub Issues: Open an issue


Explore the universe with Venture Universe—where every click takes you closer to the stars! 🌟

