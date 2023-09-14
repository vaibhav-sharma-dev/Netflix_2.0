import React from "react"
import "./HomeScreen.css"
import Navbar from "../components/Navbar/Navbar"
import Banner from "../components/Banner/Banner"
import Requests from '../Requests';
import Row from '../components/Rows/Row';

export default function HomeScreen() {
    return (
        <div className="home_screen">
            <Navbar />
            <Banner />

            <Row 
                title="Netflix Originals"
                fetchUrl={Requests.fetchNetflix0riginals}
                isLargeRow
            />
            <Row 
                title="Trending Now"
                fetchUrl={Requests.fetchTrending}
            />
            <Row 
                title="Top Rated"
                fetchUrl={Requests.fetchTopRated}
            />
            <Row 
                title="Action Movies"
                fetchUrl={Requests.fetchActionMovies}
            />
            <Row 
                title="Comendy Movies"
                fetchUrl={Requests.fetchComedyMovies}
            />
            <Row 
                title="Horror Movies"
                fetchUrl={Requests.fetchHorrorMovies}
            />
            <Row 
                title="Romance Movies"
                fetchUrl={Requests.fetchRomanceMovies}
            />
            <Row 
                title="Documentaries"
                fetchUrl={Requests.fetchDocumentaries}
            />
        </div>
    )
}