const axios = require("axios")
const cheerio = require("cheerio")

const domen = 'https://gorvesti.ru'

const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
];

const getPage = async (url) => {
    try {
        return await axios.get(url).then(response => response.data)
    } catch (e) {
        // console.log(e)
        throw e
    }
}

const parse = async () => {
    let newsLinks = []
    for(let i = 1; i <= 5; i++) {
        const newLinks = await getNewsLinks(i)
        newsLinks.push(...newLinks)
    }

    const news = []

    for (const elem of newsLinks) {
        console.log(elem)
        const newsData = await getNewsInfo(elem)
        news.push(newsData)
    }

    return news
}

const getNewsLinks = async (pageNumber) => {
    const pageRef = `${domen}/feed/${pageNumber}`
    console.log(pageRef)
    const page = await getPage(pageRef).then(result => result).catch(async () => await getPage(pageRef))
    const $ = await cheerio.load(page)
    const newsLinks = []

    $('body > div.container-fluid.body > div > div > div > div.col-article.order-lg-1 > div > article > div.feed.feed-items > div:nth-child(1) > div.itm-body > div > div.itm-title > a')
        .each((i, elem) => {
            const href = $(elem).attr('href')
            newsLinks.push(href)
        })
    return newsLinks
}

const getNewsInfo = async (newsLink) => {
    const fullLink = domen + newsLink
    const page = await getPage(fullLink)
        .then(response => response)
        .catch(async () => await getPage(fullLink))
    const $ = await cheerio.load(page)

    const time = $('body > div.container-fluid.body > div > div > div > div.col-article.order-lg-1 > div > article > div.article-title-block > div > span > span').text()
    let formattedTime
    if(time[2] === ":") {
        const fullDate = new Date(Date.now())
        const date = fullDate.getDate()
        const month = fullDate.getMonth()
        formattedTime = `${date} ${monthNames[month]} ${time.split(' ')[0]}`
    }
    else {
        const splitTime = time.split(' ')
        formattedTime = `${splitTime[0]} ${splitTime[1]} ${splitTime[2]}`
    }

    const title = $('body > div.container-fluid.body > div > div > div > div.col-article.order-lg-1 > div > article > div.article-title-block > h1').text()

    let fullText = ''

    $('body > div.container-fluid.body > div > div > div > div.col-article.order-lg-1 > div > article > p')
        .each((i, elem) => {
            fullText += `${$(elem).text()}\n`
        })

    return {
        title,
        fullLink,
        formattedTime,
        fullText
    }
}

module.exports.parse = parse