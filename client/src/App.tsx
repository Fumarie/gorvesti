import React, {useEffect, useState} from 'react';
import './App.css';
import {IPost} from "./models/IPost";
import axios from "axios";
import Post from "./components/Post";
import PostPage from "./Pages/PostPage";
import {Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
    const [posts, setPosts] = useState<IPost[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const data = await axios.get<IPost[]>("http://localhost:7070/api/news/")
                .then(response => response.data)
            const sortedData = data.sort((a, b) => {
                if(a.formattedTime > b.formattedTime) {
                    return -1
                } else {
                    return 1
                }
            })
            setPosts(sortedData)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage posts={posts} newsLoading={loading} fetchPosts={fetchPosts} />} />
                <Route path="post/:id" element={<PostPage posts={posts} fetchPosts={fetchPosts}/>} />
            </Routes>

        </div>
    );
}

export default App;
