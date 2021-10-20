import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Events-Page.scss";
import { useDispatch } from "react-redux";
import { getEvents } from "../DashboardSlice";
import EventCard from "../Event-Card/EventCard";
import SearchBar from "../Search-Bar/SearchBar";
import { format, isAfter, isToday } from "date-fns";
import Loader from "react-loader-spinner";
import toast from "react-hot-toast";

const EventsPage = ({ parentSearch }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventSearch, setEventSearch] = useState("");

  const { userData, eventsData, eventsIsFetching } = useSelector(
    (state) => state.dashboard
  );
  const startDateHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "startDate",
      format(new Date(e.target.value), "yyyy-MM-dd")
    );
    setStartDate(format(new Date(e.target.value), "yyyy-MM-dd"));
    if (endDate) {
      dispatch(
        getEvents([
          userData.name,
          format(new Date(e.target.value), "yyyy-MM-dd"),
          endDate,
        ])
      );
    } else {
      dispatch(
        getEvents([
          userData.name,
          format(new Date(e.target.value), "yyyy-MM-dd"),
        ])
      );
    }
  };
  useEffect(() => {
    setEndDate(
      localStorage.getItem("endDate")
        ? format(new Date(localStorage.getItem("endDate"), "yyyy-MM-dd"))
        : ""
    );
    setStartDate(
      localStorage.getItem("startDate")
        ? format(new Date(localStorage.getItem("startDate")), "yyyy-MM-dd")
        : ""
    );
    setEventSearch(
      localStorage.getItem("eventSearch")
        ? localStorage.getItem("eventSearch")
        : ""
    );
  }, []);
  useEffect(() => {
    if (localStorage.getItem("artistSearch") === 0) {
      setStartDate("");
      setEndDate("");
      setEventSearch("");
    }
  }, [parentSearch]);
  const handleEventSearch = (e) => {
    e.preventDefault();
    localStorage.setItem("eventSearch", e.target.value);
    if (e.target.value) {
      setEventSearch(e.target.value);
    } else {
      setEventSearch("");
    }
  };
  useEffect(() => {
    localStorage.setItem("eventsData", JSON.stringify(eventsData));
  }, [eventsData]);
  const endDateHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "endDate",
      format(new Date(e.target.value), "yyyy-MM-dd")
    );
    if (startDate.length > 0) {
      setEndDate(format(new Date(e.target.value), "yyyy-MM-dd"));
      dispatch(
        getEvents([
          userData.name,
          startDate,
          format(new Date(e.target.value), "yyyy-MM-dd"),
        ])
      );
    } else {
      toast.error("Please Select From Date");
    }
  };

  return (
    <>
      {/* <div className="my-6 flex flex-wrap justify-between">
        <SearchBar
          searchHandler={handleEventSearch}
          searchValue={eventSearch}
          placeholderText="Search Event"
        />

        <div className="flex w-4/12 input-style shadow">
          <span className="h-10 w-12 box shadow">From</span>

          <input
            key="1"
            type="date"
            value={startDate}
            max={endDate}
            onChange={startDateHandler}
            className="relative  h-10 shadow py-3 pl-1 pr-4"
          />
          <span className="h-10 w-10 box shadow">To</span>
          <input
            key="2"
            type="date"
            min={startDate}
            className="relative  h-10 shadow py-3 pl-1 pr-4"
            onChange={endDateHandler}
            value={endDate}
          />
        </div>
      </div> */}
      <div className="mt-6 flex flex-wrap justify-between">
        <SearchBar
          searchHandler={handleEventSearch}
          searchValue={eventSearch}
          placeholderText="Search Event"
        />
        <div>
          <label className="mr-2">Start Date</label>
          <input
            key="1"
            id="startDate"
            placeholder="Start Date"
            type="date"
            value={startDate}
            max={endDate}
            onChange={startDateHandler}
            className="relative h-10 shadow py-3 pl-1 pr-4 custom-border-style"
          />
        </div>
        <div>
          <label className="mr-2">End Date</label>
          <input
            id="endDate"
            key="2"
            placeholder="End Date"
            type="date"
            min={startDate}
            className="relative  h-10 shadow  pl-1 pr-4 custom-border-style"
            onChange={endDateHandler}
            value={endDate}
          />
        </div>
      </div>
      {eventsIsFetching && (
        <div className="flex items-center justify-center h-screen w-full z-10 background-loader">
          <Loader
            type="BallTriangle"
            color="#009688"
            height={100}
            width={100}
          />
        </div>
      )}
      {eventSearch && (
        <div className="text-left">
          <p>
            Search result for <strong>{eventSearch}</strong>
          </p>
        </div>
      )}
      <div className="pb-2 pt-2 text-left">
        <p>
          <strong>
            {" "}
            {eventsData &&
              eventsData?.filter(
                (data) =>
                  data.title
                    .toLowerCase()
                    .includes(eventSearch.toLowerCase()) ||
                  data.description
                    .toLowerCase()
                    .includes(eventSearch.toLowerCase()) ||
                  data?.venue?.name
                    .toLowerCase()
                    .includes(eventSearch.toLowerCase()) ||
                  data?.venue?.city
                    .toLowerCase()
                    .includes(eventSearch.toLowerCase()) ||
                  data?.venue?.country
                    .toLowerCase()
                    .includes(eventSearch.toLowerCase())
              )?.length}
          </strong>
          {startDate &&
          (isAfter(new Date(startDate), new Date()) ||
            isToday(new Date(startDate), new Date()))
            ? " Upcoming"
            : ""}{" "}
          Event
          {eventsData &&
          eventsData?.filter(
            (data) =>
              data.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
              data.description
                .toLowerCase()
                .includes(eventSearch.toLowerCase()) ||
              data?.venue?.name
                .toLowerCase()
                .includes(eventSearch.toLowerCase()) ||
              data?.venue?.city
                .toLowerCase()
                .includes(eventSearch.toLowerCase()) ||
              data?.venue?.country
                .toLowerCase()
                .includes(eventSearch.toLowerCase())
          )?.length === 1
            ? ""
            : "s"}
        </p>
      </div>
      <div className=" pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
        {eventsData &&
          eventsData
            ?.filter(
              (data) =>
                data.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
                data.description
                  .toLowerCase()
                  .includes(eventSearch.toLowerCase()) ||
                data?.venue?.name
                  .toLowerCase()
                  .includes(eventSearch.toLowerCase()) ||
                data?.venue?.city
                  .toLowerCase()
                  .includes(eventSearch.toLowerCase()) ||
                data?.venue?.country
                  .toLowerCase()
                  .includes(eventSearch.toLowerCase())
            )
            ?.map((data) => {
              return <EventCard key={data.id} eventDetail={data} />;
            })}
      </div>
    </>
  );
};

export default EventsPage;
