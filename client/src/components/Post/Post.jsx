import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
const Post = ({post,id}) => {
  return (
    <div className='Post' key={id}>
        <img src={post.img} alt="" />
            <div className="postReact">
                <img src={post.liked?Heart:NotLike} alt="" />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>
            <span style={{color: "var(--gray)", fontSize: '12px'}}>{post.likes} likes</span>

            <div className="detail">
                <span><b>{post.name}</b></span>
                <span> {post.desc}</span>
            </div>
     
    </div>
  )
}

export default Post