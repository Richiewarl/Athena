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

import { UserSessionData } from "@/authentication/data/userTypes";
import { useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";
import { UserRoleCardSelect } from "./user-role-cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileForm() {
	const navigate = useNavigate();
	const { toast } = useToast();

	const userJson = localStorage.getItem("user-data");
	let user: UserSessionData | null = null;

	if (userJson) {
		user = JSON.parse(userJson);
	} else {
		navigate(paths.LoginPage);
	}

	// 1. Define form schema
	const formSchema = z.object({
		fullname: z.string().min(1).max(300),
		username: z.string().min(1).max(150),
		profile_picture: z.string(),
		user_role: z.number().min(0).max(3),
	});

	// 2. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullname: user?.fullname ? user?.fullname : "",
			username: user?.username ? user?.fullname : "",
			profile_picture: "",
			user_role: 0,
		},
	});

	// 3. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		// postCourseUnit(values)
		// 	.then((res) => {
		// 		toast({
		// 			title: "Course Unit Succesfully Added",
		// 			description: `${values.course_code}: ${values.title}`,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		toast({
		// 			title: "Uh oh! Something went wrong.",
		// 			description: error.message + ". We could not add your course unit.",
		// 			variant: "destructive",
		// 		});
		// 	});
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
									disabled={user?.CASAuth}
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
									disabled={user?.CASAuth}
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
								<UserRoleCardSelect />
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
						<Button variant="outline" onClick={() => navigate(paths.Homepage)}>
							Cancel
						</Button>
						<Button type="submit">Continue</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
