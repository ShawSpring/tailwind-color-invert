// pages/markdown.js
import fs from "node:fs";
import path from "node:path";

import { remark } from "remark";
import remarkHtml from "remark-html";

import Highlighter from "./Highlighter";
// 读取 Markdown 文件
const filePath = path.join(process.cwd(), "../package/README.md");
const fileContent = fs.readFileSync(filePath, "utf8");  

// 使用 remark 将 Markdown 转换为 HTML
// const processedContent = await remark().use(remarkHtml).process(fileContent);
// const content = processedContent.toString();


import ReactMarkdown from "react-markdown";

const Readme = () => {
	return (
		<article className="prose prose-slate dark:prose-invert lg:prose-xl mx-auto">
			<ReactMarkdown
				components={{
					pre: ({ children }) => <p className="not-prose  *:rounded-md *:border-1  *:border-gray-400 *:shadow-xl">{children}</p>,
					code({ children, className, inline }) {
						// 匹配否指定语言
						const match: any = /language-(\w+)/.exec(className || "");
						return (
							<>
								{!inline ? (
									<Highlighter language={match?.[1]}>{children}</Highlighter>
								) : (
									<code className={className} style={inlineCodeStyle}>
										{children}
									</code>
								)}
							</>
						);
					},
				}}
			>
				{fileContent}
			</ReactMarkdown>
		</article>
	);
};

export default Readme;

