import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Events-Page.scss';
import { useDispatch } from 'react-redux';
import { getEvents } from '../DashboardSlice';
import EventCard from '../Event-Card/EventCard';
import SearchBar from '../Search-Bar/SearchBar';
import { format,isAfter,isToday } from 'date-fns';
import Loader from 'react-loader-spinner';
import toast from 'react-hot-toast';


const EventsPage = ({parentSearch}) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [eventSearch,setEventSearch]= useState(''); 

    const {  userData,eventsData,eventsIsFetching } = useSelector(state=>state.dashboard);
    const startDateHandler=(e)=>{
        e.preventDefault();
        setStartDate(format(new Date(e.target.value),'yyyy-MM-dd'));
        if(endDate){
            dispatch(getEvents([userData.name,format(new Date(e.target.value),'yyyy-MM-dd'),endDate]));
        }else{
            dispatch(getEvents([userData.name,format(new Date(e.target.value),'yyyy-MM-dd')]));
        }   
    };
    useEffect(() => {
        if(parentSearch.length===0){
            setStartDate('');
            setEndDate('');
            setEventSearch('');
        }
    }, [parentSearch]);
    const handleEventSearch= (e)=>{
        e.preventDefault();
        if(e.target.value){
            setEventSearch(e.target.value);
        }else{
            setEventSearch('');
        }
    };
    const endDateHandler=(e)=>{
        e.preventDefault();
        
        if(startDate.length>0){
            setEndDate( format( new Date(e.target.value),'yyyy-MM-dd'));
            dispatch(getEvents([userData.name,startDate,format( new Date(e.target.value),'yyyy-MM-dd')]));    
        }else{
            toast.error('Please Select From Date');
        }

    };

    return(<>
        <div className="my-6 flex flex-wrap justify-between">
            <SearchBar searchHandler={handleEventSearch} searchValue={eventSearch} placeholderText="Search Event"/>
                        
            <div className="flex w-4/12 input-style shadow">
                <span className="h-10 w-12 box shadow">From</span>
               
                <input
                    key='1'
                    type="date"
                    value={startDate}
                    max={endDate}

                    onChange={startDateHandler}
                                
                    className="relative  h-10 shadow py-3 pl-1 pr-4"
                />
                <span className="h-10 w-10 box shadow">To</span>
                <input
                    key='2'
                    type="date"
                    min={startDate}
                    className="relative  h-10 shadow py-3 pl-1 pr-4"
                    onChange={endDateHandler}
                    value={endDate}
                />
            </div>
        </div>
        {eventsIsFetching &&<div className="flex items-center justify-center h-screen w-full z-10 background-loader">
            <Loader type="BallTriangle" color="#009688" height={100} width={100} />
        </div>}
        {eventSearch && <div className="text-left">
            <p>Search result for <strong>{eventSearch}</strong></p>
        </div>}   
        <div className="my-6 text-left">
            <p><strong> {eventsData && eventsData?.filter(data=>
                data.title.toLowerCase().includes(eventSearch.toLowerCase()) || data.description.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.name.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.city.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.country.toLowerCase().includes(eventSearch.toLowerCase())
            )?.length}</strong>{startDate && (isAfter(new Date(startDate), new Date()) || isToday(new Date(startDate), new Date())) ?' Upcoming':''} Event{eventsData && eventsData?.filter(data=>
                data.title.toLowerCase().includes(eventSearch.toLowerCase()) || data.description.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.name.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.city.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.country.toLowerCase().includes(eventSearch.toLowerCase())
            )?.length===1?'':'s'}</p>
        </div>
        <div className="p-10 pt-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5 ">
            {eventsData && eventsData?.filter(data=>
                data.title.toLowerCase().includes(eventSearch.toLowerCase()) || data.description.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.name.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.city.toLowerCase().includes(eventSearch.toLowerCase()) || data?.venue?.country.toLowerCase().includes(eventSearch.toLowerCase())
            )?.map(data=>{ 
                return( <EventCard key={data.id} eventDetail={data}/>);
            })}
                        
        </div>
            
    </>);
};



export default EventsPage;
