import {useState, useEffect} from "react";
import axios from "axios";
import Country from "./components/country";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setShowCountry(countriesFilter.length === 1 ? {...countriesFilter[0]} : {});
  }, [countriesFilter]);

  const searchCountry = (e) => {
    setCountry(e.target.value);
    setCountriesFilter(
      countries.filter(
        (country) =>
          country.name.common.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    );
  };
  const showCountries = () => {
    return countriesFilter.map((country, i) => (
      <p key={i}>
        {country.name["common"]}
        <button onClick={() => setShowCountry(country)}>show</button>
      </p>
    ));
  };

  return (
    <>
      <p>
        find countries <input value={country} onChange={searchCountry} />
      </p>
      {countriesFilter.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        showCountries()
      )}
      {showCountry.name && <Country data={showCountry} />}
    </>
  );
}

export default App;
