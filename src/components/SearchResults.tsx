import PropTypes from "../app/PropTypes";
import "../App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { SetStateAction, useEffect, useState } from "react";
import { setSourceMapRange } from "typescript";
  const SearchResults = ({resData}:PropTypes) => {
    const [renderCount,setRenderCount]=useState(0);
    useEffect(()=>{
      setRenderCount(10);
    },[resData])
    const fetchData=()=>{
      setRenderCount(renderCount+10);
    }
    return (
      <InfiniteScroll
      dataLength={renderCount}
      next={fetchData}
      hasMore={renderCount<resData.length}
      loader={<h4>Loading more 10 items...</h4>}
    >
      { <table>
        <tbody>
          <tr>
            <th>Type</th>
            <th>Artist Name</th>
            <th>Link</th>
            <th>Image</th>
          </tr>
            {resData.slice(0,renderCount-1).map((item,id) =>  (
            <tr key={id}>
              <td>{item.wrapperType}</td>
              <td>{item.artistName}</td>
              <td><a href={item.previewUrl}>{item.previewUrl}</a></td>
              <td><img src={item.artworkUrl100}/></td>
            </tr> ))} 
        </tbody>
      </table> }
      </InfiniteScroll>
    );
  };
  export default SearchResults;