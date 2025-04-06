import Image from "next/image";
import Readme from "@/components/Readme";
import NoInvert from "@/components/noInvert";

export default function Home() {
	return (
	<>
			<main className="min-h-screen container mx-auto px-24 py-12">
				<Readme />
			</main>
			<footer>
				<NoInvert />
			</footer>
	</>
		
	);
}
