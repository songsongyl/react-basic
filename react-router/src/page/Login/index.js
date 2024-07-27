import {Link,useNavigate} from 'react-router-dom'
const Login = ()=>{
    const navigate = useNavigate()
    return(
        <div>
        登录
        {/* 声明式 */}
        <Link to='/article'>跳转到文章页</Link>
        {/* //命令式 */}
        <button onClick={()=>navigate('/article')}>跳转到文章页</button>
        <button onClick={()=>navigate('/article?id=100&name=jack')}>searchParams传参</button>
        <button onClick={()=>navigate('/article/1001/jack')}>Params传参</button>
        </div>
    )
}
export default Login