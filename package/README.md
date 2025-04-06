
## tailwind-color-invert 
**a tailwind dark theme** by inverting Tailwind intrinsic color palette 
designed for **tailwindcss v4**, similar to [nightwind](https://nightwindcss.com/)

see [demo](https://shawspring.github.io/tailwind-color-invert/) 

### what it does
provides a css file that simplely invert shades and black/white, other colors will preserve as is;
```css
.dark {
	color-scheme: dark;

	--color-black: white;
	--color-white: black;

	--color-red-50: --color-red-950;
	--color-red-100: --color-red-900;
        ...
	--color-red-900: --color-red-100;
	--color-red-950: --color-red-50;
}

```


### usage

```bash
npm install tailwind-color-invert
```

in your css file that imports tailwindcss
```diff
@import "tailwindcss";

+ @import "tailwind-color-invert";

+ @custom-variant dark (&:where(.dark, .dark *));

```  
dont forget to add **dark** class to your root element  


### invert your own color palette
the invert function also exported so you can use it invert your color palette;
```js
import invert from "tailwind-color-invert/invert";
invert();
```
only provide ESM format


