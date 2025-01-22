import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Home link */}
        <Link href="/" className="text-2xl font-bold">
          KaamWala
        </Link>
        {/* Navigation menu */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/find-service" className="hover:underline">
                Find Service
              </Link>
            </li>
            <li>
              <Link href="/provide-service" className="hover:underline">
                Provide Service
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
