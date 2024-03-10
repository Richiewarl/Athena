import { useEffect, useState } from "react";

import { UserData } from "@/authentication/data/userTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { AddNewCommentData, CommentData, VideoData } from "../data/apiTypes";
import { getVideoComments, postComment } from "../data/api";
import { CornerDownRight, Reply, ThumbsDown, ThumbsUp } from "lucide-react";

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
	video: VideoData;
}

export default function Comments({ video }: CommentProps) {
	// initialise video comments
	const [comments, setComments] = useState<CommentData[]>([]);
	useEffect(() => {
		getVideoComments(video.id).then((res) => {
			setComments(res.data);
		});
	}, []);

	return (
		<div id="comment-section" className="">
			<AddCommentBlock video={video} comment_id={-1} />
			{comments.map((comment: CommentData) => (
				<PostedCommentBlock
					key={comment.id}
					initials={"N/A"}
					comment={comment}
					video={video}
				/>
			))}
		</div>
	);
}

interface AddCommentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	video: VideoData;
	comment_id: number;
	setOpenReply: Function;
}

function AddCommentBlock({
	video,
	comment_id,
	setOpenReply,
}: AddCommentBlockProps) {
	const isReply: boolean = comment_id != -1;

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

	// commenting logic
	const [commentText, setCommentText] = useState<string>("");

	const handleCommentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setCommentText(event.target.value);
	};

	const saveComment = (commentText: string, parent_comment_id: number) => {
		let newComment: AddNewCommentData = {
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

		postComment(newComment).then((res) => {
			console.log(res);
		});
	};

	return (
		<div id="add-comment-block" className="relative flex flex-row my-5">
			<Avatar className="h-8 w-8 mr-2">
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="profile picture"
					className="user-thumbnail"
				/>
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className="w-full">
				<div className="flex flex-row">
					<h4 className="scroll-m-20 text-s font-semibold tracking-tight mb-1 mr-1">
						{user?.fullname}
					</h4>
					<h4 className="scroll-m-20 text-xs font-semibold tracking-tight mb-1 p-1 rounded-lg bg-secondary">
						@{user?.username}
					</h4>
				</div>
				<Textarea
					className="border-2 mb-2"
					placeholder="Add a comment..."
					value={commentText}
					onChange={handleCommentChange}
				/>
				<div id="comment-controls-block" className="flex flex-row justify-end">
					{isReply && (
						<Button
							className="px-2 mr-2"
							variant="secondary"
							size="sm"
							onClick={() => setOpenReply(false)}
						>
							Cancel
						</Button>
					)}
					<Button
						className="px-2"
						size="sm"
						onClick={() => saveComment(commentText, comment_id)}
						disabled={!commentText.replace(/\s/g, "").length}
					>
						Comment
					</Button>
				</div>
			</div>
		</div>
	);
}

interface PostedCommentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	initials: string;
	video: VideoData;
	comment: CommentData;
}

function PostedCommentBlock({
	initials,
	video,
	comment,
}: PostedCommentBlockProps) {
	// replying logic

	// display reply textbox
	const [openReply, setOpenReply] = useState<boolean>(false);

	return (
		<div>
			<div id="comment-block" className="relative flex flex-row my-5">
				<Avatar className="h-8 w-8 mr-2">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="profile picture"
						className="user-thumbnail"
					/>
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<div className="flex flex-row">
						<h4 className="scroll-m-20 text-s font-semibold tracking-tight mb-1 mr-1">
							{comment.fullname}
						</h4>
						<h4 className="scroll-m-20 text-xs font-semibold tracking-tight mb-1 p-1 rounded-lg bg-secondary">
							@{comment.username}
						</h4>
					</div>
					<p className="mb-2">{comment.body}</p>
					<div className="comment-controls flex flex-row">
						<Button className="p-2" variant="ghost" size="sm">
							<ThumbsUp className="w-4" />
						</Button>
						<Button className="p-2" variant="ghost" size="sm">
							<ThumbsDown className="w-4" />
						</Button>
						<Button
							className="ml-3 p-2"
							variant="ghost"
							size="sm"
							onClick={() => setOpenReply(true)}
						>
							<CornerDownRight className="w-4" />
							&nbsp; Reply
						</Button>
					</div>
				</div>
			</div>
			<div id="comment-replies-block" className="ml-10">
				{openReply && (
					<AddCommentBlock
						video={video}
						comment_id={comment.id}
						setOpenReply={setOpenReply}
					/>
				)}
			</div>
		</div>
	);
}
