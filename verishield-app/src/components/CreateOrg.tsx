import React, { useState } from "react";
import Header from "./Header";

export const CreateOrg = () => {
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log("Successful");
      alert("success");
      setText("Successfully created Organisation, go to your dashboard.");
      setName("");
      setDescription("");
    } catch (error) {
      setText(`Unsuccessful: ${error}`);
    }
  };
  return (
    <div className="w-full h-screen bg-[url('../../public/bg.jpeg')]">
      <Header />
      <div className="w-[50%] shadow-2xl rounded-xl mx-auto bg-blue-100 py-[3rem]">
        <div className=" flex flex-col items-center">{text}</div>
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-3xl text-center m-4">
            Create Organisation
          </h2>
          <div className="flex flex-col items-center gap-2 mb-4">
            <label className="text-xl" htmlFor="name">
              Name Of Organisation:
            </label>
            <input
              className="p-2 w-[80%] rounded-md shadow-md"
              typeof="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center gap-2 mb-8">
            <label className="text-xl" htmlFor="desc">
              Description Of Organisation:
            </label>
            <input
              className="p-2 w-[80%] rounded-md shadow-md"
              typeof="text"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex items-center mt-4">
            <button
              className="text-xl w-[40%] mx-auto bg-blue-900 text-white py-2 rounded-md shadow-md"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
