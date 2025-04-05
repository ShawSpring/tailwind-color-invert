import fs from "node:fs/promises";
import path from "node:path";

const oppositePair = [["black", "white"]];
// regex for color shades
const regex_shades = /^\s.--color-([a-z]+)-(\d+):\s?(.*?)(?=;)/;
const regex_other = /^\s.--color-([a-zA-Z]+)(?:-([a-zA-Z]+))?:\s?(.*?)(?=;)/;
 
/**
 * inverts theme.css and outputs dark.css 
 * @param {string} themePath 
 * @param {string} outputPath 
 * @default themePath = "./node_modules/tailwindcss/theme.css"
 * @default outputPath = "./dark.css"
 */
export 	default async function invert(
	themePath = "./node_modules/tailwindcss/theme.css",
	outputPath = "./dark.css",
) {
	const { shadeColors, otherColors } = await parseColors(
		path.join(process.cwd(), themePath),
	);
	console.log(process.cwd());
	const invertedColors = {
		...invertOtherColors(otherColors),
		...invertShadeColors(shadeColors),
	};
	const original = { ...shadeColors, ...otherColors };
	const remainder = Object.keys(original).reduce((res, color) => {
		if (!invertedColors[color]) res[color] = original[color];
		return res;
	}, {});
	outputTheme(remainder, invertedColors, path.join(process.cwd(), outputPath));
}

/**
 * reads theme.css and returns colors object
 */
async function parseColors(filePath) {
	const shadeColors = Object.create(null);
	const otherColors = Object.create(null);
	let file;
	try {
		file = await fs.open(filePath, "r");
		for await (const line of file.readLines()) {
			const match = line.match(regex_shades);
			if (match) {
				const [, color, shade, value] = match;
				if (!shadeColors[color]) {
					shadeColors[color] = {};
				}
				shadeColors[color][shade] = value;
			} else {
				const otherMatch = line.match(regex_other);
				if (otherMatch) {
					const [, color, variant, value] = otherMatch;
					if (!otherColors[color]) {
						otherColors[color] = {};
					}
					otherColors[color][variant ?? "__default"] = value;
				}
			}
		}
	} catch (e) {
		console.error(e);
	} finally {
		if (file) await file.close();
	}
	return { shadeColors, otherColors };
}

function invertShadeColors(shadeColors) {
	const invertedColors = Object.create(null);
	for (const color in shadeColors) {
		if (!invertedColors[color]) {
			invertedColors[color] = Object.create(null);
		}
		for (const shade in shadeColors[color]) {
			const len = Object.keys(shadeColors[color]).length;
			if (len === 11) {
				const newShade = 1000 - Number.parseInt(shade);
				invertedColors[color][shade] = shadeColors[color][newShade.toString()];
			} else {
				throw new Error("not 11 shades");
			}
		}
	}
	return invertedColors;
}

function invertOtherColors(otherColors) {
	const invertedColors = Object.create(null);
	for (const pair of oppositePair) {
		invertedColors[pair[0]] = otherColors[pair[1]];
		invertedColors[pair[1]] = otherColors[pair[0]];
	}
	for (const color in otherColors) {
		const variants = Object.keys(otherColors[color]);
		// case: 2 variants like ['default','content'] which are extracted from '--color-primary' and '--color-primary-content'
		if (variants.length === 2) {
			invertedColors[color] = Object.create(null);
			invertedColors[color][variants[0]] = otherColors[color][variants[1]];
			invertedColors[color][variants[1]] = otherColors[color][variants[0]];
		}
	}
	return invertedColors;
}

async function outputTheme(remainder, invertedColors, outputPath) {
	let file;
	try {
		file = await fs.open(outputPath, "w");
		// await file.write(".dark {\n");
		await file.write(".dark:not(:where([class~=\"not-invert\"],[class~=\"not-invert\"] *)) {\n");
		await file.write("	color-scheme: dark;\n\n");

		let i = 0;
		for (const color in remainder) {
			if (i === 0)
				await file.write(
					"	/* haven't been inverted, preserve the original */\n",
				);
			for (const variant in remainder[color]) {
				const variantStr = variant === "__default" ? "" : `-${variant}`;
				await file.write(
					`	--color-${color}${variantStr}: ${remainder[color][variant]};\n`,
				);
			}
			if (i === Object.keys(remainder).length - 1)
				await file.write("	/* original colors end */\n");
			i++;
		}

		await file.write("\n");
		for (const color in invertedColors) {
			for (const shade in invertedColors[color]) {
				const shadeStr = shade === "__default" ? "" : `-${shade}`;
				await file.write(
					`	--color-${color}${shadeStr}: ${invertedColors[color][shade]};\n`,
				);
			}
			await file.write("\n");
		}
		await file.write("}\n");
		await file.close();
		console.log(`success!`);
		console.log(`generate inverted colors to ${outputPath}`);
	} catch (e) {
		console.error(e);
	} finally {
		if (file) await file.close();
	}
}
