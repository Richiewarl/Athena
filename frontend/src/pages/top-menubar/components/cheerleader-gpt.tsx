import { useUser } from "@/authentication/context/user-provider";
import { UserRole } from "@/authentication/data/userDataMapper";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

export default function EncouragementButton() {
	const user = useUser().user;

	let title = "";
	let message = "";

	switch (user?.user_role) {
		case UserRole.STUDENT: {
			title = "A Quick Boost for Our Bright Students 🚀";
			message =
				"Take a moment to pat yourself on the back. You're diving into the depths of wisdom, exploring, and growing with each step. Remember, every challenge you face is a chance to sharpen your skills. Keep that curiosity burning bright, and don't forget to enjoy the journey. You're doing amazing! Keep shining!";
			break;
		}
		case UserRole.TEACHING_ASSISTANT: {
			title = "A Heartfelt Thank You to Our Dedicated Teaching Assistants 🌟";
			message =
				"In the hustle and bustle of academia, your role is invaluable. Your dedication, guidance, and support behind the scenes don't go unnoticed. You're the unsung hero, ensuring smooth sailing in the sea of learning. Take a moment to acknowledge your impact - you're making a real difference. Keep shining bright!";
			break;
		}
		case UserRole.LECTURER: {
			title = "A Little Reminder for Our Inspirational Lecturers 🎓";
			message =
				"Pause for a moment and appreciate the impact you're making. Your passion fuels minds, your wisdom lights the way, and your dedication shapes the future. Embrace each lesson with pride, knowing you're sculpting tomorrow's leaders. Take a breath, recharge, and keep inspiring. Your efforts are truly invaluable. Thank you for all you do!";
			break;
		}
	}

	return (
		<>
			{user && (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="ghost" size="icon">
							<Sparkles />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader className="space-y-3">
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>Dear {user.fullname}:</DialogDescription>
						</DialogHeader>
						<p className="text-m leading-7">{message}</p>
						<DialogFooter>
							<Button variant="secondary" disabled>
								I'd like more
							</Button>
							<DialogClose asChild>
								<Button>Continue</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
