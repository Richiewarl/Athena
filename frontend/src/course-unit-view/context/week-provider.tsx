import { createContext, useContext, useState } from "react";
import { WeekData } from "../apiTypes";

type WeekDataProps = {
	children: React.ReactNode;
};

type WeekDataProviderState = {
	week: WeekData | null;
	setWeek: (week: WeekData | null) => void;
};

const WeekDataContext = createContext<WeekDataProviderState | undefined>(
	undefined
);

export function WeekDataProvider({ children }: WeekDataProps) {
	const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);

	const value = {
		week: selectedWeek,
		setWeek: setSelectedWeek,
	};

	return (
		<WeekDataContext.Provider value={value}>
			{children}
		</WeekDataContext.Provider>
	);
}

export function useWeek() {
	const context = useContext(WeekDataContext);

	if (!context) {
		throw new Error("useWeek must be used within a WeekProvider");
	}

	return context;
}
