import { useEffect, useRef, useState } from "react";

import {
	UserProfileData,
	UserSessionData,
} from "@/authentication/data/userTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	NewCommentData,
	CommentData,
	VideoData,
	mapNewCommentDataToCommentData,
} from "../data/apiTypes";
import {
	deleteComment,
	getCommentReplies,
	getVideoComments,
	postComment,
	updateComment,
} from "../data/api";
import {
	ArrowDown,
	ArrowUp,
	CornerDownRight,
	ThumbsDown,
	ThumbsUp,
	MoreVerticalIcon,
	Dot,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/authentication/context/user-provider";
import { geUsertInitials } from "@/authentication/data/utils";

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
	}, [video.id]);

	return (
		<div id="comment-section" className="">
			<AddCommentBlock
				video={video}
				comment_id={null}
				setOpenReplyTextbox={null}
				setComments={setComments}
				comments={comments}
				setReplies={null}
				replies={[]}
				setEditMode={null}
			/>
			{comments.map((comment: CommentData) => (
				<PostedCommentBlock
					key={comment.id}
					setComments={setComments}
					comments={comments}
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
	setComments: Function | null;
	comments: CommentData[];
	setReplies: Function | null;
	replies: CommentData[];
	setEditMode: Function | null;
}

// Acts as input for either adding reply (comment of a comment) or comment (root comment)
function AddCommentBlock({
	video,
	comment_id,
	setComments,
	comments,
	setOpenReplyTextbox,
	setReplies,
	replies,
}: AddCommentBlockProps) {
	const isReply: boolean = setOpenReplyTextbox != null;
	const user = useUser().user;

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
		let newComment: NewCommentData = {
			user: user ? user.id : -1,
			body: commentText,
			active: true,
			video: video.id,
			parent_comment: parent_comment_id,
		};

		postComment(newComment)
			.then((res) => {
				console.log(res);
				if (isReply) {
					setOpenReplyTextbox && setOpenReplyTextbox(false); // close reply textbox
					setReplies &&
						setReplies([
							mapNewCommentDataToCommentData(res.data, user),
							...replies,
						]);
				} else {
					setShowCommentTextbox(false); // hide comment textbox
					setComments &&
						setComments([
							mapNewCommentDataToCommentData(res.data, user),
							...comments,
						]);
				}

				// reset input text
				setCommentText("");

				toast({
					title: "Comment Succesfully Posted",
					description:
						newComment.body.length > 60
							? newComment.body.substring(0, 60) + "..."
							: newComment.body,
				});
			})
			.catch((error) => {
				toast({
					title: "Uh oh! Something went wrong.",
					description: error.message + ". We could not add your comment.",
					variant: "destructive",
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
				<AvatarFallback>{geUsertInitials()}</AvatarFallback>
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
	comments: CommentData[];
	setComments: Function;
	parent_comment: CommentData | null;
	comment: CommentData;
	video: VideoData;
	depth: number;
}

function PostedCommentBlock({
	comments,
	setComments,
	parent_comment,
	comment,
	video,
	depth,
}: PostedCommentBlockProps) {
	const { toast } = useToast();

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

	// Display comment settings
	const [showSettingButton, setShowSettingButton] = useState(false);
	const [showCommentSettings, setShowCommentSettings] = useState(false);

	// Editing comment
	const [editMode, setEditMode] = useState(false);
	const [editCommentText, setEditCommentText] = useState(comment.body);
	const handleEditCommentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setEditCommentText(event.target.value);
	};

	const editComment = (editCommentText: string) => {
		let updatedComment: NewCommentData = {
			user: comment.user.id,
			body: editCommentText,
			active: comment.active,
			video: comment.video,
			parent_comment: comment.parent_comment,
		};

		updateComment(updatedComment, comment.id)
			.then((res) => {
				let updatedComment = mapNewCommentDataToCommentData(
					res.data,
					comment.user
				);

				setComments(
					comments.map((cmmt) => (cmmt === comment ? updatedComment : cmmt))
				);
				setEditMode(false);
				toast({
					title: "Comment Succesfully Edited",
					description: editCommentText,
				});
			})
			.catch((error) => {
				toast({
					title: "Uh oh! Something went wrong.",
					description: error.message + ". We could not edit your comment.",
					variant: "destructive",
				});
			});
	};

	// Deleting comment
	const removingComment = () => {
		deleteComment(comment.id)
			.then((res) => {
				setComments(comments.filter((cmmt) => cmmt != comment));
				toast({
					title: "Comment Succesfully Deleted",
					description: editCommentText,
				});
			})
			.catch((error) => {
				toast({
					title: "Uh oh! Something went wrong.",
					description: error.message + ". We could not delete your comment.",
					variant: "destructive",
				});
			});
	};

	return (
		<div
			onMouseEnter={() => setShowSettingButton(true)}
			onMouseLeave={() => setShowSettingButton(false)}
		>
			<div className="relative flex flex-row mt-5">
				<Avatar className="h-8 w-8 mr-2">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="profile picture"
						className="user-thumbnail"
					/>
					<AvatarFallback>{geUsertInitials()}</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<div className="flex flex-row items-center">
						<h4 className="scroll-m-20 text-s font-semibold tracking-tight mb-1 mr-1">
							{comment.user.fullname}
						</h4>
						<h4 className="scroll-m-20 text-xs font-semibold tracking-tight mb-1 py-1 px-2 rounded-md bg-secondary">
							@{comment.user.username}
						</h4>
						<p className="flex flex-row items-center text-xs mb-1 py-1 px-2 text-muted-foreground">
							{new Date(comment.created_on).toLocaleDateString("en-GB")}
							<Dot className="w-4" />
							{new Date(comment.created_on).toLocaleTimeString("en-GB")}
						</p>
					</div>
					{editMode ? (
						<>
							<Textarea
								className="border-2 mb-2"
								placeholder=""
								value={editCommentText}
								onChange={handleEditCommentChange}
							/>
							<div
								id="comment-controls-block"
								className="flex flex-row justify-end"
							>
								<Button
									className="px-2 mr-2"
									variant="secondary"
									size="sm"
									onClick={() => setEditMode(false)}
								>
									Cancel
								</Button>
								<Button
									className="px-2"
									size="sm"
									onClick={() => editComment(editCommentText)}
									disabled={!editCommentText.replace(/\s/g, "").length}
								>
									Comment
								</Button>
							</div>
						</>
					) : (
						<>
							<p className="mb-2">{comment.body}</p>
							<div className="comment-controls flex flex-row">
								<Button className="p-2" variant="ghost" size="sm">
									<ThumbsUp className="w-4" />
									&nbsp;
									{0}
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
						</>
					)}
				</div>
				<DropdownMenu
					open={showCommentSettings}
					onOpenChange={() => {
						setShowCommentSettings(!showCommentSettings);
					}}
				>
					<DropdownMenuTrigger asChild>
						<Button
							className="ml-auto p-1"
							variant="ghost"
							style={{
								opacity: showSettingButton || showCommentSettings ? "100" : "0",
							}}
							onMouseEnter={() => setShowSettingButton(true)}
							onMouseLeave={() => setShowSettingButton(false)}
							onFocus={() => setShowSettingButton(true)}
							onBlur={() => setShowSettingButton(false)}
						>
							<MoreVerticalIcon className="w-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setEditMode(true)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-destructive"
							onClick={removingComment}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
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
						setComments={null}
						comments={[]}
						setReplies={setReplies}
						replies={replies}
						setEditMode={null}
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
							comments={comments}
							setComments={setComments}
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
