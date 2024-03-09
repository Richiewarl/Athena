import { useState } from "react";

import { UserData } from "@/authentication/data/userTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { CommentData, VideoData } from "../data/apiTypes";
import { postComment } from "../data/api";

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
	video: VideoData;
}

export default function Comments({ video }: CommentProps) {
	// initialise user details
	const userJson = localStorage.getItem("user-data");
	let user: UserData | null = null;
	let initials = "N/A";

	if (userJson) {
		user = JSON.parse(userJson);

		if (user && user.fullname) {
			initials = user.fullname
				.split(" ")
				.map((name) => name[0].toUpperCase())
				.join();
		}
	}

	const [commentText, setCommentText] = useState<string>("");

	const handleCommentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setCommentText(event.target.value);
	};

	const saveRootComment = (
		text: string,
		parent_comment_id: number | null = null
	) => {
		let comment: CommentData = {
			fullname: user?.fullname ?? "",
			username: user?.username ?? "",
			body: commentText,
			created_at: new Date().toISOString(),
			active: true,
			like: 0,
			dislike: 0,
			video_id: video.id,
			parent_comment_id: parent_comment_id,
		};

		postComment(comment).then((res) => {
			console.log(res);
		});
	};

	return (
		<div className="relative flex flex-row my-5">
			<Avatar className="h-8 w-8 mr-2">
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="profile picture"
					className="user-thumbnail"
				/>
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className="w-full">
				<h4 className="scroll-m-20 text-s font-semibold tracking-tight mb-1">
					{user?.fullname}
				</h4>
				<Textarea
					className="border-2 mb-2"
					placeholder="Add a comment..."
					value={commentText}
					onChange={handleCommentChange}
				/>
				<Button
					className="float-right"
					size="sm"
					onClick={() => saveRootComment(commentText)}
					disabled={!commentText.replace(/\s/g, "").length}
				>
					Comment
				</Button>
			</div>
		</div>
	);
}
