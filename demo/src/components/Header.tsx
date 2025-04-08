"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ThemeToggle from "@/components/ToggleTheme";
import ColorFulText from "@/components/ColorFulText";

function Header() {
    const path = usePathname();
	return (
		<>
			<header className="fixed top-0 bg-gray-100 w-full h-12 shadow flex items-center justify-center">
				<nav>
					<ul
						className="flex font-semibold text-2xl *:px-4 md:*:px-8 *:py-1
						*:hover:underline *:hover:brightness-75 dark:*:hover:brightness-125"
					>
						<li className={path === "/" ? "bg-gray-300" : ""}>
							<Link href="/">Home</Link>
						</li>
						<li className={path === "/color-palette" ? "bg-gray-300" : ""}>
							<Link href="/color-palette" className="whitespace-nowrap">
								<ColorFulText text="color-palette" />
							</Link>
						</li>
					</ul>
				</nav>
				<ThemeToggle />
			</header>
		</>
	);
}

export default Header;
