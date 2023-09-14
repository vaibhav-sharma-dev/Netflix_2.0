import React from "react";
import "./Banner.css";
import axios from "../../axios";
import Requests from "../../Requests";


export default function Banner() {

    const [movie, setMovie] = React.useState([])

    const truncate = (string, n) => {  /* put "..." if description goes too long */
        return string?.length > n ? string.substr(0, n-1) + "..." : string
    }

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(Requests.fetchNetflix0riginals); 

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );

            return request;
        }

        fetchData();
    }, [])


    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>

                <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
            </div>

            <div className="banner_fade_bottom" />
        </header>
    )
}

