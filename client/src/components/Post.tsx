import React from 'react';
import {IPost} from "../models/IPost";
import {Link} from "react-router-dom";

interface PostProps {
    post: IPost
}

const Post:React.FC<PostProps> = ({post}) => {

    const cutPostText = (postText: string) => {
        if (postText.length >= 153)
            return `${postText.slice(0, 155)}...`
        else
            return postText
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                {post.formattedTime}
            </div>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{cutPostText(post.fullText)}</p>
                <Link to={`post/${post._id}`} className="btn btn-primary">Читать далее</Link>
            </div>
        </div>
    );
};

export default Post;