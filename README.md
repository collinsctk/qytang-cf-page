# Cloudflare Pages 演示

这个项目展示了如何将原始的Cloudflare Worker页面转换为Cloudflare Pages托管版本。

## 项目结构

```
lab_4_worker/pages_version/            # 项目根目录
├── public/               # 静态资源文件夹
│   ├── index.html        # 主页
│   ├── xss.html          # XSS漏洞测试页面
│   ├── sql.html          # SQL注入测试页面
│   └── 404.html          # 404错误页面
│
├── functions/            # Cloudflare Pages Functions (服务器端代码)
│   ├── get-ip.js         # 获取客户端IP
│   └── _middleware.js    # 全局中间件
│
├── package.json          # 项目配置
└── README.md             # 说明文档
```

## 主要变更

与原始的Worker版本相比，主要变更包括：

1. 将HTML模板改为静态文件
2. 使用客户端JavaScript处理XSS和SQL注入测试
3. 使用Cloudflare Pages Functions处理动态内容（如获取客户端IP）

## 部署方法

### 通过Wrangler部署

1. 安装Wrangler CLI工具：
   ```
   npm install -g wrangler
   ```

2. 登录Cloudflare账户：
   ```
   wrangler login
   ```

3. 部署项目（在项目根目录运行）：
   ```
   npm run deploy
   ```
   
   **注意**：Wrangler会自动处理以下内容：
   - `public/` 目录中的所有静态文件
   - `functions/` 目录中的所有Pages Functions

### 通过Git部署

1. 将项目推送到GitHub或GitLab仓库
2. 在Cloudflare Dashboard中创建一个新的Pages项目
3. 连接到您的仓库
4. 设置构建配置：
   - 构建命令：留空（我们没有构建步骤）
   - 输出目录：`public`
   - 部署设置中确保"Functions"选项被启用

## Cloudflare Pages的工作原理

Cloudflare Pages按照以下约定部署项目：
1. `public/`目录中的文件作为静态内容提供服务
2. `functions/`目录中的JavaScript文件作为服务器端函数执行
   - `functions/api/hello.js` → 访问路径: `/api/hello`
   - `functions/_middleware.js` → 应用于所有请求的中间件

## 功能说明

这个项目包含三个主要页面：

1. **首页**：显示访问者的IP地址
2. **XSS漏洞测试**：故意包含XSS漏洞的页面，用于测试Cloudflare WAF
3. **SQL注入测试**：模拟SQL注入漏洞的页面，用于测试Cloudflare WAF

**注意**：这些测试页面故意包含安全漏洞，仅用于测试和教育目的。 