import { createContext, useContext, useState } from "react";
import { CourseUnitData } from "../data/apiTypes";

type CourseUnitDataProps = {
	children: React.ReactNode;
};

type CourseUnitDataProviderState = {
	selectedCourseUnit: CourseUnitData | null;
	setSelectedCourseUnit: (video: CourseUnitData | null) => void;
};

const CourseUnitContext = createContext<
	CourseUnitDataProviderState | undefined
>(undefined);

export function CourseUnitDataProvider({ children }: CourseUnitDataProps) {
	const [selectedCourseUnit, setSelectedCourseUnit] =
		useState<CourseUnitData | null>(null);

	function test(courseUnit: CourseUnitData | null) {
		setSelectedCourseUnit(courseUnit);
	}

	const value = {
		selectedCourseUnit: selectedCourseUnit,
		setSelectedCourseUnit: setSelectedCourseUnit,
	};

	return (
		<CourseUnitContext.Provider value={value}>
			{children}
		</CourseUnitContext.Provider>
	);
}

export function useCourseUnit() {
	const context = useContext(CourseUnitContext);

	if (!context) {
		throw new Error("useCourseUnit must be used within a VideoDataProvider");
	}

	return context;
}
