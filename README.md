# 执元料理管理系统

一个轻量级的餐饮/料理店综合管理后台，涵盖考勤打卡、考勤报表、原材料采购、采购报表及员工账号管理等功能，纯前端实现，数据存储在 [Supabase](https://supabase.com) 云端。

## 功能模块

**考勤打卡** — 员工每日选择"在岗"或"休息"状态完成打卡，每人每日最多修改 3 次。

**考勤报表** — 按月查询员工出勤统计（出勤天数、休息天数、出勤率），支持导出为 PDF 报表。

**原材料采购** — 管理员维护产品库（名称、单位、备注），员工勾选产品后提交采购订单。

**采购报表** — 按日期/员工查询订单记录，支持查看明细、编辑订单、导出 PDF。

**账号管理** — 管理员可新增、编辑、删除员工账号，重置员工密码。

**权限控制** — 管理员与普通员工角色分离，非管理员无法访问账号管理和报表生成等高危操作。

## 技术栈

- 纯 HTML + CSS + JavaScript（无框架依赖）
- [Supabase](https://supabase.com) 作为后端数据库
- [html2canvas](https://html2canvas.hertzen.com/) + [jsPDF](https://github.com/parallax/jsPDF) 实现 PDF 导出

## 项目结构

```
├── index.html           # 登录页 & 功能导航主页
├── attendance.html      # 考勤打卡
├── report.html          # 考勤报表（含统计预览 & PDF 导出）
├── store.html           # 原材料采购（产品管理 & 下单）
├── store_report.html    # 采购报表（订单查询、编辑、导出）
├── account.html         # 员工账号管理（增删改查）
├── supabase-config.js   # Supabase 连接配置
└── README.md
```

## 快速开始

### 1. 准备工作

注册 [Supabase](https://supabase.com) 账号，创建一个项目。

### 2. 创建数据库表

在 Supabase SQL Editor 中执行以下语句创建所需表：

```sql
-- 用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'employee',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 考勤记录表
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  date TEXT NOT NULL,
  month TEXT NOT NULL,
  status TEXT NOT NULL,
  reason TEXT,
  create_time BIGINT
);

-- 产品表
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  remark TEXT
);

-- 订单表
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  date TEXT NOT NULL,
  items JSONB,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 报表记录表
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  month TEXT NOT NULL,
  creator TEXT NOT NULL,
  total_users INTEGER,
  create_time BIGINT
);
```

### 3. 配置 Supabase 连接

编辑 `supabase-config.js`，将 `SUPABASE_URL` 和 `SUPABASE_KEY` 替换为你的 Supabase 项目凭证（在 Supabase 后台 **Settings → API** 页面获取）。

```js
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_KEY = "your-anon-key";
```

### 4. 创建初始管理员

在 Supabase 的 **Table Editor** 中，手动向 `users` 表插入一条管理员记录：

```json
{
  "username": "admin",
  "name": "管理员",
  "password": "admin123",
  "role": "admin"
}
```

### 5. 部署

将项目文件上传到任意静态托管服务即可，例如：

- [Netlify](https://www.netlify.com)（拖拽文件夹即可部署）
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)
- 任意 Nginx/Apache 静态服务器

## 使用说明

| 角色 | 权限 |
|------|------|
| 管理员 (admin) | 所有功能：考勤打卡、查看报表、生成 PDF、产品管理、采购下单、查看/编辑/删除订单、账号管理 |
| 员工 (employee) | 考勤打卡、采购下单、查看自己的订单（当日可编辑） |

**密码安全提示：** 当前版本密码以明文存储，适用于小团队内部使用。如需对外部署，建议开启 Supabase 的 Row Level Security (RLS) 并实现密码哈希。

## 浏览器兼容性

支持所有现代浏览器（Chrome、Firefox、Safari、Edge），同时兼容微信内置浏览器（PDF 导出在微信内需选择"在浏览器中打开"）。

## 作者

Tommy Chen

## 许可证

Copyright &copy; 2025 Tommy Chen. All rights reserved.
