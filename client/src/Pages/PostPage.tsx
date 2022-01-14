import React, {useCallback, useEffect, useState} from 'react';
import {IPost} from "../models/IPost";
import {Link, useLocation, useNavigate} from "react-router-dom";

interface PostPageProps {
    posts: IPost[],
    fetchPosts: () => Promise<void>
}

const PostPage:React.FC<PostPageProps> = ({posts, fetchPosts}) => {
    let location = useLocation()
    let navigate = useNavigate();
    function handleGoHome() {
        navigate("/");
    }
    const [post, setPost] = useState<IPost | null>(null)
    const findPost = useCallback((posts: IPost[]) => {
        const id = location.pathname.split("/")[2]
        console.log(id)
        return posts.find(post => post._id === id)
    }, [])

    useEffect(() => {
        const candidatePost = findPost(posts)
        if(candidatePost)
            setPost(candidatePost)
        else
           reloadPosts()
    },[posts])

    const reloadPosts = async () => {
        const reloadedPosts = await fetchPosts()
    }

    return (
        <div>
            {
                post ?
                    <div className="card text-center">
                        <div className="card-header">
                            {post.formattedTime}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.fullText}</p>
                            <button onClick={handleGoHome} className="btn btn-primary">Вернуться на главную</button>
                        </div>
                        <div className="card-header">
                            <a href={`${post.fullLink}`}>Источник</a>
                        </div>
                    </div>
                    : "No data yet"
            }
        </div>
    );
};

export default PostPage;