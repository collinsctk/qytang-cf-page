#!/bin/bash

# 部署Cloudflare Pages项目脚本
echo "===== Cloudflare Pages 部署脚本 ====="
echo ""

# 检查wrangler是否安装
if ! command -v wrangler &> /dev/null
then
    echo "wrangler未安装，正在安装..."
    npm install -g wrangler
fi

# 检查登录状态
echo "检查Cloudflare账户登录状态..."
if ! wrangler whoami &> /dev/null
then
    echo "您尚未登录Cloudflare账户，开始登录流程..."
    wrangler login
else
    echo "已登录Cloudflare账户"
fi

# 部署项目
echo ""
echo "开始部署项目..."
echo "这将自动上传public/目录中的静态文件和functions/目录中的函数。"
echo ""

wrangler pages publish --project-name qytang-cloudflare .

echo ""
echo "部署完成！"
echo "访问Cloudflare控制面板查看您的项目: https://dash.cloudflare.com/"
echo "" 