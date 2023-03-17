import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCurrentData, searchNext, selectData } from "../searchSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { IconButton } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';

const SearchResults = () => {
  const currentData = useAppSelector(selectCurrentData);
  const dispatch = useAppDispatch();
  const allData = useAppSelector(selectData);
  const fetchData = () => {
    dispatch(searchNext())
  }
  const hasMore = () => {
    return currentData.length < allData.length;
  }
  return (
    <InfiniteScroll
      dataLength={currentData.length}
      next={fetchData}
      hasMore={hasMore()}
      loader={<h4>Loading more 10 items...</h4>}
    >
      {
        <TableContainer component={Paper}>
          <Table data-testid="searchResultsTable" size="small" aria-label="a dense table">
            <TableHead sx={{backgroundColor:"rgba(105, 105, 105, 0.1)",height:60}}>
              <TableRow>
                <TableCell style={{width:100}} align="left">Image</TableCell>
                <TableCell style={{width:500}} align="left">Collection Name</TableCell>
                <TableCell style={{width:300}} align="left">Artist Name</TableCell>
                <TableCell style={{width:200}} align="left">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData?.map((item: any, id: number) => (
                <SearchRow item={item} key={id} />))}
            </TableBody>
          </Table>
        </TableContainer>

      }
    </InfiniteScroll>
  );
};
const SearchRow = ({ item }: any) => {
  return (<TableRow>
    <TableCell align="left"><Avatar src={item.artworkUrl100} sx={{ width: 70, height: 70 }}/></TableCell>
    <TableCell align="left">{item.collectionName || item.trackName}</TableCell>
    <TableCell align="left">{item.artistName}</TableCell>
    <TableCell align="left"><IconButton href={item.previewUrl || item.trackViewUrl || item.collectionViewUrl}><LaunchIcon/></IconButton></TableCell>
  </TableRow>)
}
export default SearchResults;