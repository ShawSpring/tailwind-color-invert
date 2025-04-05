import type { Metadata } from "next";
import "@/styles/globals.css";

import Link from "next/link";
import ThemeToggle from "@/components/ToggleTheme";
import ColorFulText from "@/components/ColorFulText";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
				<body className="bg-gray-50 text-gray-900">
					<header className="w-full h-12 shadow flex items-center justify-center">
						<nav>
							<ul
								className="flex font-semibold text-2xl *:px-4 md:*:px-8
						*:hover:underline *:hover:brightness-50 dark:*:hover:brightness-150"
							>
								<li>
									<Link href="/">Home</Link>
								</li>
								<li>
									<Link href="/color-palette" className="whitespace-nowrap">
										<ColorFulText text="color-palette" />
									</Link>
								</li>
							</ul>
						</nav>
						<ThemeToggle />
					</header>
					{children}
				</body>
		</html>
	);
}
