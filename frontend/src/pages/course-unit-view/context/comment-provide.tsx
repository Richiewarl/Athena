import { createContext, useContext, useState } from "react";
import { CommentData, VideoData } from "../data/apiTypes";

type CommentDataProps = {
	children: React.ReactNode;
};

type CommentDataProviderState = {
	comments: CommentData[] | null;
	setComments: (comments: CommentData[]) => void;
};

const CommentDataContext = createContext<CommentDataProviderState | undefined>(
	undefined
);

export function CommentDataProvider({ children }: CommentDataProps) {
	const [comments, setComments] = useState<CommentData[]>([]);

	const value = {
		comments: comments,
		setComments: setComments,
	};

	return (
		<CommentDataContext.Provider value={value}>
			{children}
		</CommentDataContext.Provider>
	);
}

export function useComment() {
	const context = useContext(CommentDataContext);

	if (!context) {
		throw new Error("useComment must be used within a VideoDataProvider");
	}

	return context;
}
