import axios from "axios"

const instance = axios.create ({  /* add a url, so that everytime the request goes from here first */
    baseURL: "https://api.themoviedb.org/3"
});

export default instance;