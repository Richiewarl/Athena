import { Separator } from "@/components/ui/separator";
import ProfileForm from "./components/profile-settings-form";

export default function SettingsProfilePage() {
	return (
		<div className="flex flex-col items-center space-y-5 p-10 pb-16">
			<div className="mr-80 space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<ProfileForm />
			</div>
		</div>
	);
}
