// pages/verify.tsx
"use client";
import Header from "./components/Header";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";
import { useState } from "react";

interface VerifyProps {}

const Verify: React.FC<VerifyProps> = () => {
  // const router = useRouter();
  const [certificateHash, setCertificateHash] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with your actual verification logic
    const isValid: boolean = await verifyCertificate(certificateHash);

    if (isValid) {
      setVerificationResult("success");
    } else {
      setVerificationResult("failure");
    }
  };

  const verifyCertificate = async (hash: string): Promise<boolean> => {
    console.log(hash);

    return true; // Placeholder for demo purposes
  };

  return (
    <div
      // initial={{ opacity: 0, y: -20 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -20 }}
      className="container w-full h-screen bg-[url('../public/assets/img/bg2.jpeg')]"
    >
      <Header />
      <div className="bg-blue-100 rounded-md shadow-md py-4 w-[50%] h-[60%] mx-auto flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold mb-4">Verify Certificate</h1>
        <form className="max-w-md" onSubmit={handleVerify}>
          <label
            className="block text-gray-700 text-xl text-center font-bold mb-2"
            htmlFor="certificateHash"
          >
            Certificate Hash:
          </label>
          <input
            type="text"
            id="certificateHash"
            name="certificateHash"
            value={certificateHash}
            onChange={(e) => setCertificateHash(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Certificate Hash"
            required
          />
          <div className="w-full">
            <button
              type="submit"
              className="mt-8 bg-blue-900 w-full text-white mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify
            </button>
          </div>
        </form>

        {verificationResult === "failure" && (
          <div className="mt-4 bg-red-100 p-4 rounded-md shadow-md">
            <p className="text-red-700 font-bold">Verification Failed!</p>
            <p className="text-gray-700">
              Sorry, the certificate could not be verified. Please double-check
              the information and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
