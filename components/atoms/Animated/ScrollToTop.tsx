"use client"

import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";


// Custom hook to handle scroll logic
const useScrollTracking = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    // Calculate scroll progress
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
    setScrollProgress(progress);

    // Show scroll button
    setShowScroll(window.scrollY > 400);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { showScroll, scrollProgress };
};

const ScrollToTop = () => {
  const { showScroll, scrollProgress } = useScrollTracking();

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-10 right-0 z-10"
        drag
        dragConstraints={{ left: -10, right: -10, top: -10, bottom: -10 }}
        dragElastic={0.3}
      >
        {showScroll && (
          <svg width="80" height="80" viewBox="0 0 120 120" className="-rotate-90 cursor-grab">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300/50"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(255,210,45)" />
                <stop offset="100%" stopColor="rgb(255,210,45)" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Scroll to Top Button - Centered in Circle */}
        {showScroll && (
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-bg p-2.5 rounded-full cursor-pointer shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 ease-in-out hover:-rotate-10 group"
            onClick={scrollToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 animate-upwardPulse group-hover:animate-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}
      </motion.div>
    </>
  );
};

export default ScrollToTop;
