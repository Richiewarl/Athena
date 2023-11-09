"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxProps = {
	className?: string;
	data: any;
};

export function CourseUnitCombobox({ className, data }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[210px] justify-between"
				>
					{value
						? data.find((item: any) => item.value === value)?.label
						: "Select course unit..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[210px] p-0">
				<Command>
					<CommandInput placeholder="Search course units..." />
					<CommandEmpty>No course unit found.</CommandEmpty>
					<CommandGroup>
						{data.map((item: any) => (
							<CommandItem
								key={item.value}
								value={item.value}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? "" : currentValue);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === item.value ? "opacity-100" : "opacity-0"
									)}
								/>
								{item.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
