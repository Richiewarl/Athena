import { useEffect, useRef, useState } from "react";

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
	Trash2,
	PenLine,
	BadgeCheck,
	CheckCheck,
	X,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/authentication/context/user-provider";
import { geUsertInitials } from "@/authentication/data/utils";
import default_pfp from "@/assets/default_pfp.svg";
import {
	UserRole,
	UserRoleToCommentIcon,
} from "@/authentication/data/userDataMapper";
import reactStringReplace from "react-string-replace";
import { Link } from "react-router-dom";
import { paths } from "@/enums/paths";

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
				parent_comment_id={null}
				setOpenReplyTextbox={null}
				setOpenReplies={null}
				setComments={setComments}
				comments={comments}
				setReplies={null}
				replies={[]}
			/>
			{comments.map((comment: CommentData) => (
				<PostedCommentBlock
					key={comment.id}
					setComments={setComments}
					comments={comments}
					parent_comment={null}
					parent_setOpenReplies={null}
					parent_setReplies={null}
					parent_replies={[]}
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
	parent_comment_id: number | null;
	setComments: Function | null;
	comments: CommentData[];
	setOpenReplyTextbox: Function | null;
	setOpenReplies: Function | null;
	setReplies: Function | null;
	replies: CommentData[];
}

// Acts as input for either adding reply (comment of a comment) or comment (root comment)
function AddCommentBlock({
	video,
	parent_comment_id,
	setComments,
	comments,
	setOpenReplyTextbox,
	setOpenReplies,
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

	const saveComment = (commentText: string) => {
		let newComment: NewCommentData = {
			user: user ? user.id : -1,
			body: commentText,
			active: true,
			video: video.id,
			parent_comment: parent_comment_id,
		};

		postComment(newComment)
			.then((res) => {
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

				// open replies automatically
				setOpenReplies && setOpenReplies(true);

				toast({
					title: "Comment Succesfully Posted",
					description:
						newComment.body.length > 60
							? newComment.body.substring(0, 60) + "..."
							: newComment.body,
					variant: "success",
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
					src={
						user
							? user.profile_picture == ""
								? default_pfp
								: user.profile_picture
							: ""
					}
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
								onClick={() => saveComment(commentText)}
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
	parent_setOpenReplies: Function | null;
	parent_setReplies: Function | null;
	parent_replies: CommentData[];
	comment: CommentData;
	video: VideoData;
	depth: number;
}

function PostedCommentBlock({
	comments,
	setComments,
	parent_comment,
	parent_setOpenReplies,
	parent_setReplies,
	parent_replies,
	comment,
	video,
	depth,
}: PostedCommentBlockProps) {
	const { toast } = useToast();
	const cur_user = useUser().user;

	// detect timestamps
	const stringToSeconds = (timestamp: string) => {
		let arr = timestamp.split(":");
		let seconds = 0;
		if (arr.length == 3) {
			seconds = +arr[0] * 60 * 60 + +arr[1] * 60 + +arr[2];
		} else if (arr.length == 2) {
			seconds = +arr[0] * 60 + +arr[1];
		}
		return seconds;
	};
	const commentDisplay = reactStringReplace(
		comment.body,
		/(\d+:\d+:?\d+)/g,
		(match, i) => (
			<Link
				className="text-blue-400"
				key={i}
				to={{
					pathname: paths.Homepage,
					search: `?videoStart=${stringToSeconds(match)}&videoAutoplay=1`,
				}}
			>
				{match}
			</Link>
		)
	);

	// max number of recusive levels of replies for a comment
	const maximumDepth = 1;

	// display reply textbox
	const [openReplyTextbox, setOpenReplyTextbox] = useState<boolean>(false);

	// display replies
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

	// Comment verification
	const [verified, setVerified] = useState(false);

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
				parent_setReplies &&
					parent_setReplies(
						parent_replies.map((rply) =>
							rply === comment ? updatedComment : comment
						)
					);

				setEditMode(false);
				toast({
					title: "Comment Succesfully Edited",
					description: editCommentText,
					variant: "success",
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
				parent_setReplies &&
					parent_setReplies(parent_replies.filter((rlpy) => rlpy != comment));

				toast({
					title: "Comment Succesfully Deleted",
					description: editCommentText,
					variant: "success",
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
			key={comment.id}
			onMouseEnter={() => setShowSettingButton(true)}
			onMouseLeave={() => setShowSettingButton(false)}
		>
			<div className="relative flex flex-row mt-5">
				<Avatar className="h-8 w-8 mr-2">
					<AvatarImage
						src={
							comment.user.profile_picture == ""
								? default_pfp
								: comment.user.profile_picture
						}
						alt="profile picture"
						className="user-thumbnail"
					/>
					<AvatarFallback>{geUsertInitials()}</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<div className="flex flex-row items-center mb-1">
						<h4 className="scroll-m-20 text-s font-semibold tracking-tight">
							{comment.user.fullname}
						</h4>
						<h4 className="scroll-m-20 text-xs font-semibold tracking-tight py-1 px-2 rounded-md bg-secondary ml-1">
							@{comment.user.username}
						</h4>
						<span className="text-neutral-400 ml-1">
							{UserRoleToCommentIcon[comment.user.user_role]}
						</span>
						{verified && (
							<span className="text-neutral-400 ml-1">
								<BadgeCheck size={20} />
							</span>
						)}
						<p className="flex flex-row items-center text-xs text-muted-foreground ml-2">
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
							<p className="mb-2">{commentDisplay}</p>
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
				{cur_user?.id == comment.user.id && (
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
									opacity:
										showSettingButton || showCommentSettings ? "100" : "0",
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
							{cur_user.user_role == UserRole.LECTURER && (
								<DropdownMenuItem
									className=""
									onClick={() => setVerified(!verified)}
								>
									{!verified ? <CheckCheck /> : <X />}
									&nbsp;
									{!verified ? "Verify" : "Remove Verification"}
								</DropdownMenuItem>
							)}
							<DropdownMenuItem onClick={() => setEditMode(true)}>
								<PenLine />
								&nbsp; Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-destructive"
								onClick={removingComment}
							>
								<Trash2 />
								&nbsp; Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
			<div id="comment-replies-block" className="ml-10">
				{openReplyTextbox && (
					<AddCommentBlock
						video={video}
						parent_comment_id={
							depth < maximumDepth
								? comment.id
								: parent_comment
								? parent_comment.id
								: null
						}
						setOpenReplyTextbox={setOpenReplyTextbox}
						setOpenReplies={
							depth < maximumDepth ? setOpenReplies : parent_setOpenReplies
						}
						setComments={null}
						comments={[]}
						setReplies={depth < maximumDepth ? setReplies : parent_setReplies}
						replies={depth < maximumDepth ? replies : parent_replies}
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
							parent_comment={depth < maximumDepth ? comment : parent_comment}
							parent_setOpenReplies={
								depth < maximumDepth ? setOpenReplies : parent_setOpenReplies
							}
							parent_setReplies={
								depth < maximumDepth ? setReplies : parent_setReplies
							}
							parent_replies={depth < maximumDepth ? replies : parent_replies}
							comment={reply}
							video={video}
							depth={depth + 1}
						/>
					))}
			</div>
		</div>
	);
}
