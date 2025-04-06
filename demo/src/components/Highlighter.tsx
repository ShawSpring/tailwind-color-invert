"use client";
import { use, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function Highlighter({
	children,
	language,
}: { children: React.ReactNode; language?: string }) {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					if (mutation.target instanceof HTMLElement) {
						if (mutation.target.classList.contains("dark")) {
							setDark(true);
						} else {
							setDark(false);
						}
					}
				}
			}
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => {
			observer.disconnect();
		};
	}, []);
	return (
		<>
			{
				<SyntaxHighlighter
					showLineNumbers={true}
					language={language}
					style={dark ? oneDark : oneLight}
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			}
		</>
	);
}

export default Highlighter;
