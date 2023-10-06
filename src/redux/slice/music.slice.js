import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { musicController } from "../controller/music.controller";

export const initialState = {
    status: 'idle',
}

export const getTop100 = createAsyncThunk('getTop100', async () => {
    try {
        const getAll = await musicController.getAllAlbum();
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getHome = createAsyncThunk('getHome', async () => {
    try {
        const getAll = await musicController.getHome();
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getChart = createAsyncThunk('getChart', async () => {
    try {
        const getAll = await musicController.getChart();
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getPlaylist = createAsyncThunk('getPlaylist', async (data) => {
    try {
        const { id } = data;
        const getAll = await musicController.getPlaylist(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getSong = createAsyncThunk('getSong', async (data) => {
    try {
        const { id } = data;
        const getAll = await musicController.getSong(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getInfoSong = createAsyncThunk('getInfoSong', async (data) => {
    try {
        const { id } = data;
        const getAll = await musicController.getInfoSong(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getLyricsSong = createAsyncThunk('getLyricsSong', async (data) => {
    try {
        const { id } = data;
        const getAll = await musicController.getLyrics(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getFavouriteList = createAsyncThunk('getFavouriteList', async (data) => {
    try {
        const { id } = data;
        const getAll = await musicController.getFavouriteList(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getCurrentList = createAsyncThunk('getCurrentList', async (data) => {
    try {
        const { id } = data;
        const getAll = await musicController.getCurrentList(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const searchSong = createAsyncThunk('searchSong', async (data) => {
    try {
        const { key } = data;
        const getAll = await musicController.searchSong(key);
        return getAll;
    }
    catch (error) {
        return error;
    }
})
export const searchRecommendSong = createAsyncThunk('searchRecommendSong', async (data) => {
    try {
        const { key } = data;
        const getAll = await musicController.searchRecommendSong(key);
        return getAll;
    }
    catch (error) {
        return error;
    }
})
export const searchSongPage = createAsyncThunk('searchSongPage', async (data) => {
    try {
        const { key } = data;
        const getAll = await musicController.searchSongPage(key);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const searchByArtist = createAsyncThunk('searchByArtist', async (data) => {
    try {
        const { key } = data;
        const getAll = await musicController.searchByArtist(key);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const addCurrentList = createAsyncThunk('addCurrentList', async (data) => {
    try {
        const { title, artist, image, userId, encodeId } = data;
        const getAll = await musicController.addCurrentList(title, artist, image, userId, encodeId);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const addFavouriteList = createAsyncThunk('addFavouriteList', async (data) => {
    try {
        const { title, artist, image, userId, encodeId } = data;
        const getAll = await musicController.addFavouriteList(title, artist, image, userId, encodeId);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const removeFavouriteList = createAsyncThunk('removeFavouriteList', async (data) => {
    try {
        const { encodeId, userId } = data;
        const getAll = await musicController.removeFavouriteList(encodeId, userId);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getHexColor = createAsyncThunk('getHexColor', async (data) => {
    try {
        const { thumbnailM } = data;
        const getAll = await musicController.getHexColor(thumbnailM)
        return getAll;
    }
    catch (error) {
        return error;
    }
})


export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTop100.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getTop100.fulfilled, (state, action) => {
            state.status = 'success';
            state.musicList = action.payload;
        })
        builder.addCase(getTop100.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getHome.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getHome.fulfilled, (state, action) => {
            state.status = 'success';
            state.home = action.payload;
        })
        builder.addCase(getHome.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getChart.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getChart.fulfilled, (state, action) => {
            state.status = 'success';
            state.chart = action.payload;
        })
        builder.addCase(getChart.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getPlaylist.pending, (state) => {
            state.status = 'loading';
            state.playlist = ''
        })
        builder.addCase(getPlaylist.fulfilled, (state, action) => {
            state.status = 'success';
            state.playlist = action.payload;
        })
        builder.addCase(getPlaylist.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getSong.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getSong.fulfilled, (state, action) => {
            state.status = 'success';
            state.song = action.payload;
        })
        builder.addCase(getSong.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getInfoSong.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getInfoSong.fulfilled, (state, action) => {
            state.status = 'success';
            state.songInfo = action.payload;
        })
        builder.addCase(getInfoSong.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getLyricsSong.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getLyricsSong.fulfilled, (state, action) => {
            state.status = 'success';
            state.songLyrics = action.payload;
        })
        builder.addCase(getLyricsSong.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getCurrentList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getCurrentList.fulfilled, (state, action) => {
            state.status = 'success';
            state.currentList = action.payload;
        })
        builder.addCase(getCurrentList.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getFavouriteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getFavouriteList.fulfilled, (state, action) => {
            state.status = 'success';
            state.favouriteList = action.payload;
        })
        builder.addCase(getFavouriteList.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(searchSong.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(searchSong.fulfilled, (state, action) => {
            state.status = 'success';
            state.search = action.payload;
        })
        builder.addCase(searchSong.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(searchRecommendSong.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(searchRecommendSong.fulfilled, (state, action) => {
            state.status = 'success';
            state.searchRecommend = action.payload;
        })
        builder.addCase(searchRecommendSong.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(searchSongPage.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(searchSongPage.fulfilled, (state, action) => {
            state.status = 'success';
            state.searchPage = action.payload;
        })
        builder.addCase(searchSongPage.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(searchByArtist.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(searchByArtist.fulfilled, (state, action) => {
            state.status = 'success';
            state.searchByArtist = action.payload;
        })
        builder.addCase(searchByArtist.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(addCurrentList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addCurrentList.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(addCurrentList.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(addFavouriteList.pending, (state) => {
            state.status = 'loading';
            state.statusFav = 'loading'
        })
        builder.addCase(addFavouriteList.fulfilled, (state, action) => {
            state.status = 'success';
            state.statusFav = 'success'
        })
        builder.addCase(addFavouriteList.rejected, (state) => {
            state.status = 'failed'
            state.statusFav = 'success'
        })

        builder.addCase(removeFavouriteList.pending, (state) => {
            state.status = 'loading';
            state.statusRemove = 'loading'
        })
        builder.addCase(removeFavouriteList.fulfilled, (state, action) => {
            state.status = 'success';
            state.statusRemove = 'success'
        })
        builder.addCase(removeFavouriteList.rejected, (state) => {
            state.status = 'failed'
            state.statusRemove = 'success'
        })

        builder.addCase(getHexColor.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getHexColor.fulfilled, (state, action) => {
            state.status = 'success';
            state.hexColor = action.payload
        })
        builder.addCase(getHexColor.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default musicSlice.reducer;