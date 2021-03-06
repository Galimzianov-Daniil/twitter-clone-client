import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS, CLEAR_ERRORS, STOP_LOADING_UI, SET_SCREAM, SUBMIT_COMMENT
} from "../types";

import axios from "axios";

export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get("/screams")
        .then(res => dispatch({ type: SET_SCREAMS, payload: res.data }))
        .catch(err => {
            dispatch({ type: SET_SCREAMS, payload: [] })
            console.log(err)
        })
}

export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/scream", newScream)
        .then(res => {
            dispatch({ type: POST_SCREAM, payload: res.data });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}

export const likeScream = (screamId) => dispatch => {
    axios.post(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({ type: LIKE_SCREAM, payload: res.data })
        })
        .catch(err => console.log(err))
}

export const unlikeScream = (screamId) => dispatch => {
    axios.post(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({ type: UNLIKE_SCREAM, payload: res.data })
        })
        .catch(err => console.log(err))
}

export const deleteScream = screamId => dispatch => {
    axios.post(`/scream/${screamId}/delete`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId })
        })
        .catch(err => console.log(err))
}

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/scream/${screamId}`)
        .then(res => dispatch({ type: SET_SCREAM, payload: res.data }))
        .catch(err => {
            debugger;
            console.log(err)
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
}

export const submitComment = (screamId, commentData) => dispatch => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({ type: SUBMIT_COMMENT, payload: res.data })
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}

export const getUserData = handle => dispatch => {
    dispatch({ type: LOADING_DATA })

    return axios.get(`/user/${handle}`)
        .then(res => {
            dispatch({ type: SET_SCREAMS, payload: res.data.screams })
            return new Promise(resolve => resolve(res.data.user));
        })
        .catch(err => {
            dispatch({ type: SET_SCREAMS, payload: null })
        })
}