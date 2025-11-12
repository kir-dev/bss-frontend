'use client';

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
  autoPlay?: boolean;
}

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) {
    return "0:00";
  }

  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function VideoPlayer({
  src,
  poster,
  title,
  className,
  preload = "metadata",
  autoPlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isScrubbingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState<number | null>(null);

  const displayedTime = isScrubbing && scrubTime !== null ? scrubTime : currentTime;
  const progressPercent = duration > 0 ? (displayedTime / duration) * 100 : 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
      setIsMuted(video.muted || video.volume === 0);
      setVolume(video.volume ?? 1);

      if (autoPlay) {
        const playPromise = video.play();
        playPromise?.catch(() => {
          setIsPlaying(false);
        });
      }
    };

    const handleTimeUpdate = () => {
      if (!isScrubbingRef.current) {
        setCurrentTime(video.currentTime);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setIsMuted(video.muted || video.volume === 0);
      setVolume(video.volume);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [autoPlay]);

  useEffect(() => {
    isScrubbingRef.current = isScrubbing;
  }, [isScrubbing]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = !video.muted;
    setIsMuted(video.muted || video.volume === 0);
  }, []);

  const handleVolumeChange = useCallback((nextVolume: number) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const clamped = Math.min(Math.max(nextVolume, 0), 1);
    video.volume = clamped;
    video.muted = clamped === 0;
    setVolume(clamped);
    setIsMuted(video.muted);
  }, []);

  const handleScrubStart = useCallback(() => {
    setIsScrubbing(true);
    isScrubbingRef.current = true;
  }, []);

  const handleScrubMove = useCallback(
    (value: number) => {
      const clamped =
        duration > 0 ? Math.min(Math.max(value, 0), duration) : 0;
      setScrubTime(clamped);
    },
    [duration]
  );

  const handleScrubEnd = useCallback(
    (value: number) => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      const clamped =
        duration > 0 ? Math.min(Math.max(value, 0), duration) : 0;
      video.currentTime = clamped;
      setCurrentTime(clamped);
      setScrubTime(null);
      setIsScrubbing(false);
      isScrubbingRef.current = false;
    },
    [duration]
  );

  const handleKeyboardControls = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        togglePlay();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const video = videoRef.current;
        if (!video) {
          return;
        }
        const next = Math.min(video.currentTime + 5, duration);
        video.currentTime = next;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const video = videoRef.current;
        if (!video) {
          return;
        }
        const next = Math.max(video.currentTime - 5, 0);
        video.currentTime = next;
      }
    },
    [duration, togglePlay]
  );

  const seekerPosition = Number.isFinite(progressPercent)
    ? Math.min(Math.max(progressPercent, 0), 100)
    : 0;

  return (
    <div
      className={cn(
        "group/video-player relative flex h-full w-full select-none items-center justify-center bg-black focus:outline-none",
        className
      )}
      role="region"
      aria-label={title ? `${title} video player` : "Video player"}
      tabIndex={0}
      onKeyDown={handleKeyboardControls}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        preload={preload}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center text-white/70 transition-opacity duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bss"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <span
          className={cn(
            "rounded-full bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-200",
            isPlaying ? "opacity-0 group-hover/video-player:opacity-100" : "opacity-100"
          )}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
        {title ? (
          <div className="truncate text-sm font-medium text-white/85">{title}</div>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bss"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <div className="relative flex h-9 flex-1 items-center">
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/25" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-bss transition-[width] duration-150 ease-out"
              style={{ width: `${seekerPosition}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-white/80 bg-bss shadow"
              style={{ left: `calc(${seekerPosition}% - 0.375rem)` }}
            />
            <input
              type="range"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              min={0}
              max={duration || 0}
              step={0.05}
              value={isScrubbing && scrubTime !== null ? scrubTime : currentTime}
              onPointerDown={handleScrubStart}
              onPointerUp={(event) => {
                const value = Number((event.target as HTMLInputElement).value);
                handleScrubEnd(value);
              }}
              onPointerLeave={(event) => {
                if (!isScrubbingRef.current) {
                  return;
                }
                const value = Number((event.target as HTMLInputElement).value);
                handleScrubEnd(value);
              }}
              onPointerCancel={(event) => {
                const value = Number((event.target as HTMLInputElement).value);
                handleScrubEnd(value);
              }}
              onChange={(event) => {
                const value = Number(event.target.value);
                handleScrubMove(value);
              }}
            />
          </div>

          <div className="flex min-w-[96px] items-center justify-end text-xs font-medium tabular-nums text-white/85">
            {formatTime(displayedTime)} / {formatTime(duration)}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bss"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <div className="relative h-9 w-24">
              <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/20" />
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-bss transition-[width] duration-150 ease-out"
                style={{ width: `${(volume ?? 0) * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onPointerUp={(event) => {
                  handleVolumeChange(Number((event.target as HTMLInputElement).value));
                }}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  handleVolumeChange(value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
