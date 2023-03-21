import { SetStateAction, useState } from "react";
import SearchResults from "./features/search/components/SearchResults";
import { Button, TextField, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAsync, selectData, selectLoadedStatus, selectInitialStatus, selectLoadingStatus } from "./features/search/searchSlice";
import styled from "styled-components";
const AppElement = styled.div`
font-family: sans-serif;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;`

const SearchContainerDiv = styled.div`
width: 300px;
display: flex;
flex-direction: column;
margin-bottom: 20px;`

const SearchInnerDiv = styled.div`
display: flex;`

function App() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const resData = useAppSelector(selectData);
  const loaded = useAppSelector(selectLoadedStatus);
  const initial = useAppSelector(selectInitialStatus);
  const loading = useAppSelector(selectLoadingStatus);
  const onChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const onSearch = async () => {
    dispatch(fetchAsync(value))
  };
  return (
    <AppElement>
      <h2>iTunes Music Search</h2>
      <SearchContainerDiv>
        <SearchInnerDiv>
          <TextField sx={{ width: 250 }} id="search" label="Search" variant="outlined" type="text" value={value} placeholder="Search..." onChange={onChange} />
          <Button variant="outlined" onClick={() => onSearch()}><SearchIcon /></Button>
        </SearchInnerDiv>
      </SearchContainerDiv>
      <div>
        {(initial) && <p style={{ display: "none" }}>Search for music</p>}
        {(loading) && <div><CircularProgress /><p>Loading...</p></div>}
        {(loaded && resData?.length === 0) && <p>No records found</p>}
        {(loaded && resData?.length > 0) && <SearchResults />}
      </div>
    </AppElement>
  );
}
export default App;