import fs from "node:fs/promises";
import path from "node:path";

import { fileURLToPath } from "node:url";
import React from "react";
import { Color } from "@/components/color";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const styles = await fs.readFile(
	path.join(__dirname, "../../styles/theme.css"),
	"utf-8",
);
const colors: Record<string, Record<string, string>> = {};
for (const line of styles.split("\n")) {
	if (line.startsWith("  --color-")) {
		const [key, value] = line
			.split(":")
			.map((part) => part.trim().replace(";", ""));
		const match = key.match(/^--color-([a-z]+)-(\d+)$/);
		if (match) {
			const [, group, shade] = match;

			if (!colors[group]) {
				colors[group] = {};
			}

			colors[group][shade] = value;
		}
	}
}

export default function ColorPalette() {
	return (
		<>
			<div className="grid grid-cols-[auto_minmax(0,_1fr)] gap-4 w-6/7 max-w-[600px] mx-auto">
				<div className="grid grid-cols-2 col-start-2 gap-x-12 my-2 max-sm:py-1">
					<button
						type="button"
						className={
							"aspect-8/1 rounded-sm outline -outline-offset-1 \
                hover:ring sm:rounded-md bg-white outline-black/20"
						}
					/>
					<button
						type="button"
						className={
							"aspect-8/1 rounded-sm outline -outline-offset-1 \
                hover:ring sm:rounded-md bg-black outline-white/20"
						}
					/>
				</div>
				<div
					className="sticky top-12 z-9 col-start-2 grid grid-cols-11 justify-items-center gap-2 font-medium
					  *:rotate-180 *:[writing-mode:vertical-lr] bg-gray-50
	       py-2 max-sm:py-1 sm:gap-4 sm:*:rotate-0 sm:*:[writing-mode:horizontal-tb] "
				>
					<div>50</div>
					<div>100</div>
					<div>200</div>
					<div>300</div>
					<div>400</div>
					<div>500</div>
					<div>600</div>
					<div>700</div>
					<div>800</div>
					<div>900</div>
					<div>950</div>
				</div>
				{Object.entries(colors).map(([key, shades]) => (
					<React.Fragment key={key}>
						<p
							className={`md:text-base text-sm font-medium capitalize flex items-center justify-center px-2
								ring hover:ring-2`}
							style={{
								color: `var(--color-${key}-800)`,
							}}
						>
							{key}
						</p>
						<div className="grid grid-cols-11 gap-2 sm:gap-4">
							{Object.keys(shades).map((shade, i) => (
								<Color key={i} name={key} shade={shade} value={shades[shade]} />
							))}
						</div>
					</React.Fragment>
				))}

				<div className="pt-2 text-center text-gray-500 italic max-sm:hidden sm:col-span-2 md:col-span-1 md:col-start-2 dark:text-gray-400">
					Click to copy the OKLCH value or shift+click to copy the nearest hex
					value.
				</div>
			</div>
		</>
	);
}
