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
import { Globe } from "lucide-react";

export default function CommunityButton() {
	return (
		<Button variant="outline">
			<Globe />
			<span className="text-md">
				&nbsp; {Math.floor(Math.random() * (50 - 400 + 1) + 400)} online
			</span>
		</Button>
	);
}
