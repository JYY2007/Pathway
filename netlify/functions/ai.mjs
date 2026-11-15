// Server-side Netlify Function. API key never reaches the browser.
export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed',{status:405});
  const key=process.env.OPENAI_API_KEY;
  if (!key) return Response.json({error:'AI API not configured'},{status:503});
  try {
    const {messages,profile}=await request.json();
    if(!Array.isArray(messages)||messages.length>30) return Response.json({error:'Invalid messages'},{status:400});
    const clean=messages.slice(-12).filter(x=>['user','assistant'].includes(x.role)&&typeof x.content==='string').map(x=>({role:x.role,content:x.content.slice(0,3000)}));
    const system=`你是 Pathway 的中文 AI 职业成长导师。语气专业、温暖、充满希望，但不空泛。一次只问一个主要问题；不诊断心理状态，不保证就业结果。区别事实、用户自述和推测。优先用简洁中文回答。你只能使用传入的用户资料，不得假装拥有长期记忆。用户资料：${JSON.stringify({stage:String(profile?.stage||'').slice(0,100),goal:String(profile?.goal||'').slice(0,300),region:String(profile?.region||'').slice(0,50)})}`;
    const result=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',messages:[{role:'system',content:system},...clean],temperature:0.6,max_tokens:500})});
    if(!result.ok) return Response.json({error:'AI provider error'},{status:502});
    const data=await result.json();
    return Response.json({reply:data.choices?.[0]?.message?.content||'暂时无法生成回复，请重试。'});
  }catch{return Response.json({error:'Invalid request'},{status:400})}
};
export const config={path:'/api/ai'};
