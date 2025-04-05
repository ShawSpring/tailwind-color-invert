function Toggle({
	check,
	onChange,
}: { check: boolean; onChange?: () => void }) {
	return (
		<>
			<label className="relative flex w-16 h-8 border border-current/30 rounded-2xl cursor-pointer overflow-hidden">
				<input
					type="checkbox"
					hidden
					className="peer"
					checked={check}
					onChange={onChange}
				/>
				<span className="absolute inset-0 bg-sky-300 peer-checked:bg-gray-200 duration-200 delay-200"></span>
				<span className="h-4/5 aspect-square absolute top-1/2 left-1 transform -translate-y-1/2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className=" fill-amber-400 w-full h-full"
					>
						<title>Light</title>
						<g>
							<circle r="5" cy="12" cx="12"></circle>
							<path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
						</g>
					</svg>
				</span>
				<span className="h-4/5 aspect-square absolute top-1/2 right-1 transform -translate-y-1/2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 384 512"
						className="w-full h-full fill-yellow-300"
					>
						<title>Dark</title>
						<path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
					</svg>
				</span>
				<span className="absolute left-0 peer-checked:translate-x-[calc(4rem-100%)]
				 border-gray-900 peer-checked:border-gray-100 bg-zinc-300 peer-checked:bg-zinc-700 z-10 h-full aspect-square  rounded-full  duration-500"></span>
			</label>
		</>
	);
}

export default Toggle;
