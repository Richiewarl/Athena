import { Separator } from "@/components/ui/separator";

export default function SettingsProfilePage() {
	return (
		<div className="hidden space-y-5 p-10 pb-16 md:block">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"></div>
		</div>
	);
}
