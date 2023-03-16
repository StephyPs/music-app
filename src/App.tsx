import { SetStateAction, useState } from "react";
import "./App.css";
import SearchResults from "./features/search/components/SearchResults";
import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAsync, selectData, selectLoadedStatus } from "./features/search/searchSlice";

function App() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const resData = useAppSelector(selectData);
  const loaded = useAppSelector(selectLoadedStatus);

  const onChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const onSearch = async () => {
    dispatch(fetchAsync(value))
  };
  return (
    <div className="App">
      <h2>iTunes Music Search</h2>
      <div className="search-container">
        <div className="search-inner">
          <TextField id="search" label="Search" variant="outlined" type="text" value={value} placeholder="Search..." onChange={onChange} />
          <Button variant="outlined" onClick={() => onSearch()}><SearchIcon /></Button>
        </div>
      </div>
      <div>

        {(loaded && resData?.length === 0) && <p>No records found</p>}
        {resData?.length > 0 && <SearchResults/>}
      </div>
    </div>
  );
}
export default App;