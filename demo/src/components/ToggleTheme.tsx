"use client";
import { useState } from "react";
import Toggle from "./Toggle";
function ToggleTheme() {
	const [isDark, setIsDark] = useState(() => {
		return typeof window !== "undefined"
			? document.documentElement.classList.contains("dark")
			: "dark";
	});

	function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
		setIsDark(!isDark);

		
		function callback() {
			localStorage.setItem("theme", isDark ? "light" : "dark");
			document.documentElement.classList.toggle("dark");
		}
		if (!document.startViewTransition) {
			return callback();
		}
		const viewTransition = document.startViewTransition(callback);

		//onChange的e对象不能获取坐标， 要么使用e.target的坐标,要么在onClick中(不行，react中状态变更是异步的，handToggle中拿不到新值)
		const { x, y } = e.currentTarget.getBoundingClientRect();
		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y),
		);
		const keyFrames = [
			`circle(0 at ${x + 8}px ${y + 4}px )`,
			`circle(${endRadius}px at ${x + 8}px ${y + 4}px)`,
		];
		viewTransition.ready.then(() => {
			document.documentElement.animate(
				{
					clipPath: isDark ? keyFrames : keyFrames.reverse(),
				},
				{
					duration: 500,
					pseudoElement: isDark
						? "::view-transition-new(root)"
						: "::view-transition-old(root)",
				},
			);
		});
	}
	return (
		<div className="absolute top-2 right-4">
			<Toggle check={isDark} onChange={handleToggle}></Toggle>
		</div>
	);
}

export default ToggleTheme;
