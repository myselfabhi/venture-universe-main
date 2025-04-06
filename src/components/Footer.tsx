export default function Footer() {
  return (
    <footer className="bg-vu-space text-vu-cyan py-6 w-full">
      <div className="px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            {/* Column 1: CepciSe Us */}
            <div>
              <h3 className="font-bold text-vu-purple mb-2">CepciSe Us</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Cookies policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Clorius F&ouml;turs */}
            <div>
              <h3 className="font-bold text-vu-purple mb-2">Clorius F&ouml;turs</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Contact Future&#39;s experts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Accessibility Statement
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: fm! &uuml;&ouml;be */}
            <div>
              <h3 className="font-bold text-vu-purple mb-2">fm! &uuml;&ouml;be</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Terms and conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Advertise with us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Web notifications
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Priory poochy */}
            <div>
              <h3 className="font-bold text-vu-purple mb-2">Priory poochy</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-vu-cyan hover:text-vu-yellow transition-colors duration-300">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-vu-blue/20 mt-6 pt-4 text-center text-xs">
            <p className="text-vu-cyan">
              Space is part of Future US Inc, an international media group and leading digital publisher. Visit our corporate site.
            </p>
            <p className="mt-2 text-vu-cyan">
              &copy; {new Date().getFullYear()} Future US, Inc. Full 7th Floor, 130 West 42nd Street, New York, NY 10036.
            </p>
            <p className="mt-2 text-vu-cyan">
              <a href="#" className="hover:text-vu-yellow">https://www.space.com/25325-fermi-paradox.html</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}