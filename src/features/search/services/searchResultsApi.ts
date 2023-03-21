import axios from "axios";

async function searchResultsApi(searchTerm: string) {
    return axios.get(`https://itunes.apple.com/search?term=${searchTerm}`);
}

export default searchResultsApi;
