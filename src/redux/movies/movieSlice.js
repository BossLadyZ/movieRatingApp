import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',
    async () => {
        const movieText = 'Harry';
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&s=${movieText}&type=movie`
        )
            .catch((err) => {
                console.log('Err :', err);
            });
        return response.data;
    });

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows',
    async () => {
        const seriesText = 'Friends';
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&s=${seriesText}&type=series`
        )
            .catch((err) => {
                console.log('Err :', err);
            });
        return response.data;
    });

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail',
    async (id) => {
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&i=${id}&Plot=full`
        )
            .catch((err) => {
                console.log('Err :', err);
            });
        return response.data;
    });

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log('pending');
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('Fulfiled');
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('rejected');
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('Fulfiled');
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log('Fulfiled');
            return { ...state, selectedMovieOrShow: payload };
        },
    }
});

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;