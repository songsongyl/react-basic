import Login  from "../page/Login";
import Article from "../page/Article";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFound  from "../page/NotFound";
import {createBrowserRouter,createHashRouter} from 'react-router-dom'
//第一个需要后端支持，第二个不需要，只会在地址中间加#
const router = createHashRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/article/:id/:name',
        element:<Article/>
    },
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                // path:'board',
                //默认渲染出来
                index:true,
                element:<Board/>
            },
            {
                path:'about',
                element:<About/>
            }
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    }
])

export default router