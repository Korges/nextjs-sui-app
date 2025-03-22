"use client"; // Required for interactive components in Next.js App Router

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // Get current route

  return (
    <div>
      <ul className="flex space-x-4 text-white">
        <li>
          <Link
            href="/"
            className={`px-4 py-2 rounded ${pathname === "/" ? "bg-gray-600" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded ${pathname === "/dashboard" ? "bg-gray-600" : ""}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/governance"
            className={`px-4 py-2 rounded ${pathname === "/governance" ? "bg-gray-600" : ""}`}
          >
            Governance
          </Link>
        </li>
      </ul>
    </div>
  );
}
