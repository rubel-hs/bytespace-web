"use client";

import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const { enable, content, expire_days } = config.announcement;
const ANNOUNCEMENT_COOKIE = "announcement-close-october-12";

const Cookies = {
  set: (name: string, value: string, options: any = {}) => {
    if (typeof document === "undefined") return;

    const defaults = { path: "/" };
    const opts = { ...defaults, ...options };

    if (typeof opts.expires === "number") {
      opts.expires = new Date(Date.now() + opts.expires * 864e5);
    }
    if (opts.expires instanceof Date) {
      opts.expires = opts.expires.toUTCString();
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const key in opts) {
      if (!opts[key]) continue;
      cookieString += `; ${key}`;
      if (opts[key] !== true) {
        cookieString += `=${opts[key]}`;
      }
    }

    document.cookie = cookieString;
  },

  get: (name: string): string | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  },

  remove: (name: string, options: any = {}) => {
    Cookies.set(name, "", { ...options, expires: -1 });
  },
};

const Announcement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setTimeout(() => {
      if (enable && content && !Cookies.get(ANNOUNCEMENT_COOKIE)) {
        setIsVisible(true);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (!isVisible || !announcementRef.current) {
      root.style.setProperty("--announcement-height", "0px");
      return;
    }

    const announcement = announcementRef.current;
    const updateAnnouncementHeight = () => {
      root.style.setProperty(
        "--announcement-height",
        `${announcement.offsetHeight}px`,
      );
    };
    const resizeObserver = new ResizeObserver(updateAnnouncementHeight);

    updateAnnouncementHeight();
    resizeObserver.observe(announcement);

    return () => {
      resizeObserver.disconnect();
      root.style.setProperty("--announcement-height", "0px");
    };
  }, [isVisible]);

  const handleClose = () => {
    Cookies.set(ANNOUNCEMENT_COOKIE, "true", {
      expires: expire_days,
    });
    setIsVisible(false);
  };

  if (!enable || !content || !isVisible) {
    return null;
  }

  return (
    <div
      ref={announcementRef}
      className="fixed inset-x-0 top-0 z-40 bg-dark bg-linear-to-r from-secondary via-secondary/85 to-primary/35 px-4 py-2.5 pr-12 text-sm text-light shadow-lg shadow-dark/15 transition-all duration-300 sm:py-3"
    >
      <p
        className="relative z-10"
        dangerouslySetInnerHTML={markdownify(content)}
      />
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-1/2 right-4 z-10 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-light/40 text-base leading-none text-light transition-colors duration-200 hover:bg-light/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
        aria-label="Close announcement"
      >
        &times;
      </button>
    </div>
  );
};

export default Announcement;
