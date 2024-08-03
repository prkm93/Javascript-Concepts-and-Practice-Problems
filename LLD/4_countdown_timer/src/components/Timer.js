// import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [timerStart, setTimerStart] = useState("stop");
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  document.title = "CountDown Timer";

  const isTimerZero =
    Number(hour) === 0 && Number(minute) === 0 && Number(second) === 0;

  const calcMinutes = (min) => {
    setHour(Number(hour) + Math.floor(Number(min) / 60));
    setMinute(Number(min) % 60);
  };

  const calculateSeconds = (sec) => {
    if (Number(sec) > 59) {
      const calcMinute = Number(minute) + Math.floor(Number(sec) / 60);
      const calcSecond = Number(sec) % 60;
      setSecond(calcSecond);
      setMinute(calcMinute);

      if (calcMinute > 59) {
        calcMinutes(calcMinute);
      }
    }
  };

  const handleStart = () => {
    if (!Number(second) && !Number(minute) && !Number(hour)) {
      return;
    }

    if (minute > 59) {
      calcMinutes(minute);
    }

    if (second > 59) {
      calculateSeconds(second);
    }

    if (second >= 0) {
      setTimerStart("start");
      secondRef.current = setInterval(() => {
        setSecond((prevVal) => prevVal - 1);
      }, 1000);
    }

    if (minute >= 0 && Number(second) === 0) {
      setTimerStart("start");
      setMinute((prevVal) => prevVal - 1);
      setSecond(59);
    }

    if (hour >= 0 && Number(minute) === 0 && Number(second) === 0) {
      setTimerStart("start");
      setHour((prevVal) => prevVal - 1);
      setMinute(59);
      setSecond(59);
    }
  };

  const handlePause = () => {
    clearInterval(minuteRef.current);
    clearInterval(secondRef.current);
    clearInterval(hourRef.current);
    setTimerStart("pause");
  };

  const handleReset = () => {
    setHour("00");
    setMinute("00");
    setSecond("00");
    clearInterval(minuteRef.current);
    clearInterval(secondRef.current);
    clearInterval(hourRef.current);
  };

  useEffect(() => {
    if (Number(second) === 0 && Number(minute) === 0 && Number(hour) === 0) {
      clearInterval(secondRef.current);
      clearInterval(minuteRef.current);
      clearInterval(hourRef.current);
      setTimerStart("stop");
      setHour("00");
      setMinute("00");
      setSecond("00");
    }

    if (hour > 0 && minute === 0 && second === 0) {
      setHour((prevVal) => prevVal - 1);
      setMinute(59);
      setSecond(59);
    }

    if (second < 0 && minute > 0) {
      setMinute((prevVal) => prevVal - 1);
      setSecond(59);
    }

    if (minute < 0 && hour > 0) {
      setHour((prevVal) => prevVal - 1);
      setMinute(59);
    }
  }, [hour, minute, second]);

  return (
    <div className={styles.wrapper}>
      <h1>Countdown Timer</h1>
      <div className={styles.container}>
        <div className={styles.timer_label}>Hours</div>
        <div className={styles.timer_label}>Minutes</div>
        <div className={styles.timer_label}>Seconds</div>
        <div className={styles.value_section}>
          <input
            className={`${styles.input} ${isTimerZero && styles.input_disable}`}
            type="number"
            min={0}
            maxLength={2}
            value={hour < 10 ? hour.toString().padStart(2, 0) : hour}
            onChange={(e) => {
              setHour(Number(e.target.value));
            }}
          />
          <div>:</div>
        </div>
        <div className={styles.value_section}>
          <input
            className={`${styles.input} ${isTimerZero && styles.input_disable}`}
            type="number"
            min={0}
            max={59}
            maxLength={2}
            value={minute < 10 ? minute.toString().padStart(2, 0) : minute}
            onChange={(e) => setMinute(e.target.value)}
          />
          <div>:</div>
        </div>
        <div>
          <input
            className={`${styles.input} ${isTimerZero && styles.input_disable}`}
            type="number"
            min={0}
            max={59}
            maxLength={2}
            value={second < 10 ? second.toString().padStart(2, 0) : second}
            onChange={(e) => setSecond(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.btn_group}>
        {timerStart === "stop" ? (
          <button
            className={`${styles.btn} ${styles.btn_start}`}
            onClick={handleStart}>
            Start
          </button>
        ) : timerStart === "pause" ? (
          <button
            className={`${styles.btn} ${styles.btn_start}`}
            onClick={handleStart}>
            Continue
          </button>
        ) : (
          <button
            className={`${styles.btn} ${styles.btn_pause}`}
            onClick={handlePause}>
            Pause
          </button>
        )}

        <button
          className={`${styles.btn} ${styles.btn_reset}`}
          onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

/**
 *
 *
 */
