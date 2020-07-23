import React from 'react';
import cls from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}
const Post = (props: PropsType) => {
  return (
    <div className={`${cls.item} ${cls.active}`}>
      <img src='https://img.bgxcdn.com/customers_avatars/20181215180042_561.jpg' alt='avatar'></img>
      <span>{props.message}</span>
      <div>
        <span> {props.likesCount} </span>
        <span>like</span>
        <span>     </span>
        <span>dislike</span>
      </div>
    </div>
  )
};

export default Post;