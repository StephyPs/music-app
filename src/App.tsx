import { SetStateAction, useState } from "react";
import "./App.css";
import SearchResults from "./features/search/components/SearchResults";
import { Button, TextField,CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAsync, selectData, selectLoadedStatus,selectInitialStatus,selectLoadingStatus } from "./features/search/searchSlice";
import styled from "styled-components";
const AppElement=styled.div`
font-family: sans-serif;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;`

function App() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const resData = useAppSelector(selectData);
  const loaded = useAppSelector(selectLoadedStatus);
  const initial =useAppSelector(selectInitialStatus);
  const loading =useAppSelector(selectLoadingStatus);
  const onChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const onSearch = async () => {
    dispatch(fetchAsync(value))
  };
  return (
    <AppElement>
      <h2>iTunes Music Search</h2>
      <div className="search-container">
        <div className="search-inner">
          <TextField id="search" label="Search" variant="outlined" type="text" value={value} placeholder="Search..." onChange={onChange} />
          <Button variant="outlined" onClick={() => onSearch()}><SearchIcon /></Button>
        </div>
      </div>
      <div>

        {(initial) && <p style={{display:"none"}}>Search for music</p>}
        {(loading) && <div><CircularProgress/><p>Loading...</p></div>}
        {(loaded && resData?.length === 0) && <p>No records found</p>}
        {(loaded && resData?.length > 0) && <SearchResults/>}
      </div>
    </AppElement>
  );
}
export default App;