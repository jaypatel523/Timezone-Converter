import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ScheduleEvent = () => {
  const session = useSession(); // tokens
  const supabase = useSupabaseClient(); // talk to supabase
  const [isScheduling, setIsScheduling] = useState(false);

  const GoogleSignin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar.events",
      },
    });

    if (error) {
      console.log(error);
    }
  };

  const scheduleEvent = async (accessToken) => {
    setIsScheduling(true);
    const event = {
      summary: "Technical Interview at Playpower",
      description: "You have to give a technical interview at playpowerlabs.",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(
          new Date().getTime() + 2 * 60 * 60 * 1000
        ).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
          requestId: new Date().toISOString(),
        },
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsScheduling(false);
      } else {
        console.error(
          "Failed to create event:",
          response.status,
          response.statusText
        );
        alert(
          "Failed to create event. Please check the console for more details."
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  const scheduleGoogleCalenderEvent = async () => {
    if (!session || !session.provider_token) {
      await GoogleSignin();
    }
    session;
    await scheduleEvent(session.provider_token);
  };

  return (
    <>
      <Button onClick={scheduleGoogleCalenderEvent}>
        {isScheduling ? <MoreHorizIcon /> : <CalendarMonthIcon />}
      </Button>
    </>
  );
};

export default ScheduleEvent;
