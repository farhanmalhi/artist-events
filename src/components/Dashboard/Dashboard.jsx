import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import './Dashboard.scss';
import { useDispatch } from 'react-redux';
import {
    getUser,
    getEvents,
    setUserFetching,
    clearState,
} from './DashboardSlice';
import loadingIcon from '../../assets/loadingIcon.gif';
import CrossIcon from '../../assets/cross.svg';
import ProfileCard from './Profile-Card/ProfileCard';
import EventsPage from './Event-Page/Events-Page';

const Dashboard = () => {
    const { userIsFetching, userData } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const [artist, setArtist] = useState(null);

    const sendQuery = (query) => {
        dispatch(getUser(query));
    };
    useEffect(() => {
        setSearch(
            localStorage.getItem('artistSearch')
                ? localStorage.getItem('artistSearch')
                : ''
        );
        setArtist(JSON.parse(localStorage.getItem('selectedArtist')));
    }, []);

    const delayedQuery = useRef(debounce((q) => sendQuery(q), 500)).current;
    const handleSearch = (e) => {
        e.preventDefault();
        localStorage.setItem('artistSearch', e.target.value);
        localStorage.setItem('eventsData', JSON.stringify(new Array()));
        setArtist('');
        localStorage.setItem('selectedArtist', JSON.stringify({}));
        if (e.target.value.length === 0) {
            reset();
        } else {
            dispatch(setUserFetching());
            delayedQuery(e.target.value);
            setSearch(e.target.value);
        }
    };

    const selectArtist = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        if (data?.name !== artist?.name) {
            setArtist(data);
            localStorage.setItem('selectedArtist', JSON.stringify(data));
            dispatch(getEvents([data.name]));
        }
    };
    const reset = () => {
        setSearch('');
        setArtist('');
        dispatch(clearState());
    };
    return (
        <>
            <div className="w-8/12 mx-auto relative h-screen flex flex-col justify-start artist">
                <div
                    className={
                        'relative flex top-96 w-full transition duration-500 ease-in-out input-style ' +
            (search?.length > 0 ? 'move translate-y-80' : 'translate-x-0')
                    }
                >
                    <input
                        value={search}
                        className="relative top-0  w-full h-10 shadow py-3 pl-3 pr-10 custom-border-style"
                        placeholder="Search Artist"
                        onChange={handleSearch}
                    />
                    <div className="absolute right-3 top-2">
                        {userIsFetching ? (
                            <img key="122" src={loadingIcon} className="w-6 h-6 " />
                        ) : (
                            [
                                search.length > 0 ? (
                                    <img
                                        key="12"
                                        src={CrossIcon}
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={reset}
                                    />
                                ) : (
                                    <svg
                                        className="w-6 h-6 "
                                        key="121"
                                        enableBackground="new 0 0 50 50"
                                        height="50px"
                                        id="Layer_1"
                                        version="1.1"
                                        viewBox="0 0 50 50"
                                        width="50px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect fill="none" height="50" width="50" />
                                        <circle
                                            cx="21"
                                            cy="20"
                                            fill="none"
                                            r="16"
                                            stroke="#000000"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        />
                                        <line
                                            fill="none"
                                            stroke="#000000"
                                            strokeMiterlimit="10"
                                            strokeWidth="4"
                                            x1="32.229"
                                            x2="45.5"
                                            y1="32.229"
                                            y2="45.5"
                                        />
                                    </svg>
                                ),
                            ]
                        )}
                    </div>
                </div>
                <div
                    className={
                        'flex flex-col mt-10 relative ' +
            (search.length > 0 ? 'transition-cards' : ' show-listing')
                    }
                >
                    <div className="text-left pb-1">
                        <p>
              Search Result for <strong>{search}</strong>
                        </p>
                    </div>

                    <div>
                        <div className="card-main w-full flex flex-wrap justify-between ">
                            <ProfileCard
                                user={userData}
                                artist={artist}
                                userIsFetching={userIsFetching}
                                onArtistSelect={selectArtist}
                            ></ProfileCard>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'w-full mx-auto relative h-screen flex flex-col justify-start event ' +
            (artist?.name && search.length > 0
                ? 'transition-cards'
                : ' show-listing')
                    }
                >
                    <EventsPage parentSearch={search} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
