"use client";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function Highlighter({
	children,
	language,
}: { children: React.ReactNode; language?: string }) {
	const [dark, setDark] = useState(() => {
		return typeof window !== "undefined"
			? document.documentElement.classList.contains("dark")
			: "dark";
	});
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
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
			{mounted ? ( /* 挂载后才渲染主题 */
				<SyntaxHighlighter
					showLineNumbers={true}
					customStyle={{
						animation: "fade-in .3s ease-out",
					}}
					language={language}
					style={dark ? oneDark : oneLight}
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			) : ( 
				<SyntaxHighlighter
					showLineNumbers={true}
					customStyle={{
						opacity: 0.1,
					}}
					language={language}
					style={oneDark} /* 没挂载时使用默认主题占位 */
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			)}
		</>
	);
}

export default Highlighter;
