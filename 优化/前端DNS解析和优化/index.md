![Alt text](image.png)  
前端dns解析,在代码中如果有其它的域名链接的时候,可以将所有的域名遍历出来,然后动态的添加到头部的link标签中使用rel='dns-prefetch' href='域名'来提前异步解析,提升速度