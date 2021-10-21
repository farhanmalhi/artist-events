import React, { useEffect } from 'react';
import './ProfileCard.scss';
const ProfileCard = ({ user, artist, onArtistSelect,userIsFetching }) => {
    
    useEffect(() => {
        localStorage.setItem('artist', JSON.stringify(user));
    }, [user]);
    const navigateToUrl = (e) => {
        e.stopPropagation();
    };
    if (user) {
        return (
            <div
                data-testid={'user-' + user.name}
                className={
                    'card cursor-pointer ' +
          (user?.name === artist?.name ? 'focus-card' : '')
                }
                onClick={(e) => onArtistSelect(e, user)}
            >
                <div className="first-info">
                    {userIsFetching?    <img src='https://ionicframework.com/docs/demos/api/avatar/avatar.svg'/>:
                        <img
                            src={
                                user && user?.image_url
                                    ? user?.image_url
                                    : 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'
                            }
                        />}
                    <div className="profile-info">
                        {userIsFetching?<div className="title br animate-pulse flex bg-gray-500"></div>:
                     
                            <h4 className="text-left">
                                <strong>{user ? user.name : ''}</strong>
                            </h4>}
                        {userIsFetching?<div className="description br animate-pulse bg-gray-400"></div>:
                   
                            <a
                                target="_blank"
                                className="text-left flex z-1000 hover:underline text-gray-600"
                                onClick={navigateToUrl}
                                href={user.facebook_page_url}
                                rel="noreferrer"
                            >
                                {user ? user.facebook_page_url : ''}
                            </a>}
                       
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>No Result Found!</h1>
            </>
        );
    }
};

export default ProfileCard;
