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
   const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your backend API
      let response = await axios.post(
        "https://psrl.onrender.com/api/users/signup",
        formData
      );

      // Handle the response as needed (e.g., show success message)
      console.log("Response:", response.data);
      setApiResponse(response.data);
      setError(null);
      alert("submitted successfully")
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error in submitting:", error);
      setError(error.message);
      setApiResponse(null);
      
    }
  };

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

      {apiResponse && (
        <div>
          <h2>API Response:</h2>
          <pre>{(JSON.stringify(apiResponse, null, 2))}</pre>
        </div>
      )}
    </div>
  );
};

export default UserForm;
