"use client";

import { useCallback, useRef, useState } from "react";
import {
  FaExpand,
  FaPause,
  FaPlay,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";

const formatTime = (seconds: number) => {
  const value = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
};

export default function CourseVideo({ title }: { title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState("");
  const buttonClass =
    "flex size-11 cursor-pointer shrink-0 items-center justify-center rounded-xl text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  // Autoplay and metadata events may fire before React hydrates the video.
  // Read the element on attachment and keep all controls in sync thereafter.
  const syncMedia = useCallback((video: HTMLVideoElement) => {
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    setTime(video.currentTime);
    setPlaying(!video.paused && !video.ended);
    setVolume(video.volume);
    setMuted(video.muted);
    setSpeed(video.playbackRate);
  }, []);

  const attachVideo = useCallback(
    (video: HTMLVideoElement | null) => {
      videoRef.current = video;
      if (video) syncMedia(video);
    },
    [syncMedia],
  );

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!started) {
      video.currentTime = 0;
      video.muted = false;
      video.loop = false;
      setTime(0);
      setMuted(false);
      setStarted(true);
    } else if (!video.paused) {
      video.pause();
      syncMedia(video);
      return;
    }
    try {
      await video.play();
      syncMedia(video);
      setError("");
    } catch {
      setError("Playback could not start. Please try again.");
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (playerRef.current?.requestFullscreen)
        await playerRef.current.requestFullscreen();
      else {
        const video = videoRef.current as
          | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
          | null;
        video?.webkitEnterFullscreen?.();
      }
    } catch {
      setError("Fullscreen is unavailable in this browser.");
    }
  };

  return (
    <div
      ref={playerRef}
      className="group relative overflow-hidden rounded-[28px] bg-dark text-white shadow-xl"
    >
      <video
        ref={attachVideo}
        aria-label={`${title} — course preview`}
        autoPlay
        muted={muted}
        loop={!started}
        playsInline
        preload="metadata"
        poster="/video/7308105-hd_720p24-poster.jpg"
        className="aspect-video max-h-dvh w-full object-contain"
        onLoadedMetadata={(event) => syncMedia(event.currentTarget)}
        onDurationChange={(event) => syncMedia(event.currentTarget)}
        onTimeUpdate={(event) => syncMedia(event.currentTarget)}
        onPlay={(event) => syncMedia(event.currentTarget)}
        onPlaying={(event) => syncMedia(event.currentTarget)}
        onPause={(event) => syncMedia(event.currentTarget)}
        onEnded={(event) => syncMedia(event.currentTarget)}
        onSeeked={(event) => syncMedia(event.currentTarget)}
        onVolumeChange={(event) => syncMedia(event.currentTarget)}
        onRateChange={(event) => syncMedia(event.currentTarget)}
        onError={() =>
          setError(
            "Unable to load the video. Please reload the page to try again.",
          )
        }
      >
        <source
          src="/video/7308105-hd_720p24-with-audio.mp4"
          type="video/mp4"
        />
        Your browser does not support video playback.
      </video>
      {!started && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dark/45"
        />
      )}
      {!started && (
        <button
          type="button"
          aria-label="Play course preview"
          onClick={togglePlayback}
          className="absolute left-1/2 top-1/2 flex size-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-dark/25 bg-course-play/80 shadow-lg backdrop-blur-sm transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-body/95 text-course-play">
            <FaPlay aria-hidden="true" className="ml-1 text-[22px]" />
          </span>
        </button>
      )}
      {started && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-dark/95 via-dark/65 to-transparent px-4 pb-3 pt-10 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-has-[:focus-visible]:pointer-events-auto group-has-[:focus-visible]:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100 sm:px-5">
          <input
            type="range"
            aria-label="Seek video"
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            min={0}
            max={Number.isFinite(duration) ? duration : 0}
            step={0.1}
            value={Math.min(time, duration)}
            disabled={duration <= 0}
            onChange={(event) => {
              if (videoRef.current)
                videoRef.current.currentTime = Number(event.target.value);
              setTime(Number(event.target.value));
            }}
            className="block h-4 w-full cursor-pointer accent-primary"
          />
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlayback}
              className={`${buttonClass} bg-white/10`}
            >
              {playing ? (
                <FaPause aria-hidden="true" />
              ) : (
                <FaPlay aria-hidden="true" />
              )}
            </button>
            <span className="whitespace-nowrap px-1 text-xs tabular-nums text-white/80 sm:text-sm">
              {formatTime(time)} / {formatTime(duration)}
            </span>
            <div className="ml-auto flex items-center">
              <button
                type="button"
                aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
                onClick={() => {
                  if (!videoRef.current) return;
                  if (volume === 0) videoRef.current.volume = 1;
                  videoRef.current.muted = !(
                    videoRef.current.muted || volume === 0
                  );
                  syncMedia(videoRef.current);
                }}
                className={buttonClass}
              >
                {muted || volume === 0 ? (
                  <FaVolumeXmark aria-hidden="true" />
                ) : (
                  <FaVolumeHigh aria-hidden="true" />
                )}
              </button>
              <input
                type="range"
                aria-label="Volume"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(event) => {
                  if (!videoRef.current) return;
                  videoRef.current.volume = Number(event.target.value);
                  videoRef.current.muted = false;
                  syncMedia(videoRef.current);
                }}
                className="hidden h-4 w-16 cursor-pointer accent-primary sm:block"
              />
            </div>
            <select
              aria-label="Playback speed"
              value={speed}
              onChange={(event) => {
                if (videoRef.current)
                  videoRef.current.playbackRate = Number(event.target.value);
              }}
              className="h-11 cursor-pointer rounded-xl border-0 bg-dark py-1 pl-2 pr-7 text-xs text-white focus:ring-primary sm:text-sm"
            >
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}×
                </option>
              ))}
            </select>
            <button
              type="button"
              aria-label="Toggle fullscreen"
              onClick={toggleFullscreen}
              className={buttonClass}
            >
              <FaExpand aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      {error && (
        <p
          role="alert"
          className="absolute inset-x-0 top-0 bg-dark/80 px-5 py-3 text-sm text-white"
        >
          {error}
        </p>
      )}
    </div>
  );
}
