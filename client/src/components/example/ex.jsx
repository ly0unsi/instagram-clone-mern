import { useDispatch } from 'react-redux'
import { likePost } from './actions/postAction'
const dispatch = useDispatch()

return (
    <button onClick={() => dispatch(likePost(item))}>Like</button>
)