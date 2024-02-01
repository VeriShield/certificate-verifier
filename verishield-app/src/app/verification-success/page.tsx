// pages/verification-success.js
import Header from "../../components/Header";
import { motion } from "framer-motion";

const VerificationSuccess = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="container mx-auto mt-8"
  >
    <Header />
    <div className="bg-green-100 p-8 rounded-md shadow-md mb-8">
      <h1 className="text-4xl font-bold mb-4">Verification Successful</h1>
      <p className="text-gray-700">
        Your certificate has been successfully verified!
      </p>
    </div>
  </motion.div>
);

export default VerificationSuccess;
