import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 配置参考 https://juejin.cn/post/7446951664816193551
  output:"export", //将项目导出为静态HTML文件
  // distDir:"out" //默认目录为 out
  basePath:"/tailwind-color-invert", // github pages 上只能是子路径
  assetPrefix:"/tailwind-color-invert", // 静态资源的访问前缀 
  trailingSlash: false,    // 是否在URL末尾添加斜杠
};

export default nextConfig;
