import React, {useState} from 'react';
import Post from "../components/Post";
import {IPost} from "../models/IPost";
import axios from "axios";
import "./HomePage.css"

interface HomePageProps {
    posts: IPost[]
    newsLoading: boolean
    fetchPosts: () => Promise<void>
}

const HomePage:React.FC<HomePageProps> = ({posts, newsLoading, fetchPosts}) => {
    const [parseLoading, setParseLoading] = useState<boolean>(false)

    const parsePosts = async () => {
        try {
            setParseLoading(true)
            await axios.post("http://localhost:7070/api/news/parse")
            await fetchPosts()
        } catch (e) {
            console.log(e)
        } finally {
            setParseLoading(false)
        }
    }

    return (
        <div>
            {
                newsLoading ?
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    :
                <>
                <button style={{position: "absolute", left: 80, top: 30}} className={"btn btn-outline-success"}
                        onClick={parsePosts}
                        disabled={newsLoading || parseLoading}>{!(newsLoading || parseLoading) ? "Обновить новости" : "Обновление..."}</button>
                {posts.map((post) => <Post key={post._id} post={post}/>)}
                </>
            }
        </div>
    );
};

export default HomePage;