import React, { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import movieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../redux/movies/movieSlice';


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch]);
  return (
    <div>
      <div className="banner-image"></div>
      <MovieListing />
    </div>
  );
};

export default Home;