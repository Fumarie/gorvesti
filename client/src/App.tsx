import React, {useEffect, useState} from 'react';
import './App.css';
import {IPost} from "./models/IPost";
import axios from "axios";
import PostPage from "./Pages/PostPage";
import {Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";

const monthNamesRu = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
];

const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function App() {
    const [posts, setPosts] = useState<IPost[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const data = await axios.get<IPost[]>("http://localhost:7070/api/news/")
                .then(response => response.data)
            const sortedData = data.sort((news1: IPost, news2:IPost) => {
                const date1 = formatDate(news1)
                const date2 = formatDate(news2)
                if(date1 > date2) return -1
                else return 1
            })
            sortedData.forEach(elem => {
                if(!elem.fullLink.includes("ru//")) {
                    console.log(elem.title)
                }
            })
            setPosts(sortedData)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (news: IPost) => {
        const splitDate = news.formattedTime.split(" ")
        const monthId = monthNamesRu.findIndex(month => month ===  splitDate[1])
        const engMonth = monthNamesEn[monthId]
        const date = splitDate[0]
        let year = "2021"
        if(monthId === 0) year = "2022"
        return new Date(`${engMonth} ${date}, ${year} ${splitDate[2]}:00`)
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
