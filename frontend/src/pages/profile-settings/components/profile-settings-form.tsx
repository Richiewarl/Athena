import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	NewUserProfileData,
	UserProfileData,
	UserSessionData,
} from "@/authentication/data/userTypes";
import { useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";
import { UserRoleCardSelect } from "./user-role-cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createNewUser, getUserByUsername } from "@/authentication/data/api";
import { updateUserProfile } from "../data/api";
import { useEffect, useState } from "react";
import { getUserSessionData } from "@/authentication/data/utils";
import { getUrlRegEx } from "@/utils";

export default function ProfileForm() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [user, setUser] = useState<UserProfileData | null>(null);

	const userSessionData: UserSessionData = getUserSessionData();

	useEffect(() => {
		getUserByUsername(userSessionData.username ?? "")
			.then((res) => {
				setUser(res.data);

				form.setValue("profile_picture", res.data.profile_picture);
				form.setValue("user_role", res.data.user_role.toString());
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	// 1. Define form schema
	const formSchema = z.object({
		fullname: z.string().min(1).max(300),
		username: z.string().min(1).max(150),
		profile_picture: z.string(),
		user_role: z.string(),
	});

	// 2. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullname: user ? user.fullname : userSessionData.fullname,
			username: user ? user.username : userSessionData.username,
			profile_picture: user ? user.profile_picture : "",
			user_role: user ? user.user_role.toString() : "0",
		},
	});

	// 3. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const newUser: NewUserProfileData = {
			...values,
			user_role: Number(values.user_role),
			external_auth: user?.external_auth ?? false,
		};

		// if user does not exists in DB
		if (!user) {
			createNewUser(newUser)
				.then((res) => {
					toast({
						description: "Profile Succesfully Saved.",
						variant: "success",
					});
					navigate(paths.Homepage);
				})
				.catch((error) => {
					toast({
						title: "Uh oh! Something went wrong.",
						description:
							error.message +
							". There was a problem creating your initial profile settings.",
						variant: "destructive",
					});
				});
		} else {
			updateUserProfile(user.id, newUser)
				.then((res) => {
					toast({
						description: "Profile Succesfully Saved.",
						variant: "success",
					});
					navigate(paths.Homepage);
				})
				.catch((error) => {
					toast({
						title: "Uh oh! Something went wrong.",
						description:
							error.message +
							". There was a problem updating your profile settings.",
						variant: "destructive",
					});
				});
		}
	};

	const handleCancel = () => {
		if (!user) {
			navigate(paths.LoginPage);
		} else {
			navigate(paths.Homepage);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="fullname"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="user-settings-fullname-input">
								Fullname
							</FormLabel>
							<FormControl>
								<Input
									id="user-settings-fullname-input"
									placeholder={"John Doe"}
									{...field}
									disabled={
										user ? user.external_auth : userSessionData.external_auth
									}
								/>
							</FormControl>
							<FormDescription>
								Your full, legal name, as it would appear on official documents.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="user-settings-username-input">
								Username
							</FormLabel>
							<FormControl>
								<Input
									id="user-settings-username-input"
									placeholder={"johndoe2001"}
									{...field}
									disabled={
										user ? user.external_auth : userSessionData.external_auth
									}
								/>
							</FormControl>
							<FormDescription>
								A unique name you'd like to be identified by on our platform.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="profile_picture"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="user-settings-propic-input">
								Profile Picture
							</FormLabel>
							<FormControl>
								<Input
									id="user-settings-propic-input"
									placeholder={"https://github.com/shadcn.png"}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The URL to an image you would like to use as your profile
								picture. Ensure the link is direct and accessible.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="user_role"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="user-settings-role-input">
								User Role
							</FormLabel>
							<FormControl>
								<UserRoleCardSelect {...field} user={user} />
							</FormControl>
							<FormDescription>
								Your role within our community. Select the option that best
								describes you.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-row">
					<div className="space-x-2 ml-auto">
						<Button variant="outline" onClick={handleCancel}>
							Cancel
						</Button>
						<Button type="submit">Continue</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
