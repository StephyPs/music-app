import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import axios from "axios";
import PropTypes from "./app/PropTypes";

function App() {
  const [value, setValue] = useState("");
  const [resData, setData] = useState([] as any[]);
  
  const [resultsPresent, setResultsPresent] = useState<boolean>(false);
  const onChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const onSearch = async (searchTerm: SetStateAction<string>) => {
    setValue(searchTerm);
    // our api to fetch the search result
    const res = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}`);
  
      setData(res.data.results);
      if(res.data.results.length ==0) setResultsPresent(true);
      else setResultsPresent(false);
  };
  return (
    <div className="App">
      <h1>iTunes Music Search</h1>
      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>   
        </div>      
      </div>     
      <div>

          {resultsPresent && <p>No records found</p>}
          {resData.length >0 && <SearchResults resData={resData} />}
          </div>
    </div>
  );
}
export default App;