import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { AlertCircle, Bell, BellRing, Terminal } from "lucide-react";
import { useState } from "react";

export default function NotificationButton() {
	const [open, setOpen] = useState(false);

	const preset_notifs = [
		{
			title: "Your comment was liked!",
			description:
				'👍 Someone liked your comment: "The mitochondria is the powerhouse of the cell."',
			type: "default",
		},
		{
			title: 'A new video was added to: "Week 1: Athens and Sparta"',
			description:
				"There grew to be over 1,000 city-states in ancient Greece, but the main poleis were...",
			type: "default",
		},
		{
			title: "Uh oh! You have an overdue assignment to take.",
			description:
				'Your assignment: "Report on Greek City States" is overdue by a day.',
			type: "destructive",
		},
		{
			title: "A new quiz was added",
			description:
				'"Peloponnesian War recap" was added to "Week 1: Athens and Sparta',
			type: "default",
		},
	];

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost" size="icon">
						{open ? <Bell /> : <BellRing />}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Notifications</DialogTitle>
						<DialogDescription>
							{open ? "You are all up to date!" : "You have new notifications!"}
						</DialogDescription>
					</DialogHeader>
					{preset_notifs.map((notif, i) => (
						<span key={i}>
							{notif.type == "default" ? (
								<Alert
									variant="default"
									className={open ? "text-neutral-300" : ""}
								>
									<Terminal
										className="h-4 w-4"
										color={open ? "gray" : "white"}
									/>
									<AlertTitle className="mb-2">{notif.title}</AlertTitle>
									<AlertDescription>{notif.description}</AlertDescription>
								</Alert>
							) : (
								<Alert
									variant="destructive"
									className={open ? "text-red-400 border-red-300" : ""}
								>
									<AlertCircle className="h-4 w-4" />
									<AlertTitle className="mb-2">{notif.title}</AlertTitle>
									<AlertDescription className="font-semibold tracking-tight">
										{notif.description}
									</AlertDescription>
								</Alert>
							)}
						</span>
					))}
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="secondary" onClick={() => setOpen(true)}>
								{open ? "Close" : "Mark as Read"}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
