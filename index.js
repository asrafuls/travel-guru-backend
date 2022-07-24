const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express()
const port = 3001

// Heroku Mail: asrafuls027

require('dotenv').config();

app.use(cors())
app.use(bodyParser.json())

// Connect to mongodb
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.yqdvo.mongodb.net/${process.env.USER_DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Asrafuls Travel Guru. https://mxasraful.com')
})


client.connect(() => {
    const bannerCollection = client.db("travel-guru").collection("banner-items");

    const destinationData = [
        {
            title: "Cox's bazar",
            description: "Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south. Aggameda Khyang monastery is home to bronze statues and centuries-old Buddhist manuscripts. South of town, the tropical rainforest of Himchari National Park has waterfalls and many birds. North, sea turtles breed on nearby Sonadia Island.",
            price: '200',
            cId: "cx1",
            img: "https://cdn.bangladeshscenictours.com/wp-content/uploads/2019/11/Exploring-Coxs-Bazar-990x490.jpg",
            bg: 'https://fervent-ardinghelli-1b9493.netlify.app/1.png'
        },
        {
            title: "Sajek",
            description: "Sajek Tripuri Valley is one of the most popular tourist spots in Bangladesh situated among the hills of the Kasalong range of mountains in Sajek union, Baghaichhari Upazila in Rangamati District. The valley is 2,000 feet above sea level. Sajek Tripuri Valley is known as the Queen of Hills & Roof of Rangamati.",
            price: '100',
            cId: "sj1",
            img: "https://whatson.guide/wp-content/uploads/2018/02/171782_185994668099908_100000681295465_502955_3502055_o.jpg",
            bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sajek_Valley_2.jpg/1200px-Sajek_Valley_2.jpg'
        },
        {
            title: "St. Martin's",
            description: "Saint Martin is part of the Leeward Islands in the Caribbean Sea. It comprises 2 separate countries, divided between its northern French side, called Saint-Martin, and its southern Dutch side, Sint Maarten. The island is home to busy resort beaches and secluded coves. It's also known for fusion cuisine, vibrant nightlife and duty-free shops selling jewelry and liquor.",
            price: '160',
            cId: "st1",
            img: "https://travelvibe.net/wp-content/uploads/2021/03/Most-attractive-tourist-attraction-of-bangladesh-saint-martin-e1615271792566.jpg",
            bg: 'https://chokkhttps://www.theindependentbd.com/assets/news_images/St-Martin-as-its-territory.jpgor.com/wp-content/uploads/2018/10/Sreemangal.jpg'
        },
        {
            title: "Bandarban",
            description: "Bandarban is a district in South-Eastern Bangladesh, and a part of the Chittagong Division. It is one of the three hill districts of Bangladesh and a part of the Chittagong Hill Tracts, the others being Rangamati District and Khagrachhari District.",
            price: '160',
            cId: "bb1",
            img: "https://sgp1.digitaloceanspaces.com/cosmosgroup/news/y8eC0WBzPEEVyKIGGjcM3zKIgirEYLTLvioF3GaP.jpeg",
            bg: 'https://www.amazingtoursbd.com/tour_image/1605163051.jpg'
        },
        {
            title: "Rangamati",
            description: "Rangamati; is the administrative headquarters of Rangamati Hill District in the Chittagong Hill Tracts of Bangladesh. The town is located at 22°37'60N 92°12'0E and has an altitude of 14 metres. The district is administered by an office named as District Administration, Rangamati.",
            price: '160',
            cId: "rg1",
            img: "https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/details/6754470_suspension-bridge-kaptai-lake-rangamati.jpg",
            bg: 'https://ttg.com.bd/uploads/tours/plans/115_05jpg.jpg'
        },
        {
            title: "Sylhet",
            description: "Sylhet is a city in eastern Bangladesh, on the Surma River. It’s known for its Sufi shrines, like the ornate tomb and mosque of 14th-century saint Hazrat Shah Jalal, now a major pilgrimage site near Dargah Gate. The tiny Museum of Rajas contains belongings of the local folk poet Hasan Raja. A 3-domed gateway stands at the 17th-century Shahi Eidgah, a huge open-air hilltop mosque built by Emperor Aurangzeb.",
            price: '160',
            cId: "sy1",
            img: "https://cdn.getyourguide.com/img/tour/5728ce3b7284b.jpeg/146.jpg",
            bg: 'https://images.unsplash.com/photo-1599137248983-e6061c27ec80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3lsaGV0JTJDJTIwYmFuZ2xhZGVzaHxlbnwwfHwwfHw%3D&w=1000&q=80'
        },
        {
            title: "Sreemangal",
            description: "Sreemangal is an upazila of Moulvibazar District in the Sylhet Division of Bangladesh. It is located at the southwest of the district, and borders the Habiganj District to the west and the Indian state of Tripura to the south. ",
            price: '160',
            cId: "sr1",
            img: "https://img.locationscout.net/images/2017-01/sreemangal-bangladesh-1j57_l.jpeg",
            bg: 'https://chokkor.com/wp-content/uploads/2018/10/Sreemangal.jpg'
        },
        {
            title: "",
            description: "",
            price: '',
            cId: "",
            img: "",
            bg: ''
        }
    ]

    // Get all products
    app.get('/post', (req, res) => {
        bannerCollection.insertMany()
            .then(response => {
                res.send("Success")
            })
            .catch(err => {
                res.status(400).send("Bad request.")
            })
    })

    // Get All Banner Items
    app.get('/banner-items', (req, res) => {
        bannerCollection.find({})
            .toArray((error, data) => {
                res.status(200).send(data)
            })
    })




})

app.listen(process.env.PORT || port)