// pages/verification-failure.js
import Header from "../../components/Header";
import { motion } from "framer-motion";

const VerificationFailure = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="container mx-auto mt-8"
  >
    <Header />
    <div className="bg-red-100 p-8 rounded-md shadow-md mb-8">
      <h1 className="text-4xl font-bold mb-4">Verification Failed</h1>
      <p className="text-gray-700">
        Sorry, the certificate could not be verified. Please double-check the
        information and try again.
      </p>
    </div>
  </motion.div>
);

export default VerificationFailure;
