import React from "react";

const UpdateButton = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/fetch-user-data");
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error("Failed to fetch user data:", e);
    }
  };

  return <button onClick={handleClick}>Fetch User Data</button>;
};

export default UpdateButton;
