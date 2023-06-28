import React, { useState, useMemo } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  //我们可以使用useMemo缓存expensiveValue的值，只有在count发生变化时才重新计算。
  const calculateExpensiveValue = useMemo(() => {
    // 模拟一个耗时的计算
    console.log("进行了昂贵的计算...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return result;
  }, [count]);

 

  return (
    <div>
      <p>计数器: {count}</p>
      <p>计数器2: {count2}</p>
      <p>昂贵的值: {calculateExpensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount2(count2 + 2)}>增加2</button>
    </div>
  );
};

export default Counter;