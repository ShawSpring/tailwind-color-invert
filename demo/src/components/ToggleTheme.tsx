'use client';
import { useState } from "react";
import Toggle from "./Toggle";
function ToggleTheme() {
	const [isDark, setIsDark] = useState(false);
	function handleToggle() {
		document.documentElement.classList.toggle("dark");
		setIsDark(!isDark);
	}
	return (
		<div className="absolute top-2 right-4">
			<Toggle check={isDark} onChange={handleToggle}></Toggle>
		</div>
	);
}

export default ToggleTheme; 
