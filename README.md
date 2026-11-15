# Pathway · 中文 AI 职业成长平台（Starter v0.1）

一个可以运行、可部署到 Netlify 的 Mobile-first React 网站。视觉方向：破晓 × 旅程 × 希望感。

## 已完成

- 三步 AI Onboarding（演示版）
- 个性化首页、今日反思入口
- AI Career Manager 聊天页面（未配置密钥时使用明确标注的模拟回复）
- 职业方向、示例职位、JD 基础关键词识别
- 技能差距展示、成长任务勾选
- 用户资料编辑、本地演示数据清除
- 适配手机和桌面
- Netlify Functions AI API 示例、Supabase SQL 表与 RLS 策略草案

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:5173 。

## 部署到 Netlify

1. 将本项目上传到 GitHub 仓库。
2. 在 Netlify 中选择 **Add new project → Import an existing project**，连接仓库。
3. Build command: `npm run build`，Publish directory: `dist`。
4. 不配置 API 也可以运行前端演示。
5. 若要启用 AI：在 Netlify 的环境变量中添加 `OPENAI_API_KEY`，可选 `OPENAI_MODEL`；重新部署。
6. 不要把 API Key 放在 `VITE_` 开头的变量中，也不要提交 `.env` 文件。

**注意**：Vite 本地开发服务器不自动运行 Netlify Functions；要在本地测试真实 AI 接口，安装 Netlify CLI 并运行 `netlify dev`。部署到 Netlify 后，函数路径为 `/.netlify/functions/ai`。

## Supabase

`supabase/schema.sql` 是供下一阶段使用的初始数据库结构。当前网站尚未接入 Supabase Auth 或数据库读写，数据仅保存在本机浏览器的 localStorage。请不要在演示版输入敏感个人资料。正式启用 Supabase 前，应完成登录、RLS 验证、数据导出/删除、隐私政策和地区数据处理评估。

## Rork App

Rork 可以在后续单独创建 React Native App。推荐复用同一套 Supabase 数据模型和服务端 API，而不是直接复用 Web UI 代码。建议把通用 TypeScript 类型、业务逻辑和 API 协议迁移到共享包。

## 上线前必须完成

- 真实身份认证、Supabase 持久化和 RLS 安全测试
- 服务端 AI API 身份验证、速率限制、滥用防护和成本上限
- AI 记忆的用户确认机制及个人资料删除/导出
- 真实职位数据的授权与来源核验
- 模型输出质量评估、错误处理、监控和审计
- 香港与内地适用的数据隐私、跨境传输和部署合规评估

这是可运行的产品原型，不是已完成生产安全审计的商业上线版本。
