import React from "react";
import {Link} from "react-router-dom";

function Home() {
  return (
    <div>
      <div>Home</div>
      <div>이미지</div>
      <Link to={`/showdetail`}>
        <span style={{cursor: "pointer"}}>➡️ Go to</span>
      </Link>
    </div>
  );
}

export default Home;
