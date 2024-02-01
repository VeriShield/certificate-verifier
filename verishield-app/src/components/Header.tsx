// components/Header.js
import Link from "next/link";

const Header = () => (
  <header className="py-6 w-full mb-8">
    <nav className="container w-[80%] mx-auto flex justify-between items-center gap-8">
      <Link href="/" className="text-white font-bold text-lg">
        VeriShield
      </Link>
      <Link href="/visit" className="text-white font-bold text-lg">
        Visit Dapp
      </Link>
    </nav>
  </header>
);

export default Header;
