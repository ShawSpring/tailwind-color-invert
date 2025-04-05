
// pages/markdown.js
import fs from "node:fs";
import path from "node:path";

import { remark } from "remark";
import remarkHtml from "remark-html";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

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
					code({ children, className, inline }) {
						// 匹配否指定语言
						const match: any = /language-(\w+)/.exec(className || "");
						return (
							<>
								{!inline ? (
									<SyntaxHighlighter
										showLineNumbers={true}
										language={match && match[1]}
										style={oneDark}
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
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
