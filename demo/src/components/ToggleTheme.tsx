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
		<>
			<Toggle check={isDark} onChange={handleToggle}></Toggle>
		</>
	);
}

export default ToggleTheme;
