import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // console.log(formData);
  const [apiResponse, setApiResponse] = useState();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const getUser = async () => {
    try {
      let getUser = await axios.get(
        "https://psrl.onrender.com/api/users/getUser"
      );
      setApiResponse(getUser.data);
    } catch (error) {
      console.log("Error:", error);
      setError(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your backend API
      await axios.post("https://psrl.onrender.com/api/users/signup", formData);
      setError(null);
      alert("submitted successfully");
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error in submitting:", error);
      setError(error.message);
      // setApiResponse(null);
    }
  };
  getUser();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* {apiResponse && (
        <div>
          <h2>API Response:</h2>
          {apiResponse.map((data) => JSON.stringify(data))}
        </div>
      )} */}
      {apiResponse && (
        <div>
          <h2>API Response:</h2>
          {apiResponse.map((data, index) => (
            <div key={index}>
              <p>
                <b>Name:</b> {data.name}, <b>Email:</b> {data.email},
                <b>Phone</b> {data.phone}
              </p>
              <hr />
              {/* <p>Email: {data.email}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserForm;
