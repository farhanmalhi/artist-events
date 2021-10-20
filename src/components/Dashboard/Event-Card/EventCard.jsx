import React from "react";
import locationGif from "../../../assets/location.gif";
import calendarGif from "../../../assets/calendar.gif";

import format from "date-fns/format";

import "./EventCard.scss";

const EventCard = ({ eventDetail }) => {
  if (eventDetail) {
    return (
      <div className="relative mb-5 transform transition duration-500 hover:scale-110">
        <div className="py-3 sm:max-w-xl sm:mx-auto round hover:border h-full">
          <div className="shadow rounded p-4 bg-white relative custom-height h-full">
            <div className="w-full h-full block">
              <div className="flex items-center border-b-2 mb-2 py-2 custom-color">
                <div>
                  <div className="font-medium text-left">
                    <h4>
                      <strong>
                        {eventDetail?.title.length > 0
                          ? eventDetail?.title
                          : "None"}
                      </strong>
                    </h4>
                  </div>
                  <div className="text-gray-600 text-sm ">
                    <p className="text-gray-400  flex flex-wrap text-left truncate-custom">
                      {" "}
                      {eventDetail?.description.length > 0
                        ? eventDetail?.description
                        : "None"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-end">
                  <img src={calendarGif} className="h-5 w-5" />

                  <p className="ml-1 text-sm mb-4 text-left">
                    {format(new Date(eventDetail?.datetime), "d, MMMM yyyy")}
                  </p>
                </div>
                <div className="flex flex-end">
                  <img src={locationGif} className="h-5 w-5" />

                  <p className="ml-1 text-left text-sm mb-4">
                    {eventDetail?.venue?.name}, {eventDetail?.venue?.city},{" "}
                    {eventDetail?.venue?.country}
                  </p>
                </div>
                <div className="flex  justify-center">
                  <a
                    target="_blank"
                    className="flex cursor-pointer hover:underline custom-color"
                    href={eventDetail?.url}
                    rel="noreferrer"
                  >
                    <p>View Details </p>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="external-link-alt"
                      className="ml-1 mt-1 w-3 h-3"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1>No Data Found!</h1>
      </>
    );
  }
};

export default EventCard;
