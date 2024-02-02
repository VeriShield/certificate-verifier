import React, { FormEventHandler, useState } from "react";
import Header from "./Header";
import "./bg.css";
import { useRollups } from "../useRollups";
import { Input } from "../Input";
import { useNavigate } from "react-router-dom";

interface Address {
  address: string;
}

export const Dashboard = () => {
  const [courseName, setCourseName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [studentWalletAddress, setStudentWalletAddress] = useState("");
  const [dappAddress, setDappAddress] = useState(
    "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"
  );
  const rollups = useRollups(dappAddress);
  const navigate = useNavigate();
  // const { account } = useAccount() as any;
  const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    if (rollups === undefined) {
      alert(
        "Problem encountered adding course, please reload your page and reconnect wallet"
      );
    } else {
      try {
        e.preventDefault();
        await Input(rollups, dappAddress, addCourseParams, false);
        console.log("Successful");
        alert("Adding Course");
        navigate("/dashboard");
      } catch (error) {
        console.log(`Unsuccessful: ${error}`);
      }
    }
  };

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    if (rollups === undefined) {
      alert(
        "Problem encountered adding student, please reload your page and reconnect wallet"
      );
    } else {
      try {
        e.preventDefault();
        await Input(rollups, dappAddress, addStudentParams, false);
        console.log("Successful");
        alert("Adding Student");
        navigate("/dashboard");
      } catch (error) {
        console.log(`Unsuccessful: ${error}`);
      }
    }
  };

  const handleMintCertificate = async (e: React.FormEvent<HTMLFormElement>) => {
    if (rollups === undefined) {
      alert(
        "Problem encountered generating certificate, please reload your page and reconnect wallet"
      );
    } else {
      try {
        e.preventDefault();
        await Input(rollups, dappAddress, addStudentParams, false);
        console.log("Successful");
        alert("Minting Certificate");
        navigate("/dashboard");
      } catch (error) {
        console.log(`Unsuccessful: ${error}`);
      }
    }
  };

  const addCourseParams = JSON.stringify({
    method: "add_course",
    name: orgName,
    course: courseName,
  });

  const addStudentParams = JSON.stringify({
    method: "add_student",
    name: orgName,
    course: courseName,
    student: studentName,
    studentAddress: studentWalletAddress,
  });

  const mintCertificateParams = JSON.stringify({
    method: "generate_certificate",
    name: orgName,
    course: courseName,
    id: studentWalletAddress,
  });

  const fetchCourses = () => {
    // Placeholder for add course logic
    alert("Fetches Course");
  };

  const fetchStudents = () => {
    // Placeholder for add student logic
    alert("Fetching Student");
  };

  const viewIssuedCert = () => {
    // Placeholder for mint certificate logic
    alert("Fetching Certificates");
  };

  return (
    <div className="w-full bg">
      <Header />
      <div className="w-full flex gap-4 justify-evenly mb-8 px-8">
        <div className="bg-blue-100 flex flex-col gap-2 items-start w-[40%] p-8 rounded-md">
          <h2 className="font-bold text-2xl text-center w-full">Dashboard</h2>
          <div className="flex flex-col w-full pb-2 border-b border-gray-400">
            <span className="font-bold">Name Of Organization:</span>
            <span className="font-bold">Description:</span>
            <span className="font-bold">
              Wallet Address:{studentWalletAddress}
            </span>
          </div>
          <hr />
          <div className="bg-green-200 rounded-md shadow-md p-4 flex self-center flex-col">
            <h2 className="font-bold text-center">Course Details</h2>
            <div className="flex justify-between">
              <div className="flex-1 font-bold">Course Name</div>
              <div className="flex-1 font-bold">No. Of Registered Students</div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">Cartesi</div>
              <div className="flex-1">50</div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">Zero Knowledge</div>
              <div className="flex-1">60</div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 flex-col items-center w-[60%]">
          <div className="bg-yellow-100 p-8 rounded-md w-[80%]">
            <form onSubmit={handleAddCourse}>
              <h2 className="font-bold text-2xl text-center mb-4">
                Create Courses
              </h2>
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="courseName">
                  Course Name:
                </label>
                <input
                  className="p-2 rounded-md shadow-md"
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
              <br />
              <button className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Course
              </button>
            </form>
          </div>
          <div className="bg-purple-100 p-8 rounded-md w-[80%]">
            <form onSubmit={handleAddStudent}>
              <h2 className="font-bold text-2xl text-center mb-4">
                Add Student
              </h2>
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="studentName">
                  Student Name:
                </label>
                <input
                  className="p-2 rounded-md shadow-md"
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="walletAddress">
                  Student Wallet Address:
                </label>
                <input
                  className="p-2 rounded-md shadow-md"
                  type="text"
                  id="walletAddress"
                  value={studentWalletAddress}
                  onChange={(e) => setStudentWalletAddress(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="courseName">
                  Course Name:
                </label>
                <input
                  className="p-2 rounded-md shadow-md"
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
              <br />
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Student
              </button>
            </form>
          </div>
          <div className="bg-pink-100 p-8 rounded-md w-[80%]">
            <form onSubmit={handleMintCertificate}>
              <h2 className="font-bold text-2xl text-center mb-4">
                Mint Certificate
              </h2>
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="courseName">
                  Course Name:
                </label>
                <input
                  className="p-2 rounded-md shadow-md"
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="id">
                  Student Wallet Address:
                </label>
                <input
                  className="p-2 rounded-md shadow-md"
                  type="text"
                  id="id"
                  value={studentWalletAddress}
                  onChange={(e) => setStudentWalletAddress(e.target.value)}
                  required
                />
              </div>
              <br />
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Mint Certificate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
