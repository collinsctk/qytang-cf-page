// 这个中间件处理所有请求，可以添加全局处理逻辑
export async function onRequest(context) {
  // 获取请求URL路径
  const url = new URL(context.request.url);
  const path = url.pathname;
  
  // 添加HTML基本防护头部（特意不添加XSS和SQL注入相关安全头部，因为我们要测试漏洞）
  const additionalHeaders = {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff', 
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
  
  try {
    // 继续处理请求
    const response = await context.next();
    const newResponse = new Response(response.body, response);
    
    // 为所有HTML响应添加标准头部
    if (
      response.headers.get('Content-Type') && 
      response.headers.get('Content-Type').includes('text/html')
    ) {
      Object.entries(additionalHeaders).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });
    }
    
    return newResponse;
  } catch (err) {
    // 出错时，返回500错误
    return new Response(
      `<!DOCTYPE html>
      <html lang="zh-CN">
      <head>
          <meta charset="UTF-8">
          <title>服务器错误</title>
      </head>
      <body>
          <h1>500 - 服务器错误</h1>
          <p>处理请求时发生错误: ${err.message}</p>
          <p><a href="/">返回首页</a></p>
      </body>
      </html>`, 
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      }
    );
  }
} 