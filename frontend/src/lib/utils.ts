import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Tailwind to TS converter
export enum tailwindSize {
	SM,
	MD,
	LG,
	XLG,
	XXLG,
}

export function tailwindSizeWidthConverter(width: number) {
	if (width > 1536) {
		return tailwindSize.XXLG;
	} else if (width > 1280) {
		return tailwindSize.XLG;
	} else if (width > 1024) {
		return tailwindSize.LG;
	} else if (width > 768) {
		return tailwindSize.MD;
	} else {
		return tailwindSize.SM;
	}
}
