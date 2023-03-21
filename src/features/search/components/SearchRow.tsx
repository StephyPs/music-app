import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { IconButton } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
const SearchRow = ({ item }: any) => {
    return (<TableRow>
      <TableCell align="left"><Avatar src={item.artworkUrl100} sx={{ width: 70, height: 70 }}/></TableCell>
      <TableCell align="left">{item.collectionName || item.trackName}</TableCell>
      <TableCell align="left">{item.artistName}</TableCell>
      <TableCell align="left"><IconButton href={item.previewUrl || item.trackViewUrl || item.collectionViewUrl}><LaunchIcon/></IconButton></TableCell>
    </TableRow>)
  }
  export default SearchRow;