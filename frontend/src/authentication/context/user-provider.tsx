import { createContext, useContext, useState } from "react";
import { UserProfileData } from "../data/userTypes";

type UserDataProps = {
	children: React.ReactNode;
};

type UserDataProviderState = {
	user: UserProfileData | null;
	setUser: (user: UserProfileData | null) => void;
};

const UserDataContext = createContext<UserDataProviderState | undefined>(
	undefined
);

export function UserDataProvider({ children }: UserDataProps) {
	const [user, setUser] = useState<UserProfileData | null>(null);

	const value = {
		user: user,
		setUser: setUser,
	};

	return (
		<UserDataContext.Provider value={value}>
			{children}
		</UserDataContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserDataContext);

	if (!context) {
		throw new Error("useUser must be used within a UserDataProvider");
	}

	return context;
}
