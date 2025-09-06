import React from "react";
import Header from "../component/Home/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div>
        <div className="my-10">
          <h3 className="text-7xl font-semibold text-center">
            Create content 10x
          </h3>
          <h3 className="text-7xl font-semibold text-center">
            Faster with AI - in-English
          </h3>
          <h3 className="text-7xl font-semibold text-center">or Hindi</h3>
        </div>
        <div>
          <ul className="text-center my-10 list-disc">
            <li className="text-md">
              Write blogs, social posts, email in seconds
            </li>
            <li className="text-md">Supports multiple language</li>
          </ul>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-400 w-40 h-10 text-white text-xl rounded-lg cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Try for Free
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
