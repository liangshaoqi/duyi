script标签的async属性,在主线程中遇到script标签就会远程加载,但是不会停止解析dom,一旦script加载完成,就执行js,然后在继续执行解析dom   

script标签的defer属性,等待dom解析完成后在执行js,如果script标签中的type为module,则默认defer为true   

link标签中rel属性的preload: 不会阻塞dom解析,一般在主页的时候使用preload,一旦发现preload,马上就去拿,代表这个资源马上会被用到  
link标签中rel属性的prefetch: 不会阻塞dom解析,一般在主页之外的页面样式使用,代表以后可能会用到,是在浏览器空闲的时候获取资源  
