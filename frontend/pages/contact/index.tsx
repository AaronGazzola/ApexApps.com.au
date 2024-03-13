import React from "react";
import { Collapse } from "@mui/material";
import moment, { Moment } from "moment-timezone";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Meta from "../../components/Meta";
import SVG from "../../components/SVG";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  bookCall,
  getBookings,
  sendEmail,
} from "../../redux/users/users.slice";

const Index = () => {
  const dispatch = useAppDispatch();
  const { user, loading, bookings, alert, noUser, onTour } = useAppSelector(
    (state) => state.users
  );
  const [bookingTimes, setBookingTimes] = useState([] as Moment[]);

  const [lastBookingTodayHasPast, setLastBookingTodayHasPast] = useState(false);
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({
    name: {
      isValid: false,
      isTouched: false,
      value: "",
    },
    email: {
      isValid: false,
      isTouched: false,
      value: "",
    },
    projectTitle: {
      isValid: false,
      isTouched: false,
      value: "",
    },
    projectDescription: {
      isValid: false,
      isTouched: false,
      value: "",
    },
    contactMethod: {
      value: "zoom",
    },
    phone: {
      isValid: false,
      isTouched: false,
      value: "",
    },
    emailComments: {
      isValid: false,
      isTouched: false,
      value: "",
    },
    callTime: "",
  } as { [index: string]: any });
  const {
    name,
    email,
    projectTitle,
    projectDescription,
    contactMethod,
    phone,
    callTime,
    emailComments,
  } = formState;

  const formIsValid =
    name.isValid &&
    email.isValid &&
    ((contactMethod.value === "zoom" && callTime) ||
      (contactMethod.value === "phone" && phone.isValid && callTime) ||
      (contactMethod.value === "email" && emailComments.isValid));

  const changeHandler = (
    e: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let value = e.currentTarget.value;
    let id = e.currentTarget.id;
    let isValid = !!value;
    if (id.startsWith("method")) {
      value = id[6].toLocaleLowerCase() + id.slice(7);
      id = "contactMethod";
    }
    if (id === "phone")
      value =
        !isNaN(Number(value)) && !isNaN(parseFloat(value))
          ? value
          : phone.value;
    if (id === "email") isValid = /^\S+@\S+\.\S+$/.test(value);
    if (id === "phone") isValid = value.length >= 5;

    setFormState({
      ...formState,
      [id]: {
        ...formState[id],
        isValid,
        value,
      },
    });
  };
  const touchHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = e.currentTarget.id;
    setFormState({
      ...formState,
      [id]: {
        ...formState[id],
        isTouched: true,
      },
    });
  };

  const handleSelectTime = (callTime: string) => {
    setFormState({
      ...formState,
      callTime,
    });
  };
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const formData = {
      name: name.value,
      email: email.value,
      projectTitle: projectTitle.value,
      projectDescription: projectDescription.value,
      contactEmail: email.value,
    };
    if (contactMethod.value === "email") {
      dispatch(sendEmail({ ...formData, emailComments: emailComments.value }));
    } else {
      dispatch(
        bookCall({
          ...formData,
          contactMethod: contactMethod.value,
          phone: phone.value,
          callTime,
          userCallTime: moment(callTime, "HH:mm DD-MM-YYYY ZZ").format(
            "h:mma Do-MMM-YY"
          ),
          zoomName: email.value,
        })
      );
    }
  };

  useEffect(() => {
    if (user && !onTour)
      setFormState((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          value: user.userName,
          isValid: true,
        },
        email: {
          ...prev.email,
          value: user.email,
          isValid: true,
        },
        contactEmail: prev.useContactEmail
          ? { ...prev.email, value: user.email, isValid: true }
          : prev.contactEmail,
        zoomName: prev.useContactEmail
          ? { ...prev.email, value: user.email, isValid: true }
          : prev.zoomName,
      }));
  }, [user, dispatch, onTour]);

  useEffect(() => {
    // set Melbourne time
    const melbourneTime = moment.tz(moment(), "Australia/Melbourne").minute(0);

    // set melbourne time of bookings by hour
    let bookingHours = [8, 9, 10, 14, 15, 16, 19, 20];

    // if last booking for today is already passed, skip today

    const lastBookingHasPast =
      melbourneTime.hour() >= 22 ||
      melbourneTime.add(2, "h").hour() > bookingHours[bookingHours.length - 1];

    if (lastBookingHasPast) melbourneTime.add(1, "d");
    let melbourneBookingTimes: string[] = [];
    for (let i = 0; i < 3; i++) {
      bookingHours.forEach((hour) => {
        // if booking time is more that one hour in the future, add to end of array
        if (melbourneTime.hour(hour).unix() > moment().add(1, "h").unix()) {
          melbourneBookingTimes.push(
            melbourneTime.hour(hour).minute(0).format("HH:mm DD-MM-YYYY ZZ"),
            melbourneTime.hour(hour).minute(30).format("HH:mm DD-MM-YYYY ZZ")
          );
        }
      });
      // once all times are added, increment day by one
      melbourneTime.add(1, "d");
    }
    setBookingTimes(
      melbourneBookingTimes.map((time) => moment(time, "HH:mm DD-MM-YYYY ZZ"))
    );
    setLastBookingTodayHasPast(lastBookingHasPast);
  }, []);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  useEffect(() => {
    if (alert) setStep(1);
  }, [alert]);

  useEffect(() => {
    if (bookings?.length) {
      const bookingsUnix = bookings.map((booking) =>
        moment(booking.callTime).unix()
      );
      setBookingTimes((prev) =>
        prev.filter((bookingTime) => !bookingsUnix.includes(bookingTime.unix()))
      );
    }
  }, [bookings]);

  return (
    <>
      <Meta title="Contact Aaron | Apex Apps" />
      <h1 className="title">Contact</h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col item-center w-full items-center"
      >
        <div className="box w-full sm:max-w-lg relative">
          {!noUser && !user?.userName ? (
            <>
              <div className="skeleton w-full h-10 mt-5 mb-8"></div>
              <div className="skeleton w-full h-10 my-5"></div>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Name"
                value={name.value}
                validation
                isValid={name.isValid}
                helperText={
                  name.isTouched && !name.isValid
                    ? "Please enter your name"
                    : ""
                }
                label="Name"
                id="name"
                onChange={changeHandler}
                touchHandler={touchHandler}
                isTouched={name.isTouched}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email.value}
                validation
                isValid={email.isValid}
                helperText={
                  email.isTouched && !email.isValid
                    ? "Please enter a valid email address"
                    : ""
                }
                label="Email"
                id="email"
                onChange={changeHandler}
                touchHandler={touchHandler}
                isTouched={email.isTouched}
              />
            </>
          )}

          <Input
            type="text"
            placeholder="Project title (optional)"
            value={projectTitle.value}
            label="Project title"
            id="projectTitle"
            onChange={changeHandler}
            isTouched={projectTitle.isTouched}
            validation={false}
          />
          <Input
            type="textarea"
            placeholder="Project description (optional)"
            value={projectDescription.value}
            label="Project description"
            id="projectDescription"
            onChange={changeHandler}
            containerClasses="mb-2"
            validation={false}
          />

          <div className="flex justify-center w-full my-4 mb-6">
            <Input
              type="radio"
              value={contactMethod.value === "zoom" ? "zoom" : ""}
              label="Zoom"
              id="methodZoom"
              onChange={changeHandler}
              containerClasses="mr-4 w-min"
              validation={false}
            />
            <Input
              type="radio"
              value={contactMethod.value === "phone" ? "phone" : ""}
              label="Phone"
              id="methodPhone"
              onChange={changeHandler}
              containerClasses="mr-4 w-min"
              validation={false}
            />
            <Input
              type="radio"
              value={contactMethod.value === "email" ? "email" : ""}
              label="Email"
              id="methodEmail"
              onChange={changeHandler}
              containerClasses="mr-4 w-min"
              validation={false}
            />
          </div>

          <Collapse
            in={contactMethod.value === "phone"}
            timeout="auto"
            collapsedSize={0}
            style={{ width: "100%" }}
          >
            <Input
              type="text"
              placeholder="Phone number"
              value={phone.value}
              label="Phone number"
              id="phone"
              onChange={changeHandler}
              isTouched={phone.isTouched}
              isValid={phone.isValid}
              helperText={
                !phone.isValid && phone.isTouched
                  ? "Please enter a valid phone number"
                  : ""
              }
              touchHandler={touchHandler}
              validation
              containerClasses="mb-4"
              inputClasses="no-spin"
            />
          </Collapse>
          <Collapse
            in={contactMethod.value === "email"}
            timeout="auto"
            collapsedSize={0}
            style={{ width: "100%" }}
          >
            <Input
              type="textarea"
              placeholder="Comments"
              value={emailComments.value}
              label="Comments"
              id="emailComments"
              onChange={changeHandler}
              containerClasses=""
              rows={8}
              isTouched={emailComments.isTouched}
              isValid={emailComments.isValid}
              helperText={
                !emailComments.isValid && emailComments.isTouched
                  ? "Please enter some comments"
                  : ""
              }
              touchHandler={touchHandler}
              validation
            />
          </Collapse>
          <Collapse
            in={contactMethod.value !== "email"}
            timeout="auto"
            collapsedSize={0}
            style={{ width: "100%" }}
          >
            <p
              className={`text-sm text-center w-full mb-4 italictext-gray-dark`}
            >
              <span className="font-medium">
                Select a time and date for our call:
              </span>
              <br />
              <span className="italic">
                Times are displayed in your local time zone
              </span>
            </p>
            <div className="flex w-full justify-around relative">
              {[0, 1, 2].map((key) => {
                let days = key;
                if (lastBookingTodayHasPast) days = key + 1;
                return (
                  <div className="flex flex-col items-center" key={days}>
                    <p
                      className={`font-medium -mb-1 ${
                        moment().date() === moment().add(days, "d").date()
                          ? "text-blue-darkest"
                          : ""
                      }`}
                    >
                      {moment().add(days, "d").format("ddd")}
                    </p>
                    <p
                      className={`font-semibold mb-2 ${
                        moment().date() === moment().add(days, "d").date()
                          ? "text-blue-darkest"
                          : ""
                      }`}
                    >
                      {moment().add(days, "d").format("D")}
                    </p>
                    {bookingTimes.map((time) => {
                      // if booking time is on current date, display
                      if (time.date() === moment().add(days, "d").date()) {
                        return (
                          <button
                            type="button"
                            key={`${key} ${time.format("HH:mm DD")}`}
                            className={`rounded-md border-none px-2 py-1 m-0 hover:bg-green hover:text-white hover:font-medium group
															${
                                callTime === time.format("HH:mm DD-MM-YYYY ZZ")
                                  ? "bg-green text-white"
                                  : ""
                              }`}
                            onClick={() =>
                              handleSelectTime(
                                time.format("HH:mm DD-MM-YYYY ZZ")
                              )
                            }
                          >
                            {time.format("h:mm")}
                            <span
                              className={`font-medium group-hover:text-white text-xs ${
                                callTime === time.format("HH:mm DD-MM-YYYY ZZ")
                                  ? "bg-green text-white"
                                  : "text-gray-dark"
                              }`}
                            >
                              {time.format("a")}
                            </span>
                          </button>
                        );
                      } else {
                        return (
                          <React.Fragment
                            key={`${key} ${time.format("HH:mm DD")}`}
                          ></React.Fragment>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </Collapse>
          <div className="flex flex-col items-center w-full mt-8">
            <Button
              variant="contained"
              color="green"
              disabled={!formIsValid}
              label={
                contactMethod.value === "email" ? "Send email" : "Book call"
              }
              type="submit"
              size="large"
              buttonClasses="px-8 py-2"
              loading={loading}
              fullWidth
            />
          </div>
        </div>
      </form>

      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/AaronGazzola"
        className="flex justify-center mt-3"
      >
        <SVG name="github" classes="fill-current text-green mr-2" />
        <p className="font-medium italic text-green">Github.com/AaronGazzola</p>
      </a>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.upwork.com/freelancers/~017424c1cc6bed64e2"
        className="flex justify-center mt-2 items-center"
      >
        <div className="relative w-9 h-7 overflow-hidden">
          <SVG
            name="upworkLogo"
            classes="absolute fill-current text-green w-20 h-16 "
            style={{
              top: "-18px",
              left: "0px",
            }}
          />
        </div>
        <p className="font-medium italic text-green">
          Upwork.com/Freelancers/AaronGazzola
        </p>
      </a>
    </>
  );
};

export default Index;
