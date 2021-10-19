import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk(
    '/artists',
    async (artistName) => {
        artistName= artistName.replace(/\//g, '%252F');
        artistName= artistName.replace(/\?/g, '%253F');
        artistName= artistName.replace(/\*/g, '%252A');
        artistName= artistName.replace(/"/g, '%27C');
        
        const response = await axios.get(`/artists/${artistName}?app_id=foo`);
        console.log('res',response);
        return response.data;
    }
);

export const getEvents = createAsyncThunk(
    '/artists/events',
    async (data) => {
        data[0]=data[0].replace(/\//g, '%252F');
        data[0]=data[0].replace(/\?/g, '%253F');
        data[0]=data[0].replace(/\*/g, '%252A');
        data[0]=data[0].replace(/"/g, '%27C');
        
        if(data.length===1){
            const response = await axios.get(`/artists/${data[0]}/events?app_id=foo`);
            return response.data;
            
        }  else if(data.length===2){
            const response = await axios.get(`/artists/${data[0]}/events?app_id=foo&date=${data[1]}`);
            return response.data;         
        }
        else{
            const response = await axios.get(`/artists/${data[0]}/events?app_id=foo&date=${data[1]}%2C${data[2]}`);
            return response.data;
  
        }
    }
);

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        userData:JSON.parse(localStorage.getItem('artist')),
        userIsFetching:false,
        userSuccess:false,
        eventsData:JSON.parse(localStorage.getItem('eventsData')),
        eventsIsFetching:false,
        eventsSuccess:false,
        isError:false,
        errorMessage:null,
    },
    reducers: {
        clearState: (state) => {
            state.userData = {};
            state.userIsFetching = false;
            state.userSuccess = false;
            state.isError = false;
            state.errorMessage = null;
            return state;
        },
        setUserFetching: (state) => {
            state.userIsFetching = true;
            return state;
        },
        setPreviousState: (state,{payload}) => {
            console.log('Payload',payload);
            return state;
        },
    },
    extraReducers: {
        [getUser.fulfilled]: (state,{payload}) => {
            state.userData=payload;
            state.userIsFetching = false;
            state.isSuccess = true;
        },
        [getUser.pending]: (state) => {
            state.userIsFetching = true;
        },
        [getUser.rejected]: (state) => {
            state.userIsFetching = false;
            state.isError = true;
            state.errorMessage = 'Error From Swagger';
        },
        [getEvents.fulfilled]: (state,{payload}) => {
            state.eventsData=payload;
            state.eventsIsFetching = false;
            state.eventsSuccess = true;
        },
        [getEvents.pending]: (state) => {
            state.eventsIsFetching = true;
        },
        [getEvents.rejected]: (state) => {
            state.eventsIsFetching = false;
            state.isError = true;
            state.errorMessage = 'Error From Swagger';
        },
        
    },
});

export const { clearState,setUserFetching,setPreviousState } = dashboardSlice.actions;

export const DashboardSelector = (state) => state;