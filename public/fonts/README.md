# Shopee2021 字体文件（可选）

全局已在 `globals.css` 中声明 `Shopee2021`，并优先使用本机已安装的字体。

若需在未安装字体的环境显示一致效果，请将官方字体文件放到此目录，文件名与 `globals.css` 中 `@font-face` 的 `url()` 一致即可，例如：

- `Shopee2021-Regular.woff2` / `.woff`（400）
- `Shopee2021-Medium.woff2` / `.woff`（500）
- `Shopee2021-Bold.woff2` / `.woff`（700）

若你手上的文件名不同，可改 `src/app/globals.css` 里的 `url("/fonts/...")` 路径。
