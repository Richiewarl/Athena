import { Separator } from "@/components/ui/separator";
import { UserAuthForm } from "./components/auth-form";
import { LibraryBig } from "lucide-react";
import { ModeToggle } from "@/components/theme-control/mode-toggle";
import AuthController from "./components/auth-controller";

export default function AuthenticationPage() {
	return (
		<>
			<AuthController />
			<div className="flex flex-row">
				<span className="ml-auto mr-1 mt-1">
					<ModeToggle />
				</span>
			</div>
			<div className="container relative hidden flex-col items-center justify-center h-[700px] md:flex lg:max-w-none lg:px-0">
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="flex flex-row items-center justify-center text-2xl font-semibold tracking-tight">
								<LibraryBig />
								&nbsp;Athena&nbsp;
								<LibraryBig style={{ transform: "scaleX(-1)" }} />
							</h1>
							<Separator />
							<h1 className="text-xl font-semibold tracking-tight">
								Create an account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email below to create your account
							</p>
						</div>
						<UserAuthForm />
					</div>
				</div>
			</div>
		</>
	);
}
