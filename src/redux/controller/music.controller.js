import { API_HOST } from "../../constants/pathName"
import axios from 'axios';

export const musicController = {
    getAllAlbum() {
        const url = API_HOST + '/get-top100';
        return axios.get(url);
    },
    getHome() {
        const url = API_HOST + '/get-home';
        return axios.get(url);
    },
    getChart() {
        const url = API_HOST + '/get-chart';
        return axios.get(url);
    },
    getPlaylist(id) {
        const url = `${API_HOST}/get-playlist/${id}`;
        return axios.get(url)
    },
    getSong(id) {
        const url = `${API_HOST}/get-song/${id}`;
        return axios.get(url)
    },
    getInfoSong(id) {
        const url = `${API_HOST}/get-info-song/${id}`;
        return axios.get(url)
    },
    getLyrics(id) {
        const url = `${API_HOST}/get-lyrics/${id}`;
        return axios.get(url)
    },
    searchSong(key) {
        const url = `${API_HOST}/search-song/${key}`;
        return axios.get(url);
    },
    searchRecommendSong(key) {
        const url = `${API_HOST}/search-song/${key}`;
        return axios.get(url);
    },
    searchSongPage(key) {
        const url = `${API_HOST}/search-song/${key}`;
        return axios.get(url);
    },
    searchByArtist(key) {
        const url = `${API_HOST}/search-song/${key}`;
        return axios.get(url);
    },
    getCurrentList(id) {
        const url = `${API_HOST}/get-current-tracks/${id}`
        return axios.get(url)
    }
    ,
    addCurrentList(title, artist, image, userId, encodeId) {
        const url = API_HOST + '/add-song-currentlist'
        const payload = {
            title: title,
            artist: artist,
            image: image,
            userId: userId,
            encodeId: encodeId
        }

        return axios.post(url, payload)
    },
    getFavouriteList(id) {
        const url = `${API_HOST}/get-all-favourite/${id}`
        return axios.get(url)
    },
    addFavouriteList(title, artist, image, userId, encodeId) {
        const url = API_HOST + '/add-favourite-item'
        const payload = {
            title: title,
            artist: artist,
            image: image,
            userId: userId,
            encodeId: encodeId
        }

        return axios.post(url, payload)
    },
    removeFavouriteList(encodeId, userId) {
        const url = API_HOST + '/delete-favourite-item'
        const payload = {
            userId: userId,
            encodeId: encodeId
        }

        return axios.post(url, payload)
    },
    getHexColor(thumbnailM) {
        const url = API_HOST + '/get-hex-color'
        const payload = {
            thumbnailM: thumbnailM
        }

        return axios.post(url, payload)
    }
}