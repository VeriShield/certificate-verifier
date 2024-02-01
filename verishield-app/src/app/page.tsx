// pages/index.tsx
"use client";
import { Dashboard } from "@/components/Dashboard";
import Header from "../components/Header";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('../../public/bg.jpeg')]">
      <Header />
      <div className="bg-white p-8 rounded-md shadow-md mb-8 max-w-2xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to VeriShield</h1>
        <p className="text-gray-700  text-center">
          VeriShield is a decentralized certificate verification platform
          leveraging blockchain technology. Our mission is to ensure the
          authenticity and integrity of certificates while providing a seamless
          and secure verification experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center w-[80%] mx-auto">
        <FeatureCard
          title="Secure Verification"
          description="Utilizing blockchain ensures tamper-resistant certificates, enhancing the security of the verification process."
        />
        <FeatureCard
          title="Decentralized Trust"
          description="Eliminate the need for a central authority. Our decentralized approach enhances trust and reduces the risk of manipulation or fraud."
        />
        <FeatureCard
          title="Global Accessibility"
          description="VeriShield provides a globally accessible platform for certificate verification, breaking down geographical boundaries."
        />
      </div>

      <div className="my-8 flex gap-8 flex-col md:flex-row">
        <Link
          href="/verify"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Verify Certificate
        </Link>
      </div>
      <Dashboard />
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-md shadow-md hover:animate-pulse">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default Home;
