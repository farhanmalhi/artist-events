import React from 'react';
import CrossIcon from '../../../assets/cross.svg';
import './SearchBar.scss';

const SearchBar = ({ searchValue, searchHandler, placeholderText }) => {
    return (
        <div className="relative flex w-4/12 input-style mb-2 custom-flex">
            <input
                value={searchValue}
                className="relative w-full h-10 shadow py-3 pl-3 pr-10 custom-border-style"
                onChange={searchHandler}
                placeholder={placeholderText}
            />
            <div className="absolute right-3 top-2">
                {searchValue?.length > 0 ? (
                    <img
                        key="12"
                        src={CrossIcon}
                        className="w-6 h-6 cursor-pointer"
                        onClick={(e) => searchHandler(e)}
                    />
                ) : (
                    <svg
                        className="w-6 h-6 "
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
                )}
            </div>
        </div>
    );
};

export default SearchBar;
