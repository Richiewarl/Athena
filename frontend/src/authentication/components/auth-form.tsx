"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Loader2, School2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	// University of Manchester Authentication Service
	const navigate = useNavigate();
	const handleUoMLogIn = () => {
		setIsLoading(true);
		navigate(paths.UoMAuth);
		setIsLoading(false);
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-3">
						<Label className="sr-only" htmlFor="user-input-email">
							Email
						</Label>
						<Input
							id="user-input-email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled
						/>
						<Label className="sr-only" htmlFor="user-input-password">
							Password
						</Label>
						<Input
							id="user-input-password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							autoComplete="off"
							autoCorrect="off"
							disabled
						/>
					</div>
					<Button disabled>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Create your Account
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="secondary" disabled>
				Login with Account
			</Button>
			<Button
				variant="secondary"
				type="button"
				disabled={isLoading}
				onClick={handleUoMLogIn}
				className="bg-manchester text-manchester-foreground"
			>
				{isLoading ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<School2 className="mr-2 h-4 w-4" />
				)}{" "}
				University of Manchester Account
			</Button>
		</div>
	);
}
