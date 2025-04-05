import Image from "next/image";
import Readme from "@/components/Readme";

export default function Home() {
	return (
		<main className="min-h-screen container mx-auto px-24 py-12 absolute">
			<Readme />
		</main>
	);
}
