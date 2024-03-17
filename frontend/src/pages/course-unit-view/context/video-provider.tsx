import { createContext, useContext, useState } from "react";
import { VideoData } from "../data/apiTypes";

type VideoDataProps = {
	children: React.ReactNode;
};

type VideoDataProviderState = {
	selectedVideo: VideoData | null;
	setSelectedVideo: (video: VideoData | null) => void;
	videos: VideoData[];
	setVideos: (videos: VideoData[]) => void;
};

const VideoDataContext = createContext<VideoDataProviderState | undefined>(
	undefined
);

export function VideoDataProvider({ children }: VideoDataProps) {
	const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
	const [videos, setVideos] = useState<VideoData[]>([]);

	const value = {
		selectedVideo: selectedVideo,
		setSelectedVideo: setSelectedVideo,
		videos: videos,
		setVideos: setVideos,
	};

	return (
		<VideoDataContext.Provider value={value}>
			{children}
		</VideoDataContext.Provider>
	);
}

export function useVideo() {
	const context = useContext(VideoDataContext);

	if (!context) {
		throw new Error("useVideo must be used within a VideoDataProvider");
	}

	return context;
}
