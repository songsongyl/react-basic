import { useSearchParams ,useParams} from "react-router-dom"

const Article = ()=>{
//    const [params] = useSearchParams()
//    const id = params.get('id')
const params = useParams()
const id = params.id
const name = params.name
    return <div>文章{id}-{name}</div>
}
export default Article