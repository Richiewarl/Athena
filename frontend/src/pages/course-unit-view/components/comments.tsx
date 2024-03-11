import { useEffect, useRef, useState } from "react";

import { UserData } from "@/authentication/data/userTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { AddNewCommentData, CommentData, VideoData } from "../data/apiTypes";
import { getCommentReplies, getVideoComments, postComment } from "../data/api";
import {
	ArrowDown,
	ArrowUp,
	CornerDownRight,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

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
			<AddCommentBlock
				video={video}
				comment_id={null}
				setOpenReplyTextbox={null}
			/>
			{comments.map((comment: CommentData) => (
				<PostedCommentBlock
					key={comment.id}
					initials={"N/A"}
					parent_comment={null}
					comment={comment}
					video={video}
					depth={0}
				/>
			))}
		</div>
	);
}

interface AddCommentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	video: VideoData;
	comment_id: number | null;
	setOpenReplyTextbox: Function | null;
}

function AddCommentBlock({
	video,
	comment_id,
	setOpenReplyTextbox,
}: AddCommentBlockProps) {
	const isReply: boolean = Boolean(comment_id && setOpenReplyTextbox);

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
	const { toast } = useToast();

	const handleCommentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setCommentText(event.target.value);
	};

	const saveComment = (
		commentText: string,
		parent_comment_id: number | null
	) => {
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
			if (setOpenReplyTextbox) {
				setOpenReplyTextbox(false);
			}

			setShowCommentTextbox(false);
			setCommentText("");

			toast({
				title: "Comment Succesfully Posted",
				description:
					newComment.body.length > 60
						? newComment.body.substring(0, 60) + "..."
						: newComment.body,
			});
		});
	};

	// display comment textbox
	const [showCommentTextbox, setShowCommentTextbox] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		// Focus on the textarea when showCommentTextbox becomes true
		if (showCommentTextbox) {
			if (textareaRef.current) {
				textareaRef.current.focus();
			}
		}
	}, [showCommentTextbox]);

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
					<h4 className="scroll-m-20 text-xs font-semibold tracking-tight mb-1 py-1 px-2 rounded-md bg-secondary">
						@{user?.username}
					</h4>
				</div>
				{isReply || showCommentTextbox ? (
					<>
						<Textarea
							className="border-2 mb-2"
							placeholder="Add a comment..."
							value={commentText}
							onChange={handleCommentChange}
							ref={textareaRef}
						/>
						<div
							id="comment-controls-block"
							className="flex flex-row justify-end"
						>
							<Button
								className="px-2 mr-2"
								variant="secondary"
								size="sm"
								onClick={() =>
									isReply
										? setOpenReplyTextbox && setOpenReplyTextbox(false)
										: setShowCommentTextbox(false)
								}
							>
								Cancel
							</Button>
							<Button
								className="px-2"
								size="sm"
								onClick={() => saveComment(commentText, comment_id)}
								disabled={!commentText.replace(/\s/g, "").length}
							>
								Comment
							</Button>
						</div>
					</>
				) : (
					<>
						<Button
							className="p-0 w-full hover:cursor-text text-start"
							variant="ghost"
							onClick={() => setShowCommentTextbox(true)}
						>
							Add a comment...
						</Button>
						<Separator className="my-1" />
					</>
				)}
			</div>
		</div>
	);
}

interface PostedCommentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	initials: string;
	video: VideoData;
	parent_comment: CommentData | null;
	comment: CommentData;
	depth: number;
}

function PostedCommentBlock({
	initials,
	video,
	parent_comment,
	comment,
	depth,
}: PostedCommentBlockProps) {
	// max number of recusive levels of replies for a comment
	const maximumDepth = 3;

	// display reply textbox
	const [openReplyTextbox, setOpenReplyTextbox] = useState<boolean>(false);
	const [openReplies, setOpenReplies] = useState<boolean>(false);

	// initialise comment replies
	const [replies, setReplies] = useState<CommentData[]>([]);

	useEffect(() => {
		getCommentReplies(comment.id).then((res) => {
			setReplies(res.data);
		});
	}, []);

	return (
		<div>
			<div id="comment-block" className="relative flex flex-row mt-5">
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
						<h4 className="scroll-m-20 text-xs font-semibold tracking-tight mb-1 py-1 px-2 rounded-md bg-secondary">
							@{comment.username}
						</h4>
					</div>
					<p className="mb-2">{comment.body}</p>
					<div className="comment-controls flex flex-row">
						<Button className="p-2" variant="ghost" size="sm">
							<ThumbsUp className="w-4" />
							&nbsp;
							{comment.like}
						</Button>
						<Button className="p-2" variant="ghost" size="sm">
							<ThumbsDown className="w-4" />
						</Button>
						<Button
							className="ml-3 p-2"
							variant="ghost"
							size="sm"
							onClick={() => setOpenReplyTextbox(true)}
						>
							<CornerDownRight className="w-4" />
							&nbsp; Reply
						</Button>
					</div>
				</div>
			</div>
			<div id="comment-replies-block" className="ml-10">
				{openReplyTextbox && (
					<AddCommentBlock
						video={video}
						comment_id={
							parent_comment && depth >= maximumDepth - 1
								? parent_comment.id
								: comment.id
						}
						setOpenReplyTextbox={setOpenReplyTextbox}
					/>
				)}
				{replies.length > 0 && (
					<Button
						className="p-1"
						variant="ghost"
						onClick={() => setOpenReplies(!openReplies)}
					>
						{openReplies ? (
							<ArrowUp className="w-5" color="#398FD9" />
						) : (
							<ArrowDown className="w-5" color="#398FD9" />
						)}
						&nbsp;
						<span style={{ color: "#398fd9" }}>{replies.length} Replies</span>
					</Button>
				)}
				{openReplies &&
					replies.map((reply: CommentData) => (
						<PostedCommentBlock
							key={reply.id}
							initials={"N/A"}
							parent_comment={comment}
							comment={reply}
							video={video}
							depth={depth + 1}
						/>
					))}
			</div>
		</div>
	);
}
