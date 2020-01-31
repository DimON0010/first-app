import React from 'react';
import cls from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validftors/validators";
import {Textarea} from "../../common/FormsContols/FormsControls";

const maxLength15 = maxLengthCreator(15);

const newPostMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'myPostMessage'} placeholder={"Post text"} validate={[required, maxLength15]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};
const NewPostMessageRedux = reduxForm({ form: 'myPostMessage' })(newPostMessage);

const MyPosts = React.memo(props => {
    let addPost = (values) => {
        props.addPost(values.myPostMessage);
    };

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    return <div className={cls.content}>
        <div>
            My posts
            <div>
                <NewPostMessageRedux onSubmit={addPost} />
            </div>
            <div className={cls.item}>
                New posts
            </div>
            <div className={cls.posts}>
                {postsElements}
            </div>
        </div>
    </div>
});

export default MyPosts;