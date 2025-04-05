const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

function ColorFulText({ text }: { text: string }) {
	const colors = [
		"text-amber-500",
		"text-indigo-400",
		"text-cyan-600",
		"text-pink-600",
		"text-emerald-300",
		"text-purple-800",
	];
	return (
		<>
			{Array.from(text).map((char, i) => {
				return (
					<span key={i} className={shuffle(colors)[i % colors.length]}>
						{char}
					</span>
				);
			})}
		</>
	);
}

export default ColorFulText;
