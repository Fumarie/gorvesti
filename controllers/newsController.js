const {parse} = require("../parse");
const mongoose = require("mongoose")
const News = require("../models/News")

const saveNewsToDb = async (news) => {
    const newsObject = new News(news)
    try {
        const candidate = await News.findOne({fullLink: news.fullLink})
        if(candidate) return
        await newsObject.save()
    } catch (e) {
        console.warn("Error saving news: ", news)
    }
}

class NewsController {
    async getAllNews(req, res) {
        try {
            const news = await News.find({})
            res.status(200).json(news)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting news'})
        }
    }

    async parseNews(req, res) {
        try {
            const newsList = await parse()
            if(!newsList.length) return res.status(200).json({message: "No news found"})
            // await newsList.forEach(async elem => await saveNewsToDb(elem))
            for(let news in newsList) {
               await saveNewsToDb(newsList[news])
            }
            res.status(200).json({message: "Parsed"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Error parse news"}, e)
        }
    }
}

module.exports = new NewsController()