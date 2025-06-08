import React, { useEffect, useState } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      setCities([]);
      setSelectedCity("");
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <h2>Select Location</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {/* Country Dropdown */}
        <select
          style={{ padding: "10px" }}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <br />

      {/* Final Selection Output */}
      {selectedCountry && selectedState && selectedCity && (
        <div>
          <strong>You selected </strong>{" "}
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            {selectedCity},
          </span>{" "}
          <span style={{ color: "gray", fontSize: "1rem" }}>
            {selectedState}, {selectedCountry}
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
