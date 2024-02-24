import { createContext, useContext, useState } from "react";
import { VideoData } from "../data/apiTypes";

type VideoDataProps = {
	children: React.ReactNode;
};

type VideoDataProviderState = {
	video: VideoData | null;
	setVideo: (video: VideoData | null) => void;
};

const VideoDataContext = createContext<VideoDataProviderState | undefined>(
	undefined
);

export function VideoDataProvider({ children }: VideoDataProps) {
	const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

	const value = {
		video: selectedVideo,
		setVideo: setSelectedVideo,
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
