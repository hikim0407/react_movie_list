import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import styles from "./Detail.module.css";
import arrow from "../arrow.png";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getMovie = async() => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    }

    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
                ) : (
                <div className={styles.movie}>
                    <div className={styles.movie__img__div}>
                        <img src={movie.large_cover_image} alt={movie.title} className={styles.movie__img}></img>
                    </div>
                    <div className={styles.movie__info__div}>
                        <h2>
                            {movie.title_long}
                        </h2>
                        <p>rating : {movie.rating}</p>
                        <p>runtime : {movie.runtime}</p>
                        <ul>
                            {movie.genres.map(g => (<li key={g}>{g}</li>))}
                        </ul>
                        <p>{movie.description_intro}</p>
                    </div>
                    <span className={styles.go__home}>
                        <Link to="/">
                            <img src={arrow} className={styles.arrow}></img>
                        </Link>
                    </span>
                </div>
                )
            }
            
        </div>
    )
};

export default Detail;