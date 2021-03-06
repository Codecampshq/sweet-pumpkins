// Movies.js

import React from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";

class Movies extends React.Component {
  state = {
    movies: []
  };

  componentDidMount() {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process
      .env
      .REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.storeMovies(data))
      .catch(error => console.log(error));
  }

  storeMovies = data => {
    const movies = data.results.map(result => {
      const {
        vote_count,
        id,
        genre_ids,
        poster_path,
        title,
        vote_average
      } = result;
      return { vote_count, id, genre_ids, poster_path, title, vote_average };
    });

    this.setState({ movies });
  };

  render() {
    return (
      <section className="movies">
        <ul>
          {this.state.movies.map((movie, index) => (
            <MovieListItem key={index.toString()} movie={movie} />
          ))}
        </ul>
      </section>
    );
  }
}

export default Movies;
