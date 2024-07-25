//项目的根组件 App -> index.js ->public/index.html(root)
import {useState ,useRef, createContext, useContext,useEffect} from 'react'//必须放最前面
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

//父传子 1.父组件传递数据 子组件标签身上绑定属性 2.子组件接收数据 props的参数 子组件不能修改父组件
function Son(props){
  console.log(props);//对象
  return <div>this is son ,{props.name},{props.child},{props.children}</div>
}
// 子传父 在子组件调用父组件传递的函数并传递实参 解构赋值
function Son2({onGetSonMsg}){
  const sonMsg = 'sonMsg'
  return(<div>son <button onClick={()=>onGetSonMsg(sonMsg)}>sendMsg</button></div>)
}

//兄弟通信 子传父->父传子
function A({onGetAName}){
  const name = 'A name'
  return (
    <div>this is A compnent <button onClick={()=>onGetAName(name)}>send</button></div>
  )
}
function B({name}){
  return (
    <div>this is B compnent,{name}</div>
  )
}

//跨层通信 1.createContext 顶层provider 底层useContext
function A1(){
  return (
    <div>this is A compnent <B1/></div>
  )
}
function B1(){
  const msg =  useContext(MsgContext)
   return (
     <div>this is B compnent,{msg}</div>
   )
 }
const MsgContext = createContext()

//useEffect
const URL='http://geek.itheima.net/v1_0/channels' //接口
function Son3(){
  useEffect(()=>{
   const timer =  setInterval(()=>{
      console.log('定时器');
    },1000)
    return ()=>{
        clearInterval(timer)
    }
  }) //如果不清除 点击按钮之后还会继续计时
  return <div>son</div>
}

//Hook
function useToggle(){
  const [value1,setValue1] = useState(true)
  const toggle = ()=>setValue1(!value1)
  return{
    value1,
    toggle
  }
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

//实现双向绑定
const [value,setValue] = useState('')

//dom可用时 useRef钩子函数生成ref对象绑定到dom标签上 用ref.current获取dom
const inputRef = useRef(null)
const showDom = ()=>{
  console.log(inputRef.current);
  //用于显示一个对象的所有属性和方法
  console.dir(inputRef.current);
}

const name1 = '父传子'

const getMsg = (msg) =>{
  console.log(msg);
  setMsg(msg)
}
const [msg,setMsg] = useState('')

//兄弟通信
const [name,setName1] = useState('')
const getAName = (name) =>{
console.log(name)
setName1(name)
}

//跨层通信
const msg1 = 'msg'

//useEffect
useEffect(()=>{
// 获取频道列表 
async function getList(){
const res =  await fetch(URL) //获取异步资源的api
const list = await res.json()
console.log(list)
setList(list.data.channels)
 }
 getList()
},[])
const [list,setList] = useState([])
// useEffect(()=>{
//   console.log('副作用函数执行');
// })

useEffect(()=>{
  console.log('副作用函数执行');
},[count])

//组件卸载时自动执行清除副作用函数
const [show,setShow] = useState(true)

//Hook
const {value1,toggle} = useToggle()

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
        <h3>受控表单绑定</h3>
        <input type='text' value={value} onChange={(e)=>setValue(e.target.value)}/>
      </div>
      <div>
        <h3>react获取Dom</h3>
        <input type='text' ref={inputRef}/>
        <button onClick={showDom}>获取dom</button>
      </div>
      <div>
        <h3>组件通信（父子 兄弟 跨层）</h3>
        <Son name={name1} age={18} list={['vue','react']} cb={()=>console.log(123)} child={<span>span</span>}/>
        <Son>
          <span>嵌套</span>
        </Son>
        {msg}
        <Son2 onGetSonMsg={getMsg}/>

        <A onGetAName={getAName}/>
        <B name={name}/>

        <MsgContext.Provider value={msg1}>
          <A1/>
        </MsgContext.Provider>
      </div>
      <div>
        <h3>useEffect</h3>
        <p>useEffect(()= {} 副作用函数,[]放置依赖项，可选参 ，为空数组时只执行一次；
          不写会初始渲染+组件更新执行；添加特定依赖项会初始渲染+特性依赖项变化时执行) 渲染完毕加载数据
          </p>
        <ul>
          {list.map(item=><li key={item.id}>{item.name}</li>)}
        </ul>
        {show&&<Son3/>}
        <button onClick={()=>setShow(false)}>卸载son组件</button>
      </div>
      <div>
       {value1&& <h3>自定义Hook函数 use-- 实现逻辑封装和复用</h3>}
        <button onClick={toggle}>toggle</button>
      </div>
      <div>
        <h3>ReactHooks只能在组件内或者其他自定义Hook函数内使用,也不能在for,if,内使用</h3>
      </div>



    </div>
  );
}

export default App;
