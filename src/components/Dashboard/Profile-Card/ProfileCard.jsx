import React from 'react';
import './ProfileCard.scss';

const ProfileCard = ({user,artist,onArtistSelect}) => {

    if(user){
        return(
            <div data-testid={'user-'+user.name} className={'card cursor-pointer ' + (user?.name === artist?.name?'focus-card':'')} onClick={(e)=>onArtistSelect(e,user)}>
                <div className="first-info">
                    <img src={user && user?.image_url?user?.image_url:'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'} />
                    <div className="profile-info">
                        <h1 className='text-left'><strong>{user?user.name:''}</strong></h1>
                        <a target="_blank" className="text-left flex z-1000 hover:underline text-gray-600" href={user.facebook_page_url} rel="noreferrer">
                            {user?user.facebook_page_url:''} 
                        </a>
                    </div>
                </div>
            </div>
                        
        );
    }else{
        return(<><h1>No Result Found!</h1></>);
    }
};


export default ProfileCard;
