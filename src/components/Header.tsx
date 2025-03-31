export default function Header() {
    return (
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Venture Universe</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/news" className="hover:underline">News</a></li>
              <li><a href="/articles" className="hover:underline">Articles</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }