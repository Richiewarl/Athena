import { createContext, useContext, useState } from "react";
import { WeekData } from "../data/apiTypes";

type WeekDataProps = {
	children: React.ReactNode;
};

type WeekDataProviderState = {
	selectedWeek: WeekData | null;
	setSelectedWeek: (week: WeekData | null) => void;
	weeks: WeekData[];
	setWeeks: (weeks: WeekData[]) => void;
};

const WeekDataContext = createContext<WeekDataProviderState | undefined>(
	undefined
);

export function WeekDataProvider({ children }: WeekDataProps) {
	const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
	const [weeks, setWeeks] = useState<WeekData[]>([]);

	const value = {
		selectedWeek: selectedWeek,
		setSelectedWeek: setSelectedWeek,
		weeks: weeks,
		setWeeks: setWeeks,
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
		throw new Error("useWeek must be used within a WeekDataProvider");
	}

	return context;
}
