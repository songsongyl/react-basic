//项目的根组件 App -> index.js ->public/index.html(root)
import {useState} from 'react'//必须放最前面
import './index.css'
const name = 'sy'
function getName(){
  return 'syl'
}
const list = [{id:1,name:'Vue'},{id:2,name:'Web'}]
const isLogin = true
const articleType = 3 //0 1 3
//根据文章类型返回不同模板
function getArticleTem(){
if(articleType === 0){
  return <div>无图</div>
}else if(articleType===1){
  return <div>单图</div>
}else{
  return <div>三图</div>
}
}
//事件参数e
const handleClick = (e)=>{
  console.log('button被点击了',e);
}
//自定义参数
const handleClick2 = (name,e)=>{
  console.log('button被点击了',name,e);
}
//定义组件
function Button(){
  return <button>Click</button>
}
//定义样式
const style = {
  border:'1px solid red',
  padding:'10px'
}


function App() {
  //必须放在里面 是替换不是修改 必须调用函数
  const [count ,setCount] = useState(0)
  const increment = ()=>{
    setCount(count+1)
  }
const [user ,setUser] = useState({name:'jack'})
const changeUser = ()=>{
  setUser({
    // ...user,
    name:'syl'})
}

  return (
    <div className="App">
      <div>
      <h3>js表达式的引用</h3>
      {name}
      {'sss'}
      {getName()}
      {new Date().getDate()}
      <div style={style}>
      使用js对象
      </div>
      </div>
      <div>
        <h3 className='ul'>渲染列表</h3>
         {/* 渲染列表 map循环哪个结构 还要加上一个唯一的key String 或number 用于react框架内部提升更新性能 */}
         <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
       </div>
      <div>
        <h3>条件渲染</h3>
      {/* 逻辑与&& */}
       {isLogin && <span>条件渲染</span>}
      {/* 三元运算？： */}
      {isLogin? <span>jack</span>: <span>loading...</span>}
      {getArticleTem()}
     </div>
     <div>
      <h3>事件绑定</h3>
        <button onClick={handleClick}>Click me</button>
        <button onClick={(e)=>handleClick2('jack',e)}>Click me</button>
     </div>
     <div>
      <h3>组件</h3>
      {/* 自闭合也可以 */}
      <Button ></Button>
     </div>
     <div>
      <h3>useState 可以向组件添加状态变量 数据控制渲染结果</h3>
      <button onClick={increment}>{count}</button>
      <button onClick={changeUser}>{user.name}</button>
     </div>
      <div>
        <h3>渲染b站评论列表</h3>
        
        
      </div>



    </div>
  );
}

export default App;
