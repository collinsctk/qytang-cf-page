export async function onRequest(context) {
  // 获取客户端IP地址
  const clientIp = context.request.headers.get('CF-Connecting-IP') || context.request.headers.get('X-Forwarded-For') || 'Unknown';
  
  // 返回纯文本响应
  return new Response(clientIp, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
} 