export default function PageFooter() {
	return (
		<>
			<div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
				<p className="text-balance text-center text-m leading-loose text-muted-foreground md:text-left">
					Built by{" "}
					<a
						href="https://github.com/Richiewarl"
						className="font-medium underline underline-offset-4"
					>
						Richiewarl
					</a>
					. The source code is on{" "}
					<a
						href="https://github.com/Richiewarl/Athena"
						className="font-medium underline underline-offset-4"
					>
						Github
					</a>
					. Much appreciation to the{" "}
					<a
						href="https://ui.shadcn.com/"
						className="font-medium underline underline-offset-4"
					>
						Shadcn
					</a>{" "}
					Library for the guidance and components.
				</p>
			</div>
		</>
	);
}
