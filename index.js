const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const e = require('express');
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
    const destinationCollection = client.db("travel-guru").collection("destination-items");
    const tourCollection = client.db("travel-guru").collection("tour-items");
    const adminsCollection = client.db("travel-guru").collection("admins");

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

    // Tour Pacages
    const tourItems = [
        {
            title: "Cox's bazar Regular Trip",
            description: "Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south. Aggameda Khyang monastery is home to bronze statues and centuries-old Buddhist manuscripts. South of town, the tropical rainforest of Himchari National Park has waterfalls and many birds. North, sea turtles breed on nearby Sonadia Island.",
            price: 20000,
            cId: "cxreg1",
            imgs: [
                "https://cdn.bangladeshscenictours.com/wp-content/uploads/2019/11/Exploring-Coxs-Bazar-990x490.jpg",
                "https://www.travelandexplorebd.com/storage/app/public/posts/March2020/9hyD6VMjOYYQqvkX0YtS.jpg",
                "https://images.unsplash.com/photo-1650096893088-4c36f7d8f184?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                "https://images.unsplash.com/photo-1649779584147-9077c8016eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1142&q=80",
                "https://images.unsplash.com/photo-1608958723684-ffd89a6cca8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            ],
            day: 3,
            night: 2,
            gidePrice: false,
            destinations: [
                "Cox's bazar",
                "Inani Beach"
            ],
            destinationId: "cx1",
            bg: 'https://fervent-ardinghelli-1b9493.netlify.app/1.png',
            travelers: [
                {
                    name: "Adult",
                    id: "ad",
                    av: true,
                    start: 1,
                    end: 4,
                    person: 1
                },
                {
                    name: "Children",
                    id: "ch",
                    av: false,
                    start: 1,
                    end: 4,
                    person: 1
                },
                {
                    name: "Infant",
                    id: "in",
                    av: false,
                    start: 1,
                    end: 1,
                    person: 1
                }
            ],
            max: 12
        },
        {
            title: "Sajek 2 day 1 night",
            description: "Sajek Tripuri Valley is one of the most popular tourist spots in Bangladesh situated among the hills of the Kasalong range of mountains in Sajek union, Baghaichhari Upazila in Rangamati District. The valley is 2,000 feet above sea level. Sajek Tripuri Valley is known as the Queen of Hills & Roof of Rangamati.",
            price: 15000,
            cId: "sjreg1",
            imgs: [
                "https://cdn.pixabay.com/photo/2019/12/12/15/11/bangladesh-4690973_960_720.jpg",
                "https://images.unsplash.com/photo-1589307357838-9ce2259ac411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://cdn.pixabay.com/photo/2021/04/26/22/39/bangladesh-6210120_960_720.jpg",
                "https://cdn.pixabay.com/photo/2019/12/15/19/15/sajek-4697901_960_720.jpg",
                "https://cdn.pixabay.com/photo/2019/12/12/15/05/bangladesh-4690968_960_720.jpg",
                "https://cdn.pixabay.com/photo/2021/08/09/07/23/men-6532695_960_720.jpg"
            ],
            day: 2,
            night: 1,
            gidePrice: false,
            destinations: [
                "St. Martin's Island"
            ],
            destinationId: "sj1",
            bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sajek_Valley_2.jpg/1200px-Sajek_Valley_2.jpg',
            travelers: [
                {
                    name: "Adult",
                    id: "ad",
                    av: true,
                    start: 1,
                    end: 4,
                    person: 1
                },
                {
                    name: "Children",
                    id: "ch",
                    av: false,
                    start: 1,
                    end: 4,
                    person: 1
                },
                {
                    name: "Infant",
                    id: "in",
                    av: false,
                    start: 1,
                    end: 1,
                    person: 1
                }
            ],
            max: 12
        },
        {
            title: "St. Martin's Prmium Tour",
            description: "Saint Martin is part of the Leeward Islands in the Caribbean Sea. It comprises 2 separate countries, divided between its northern French side, called Saint-Martin, and its southern Dutch side, Sint Maarten. The island is home to busy resort beaches and secluded coves. It's also known for fusion cuisine, vibrant nightlife and duty-free shops selling jewelry and liquor.",
            price: 20000,
            cId: "stpre1",
            imgs: [
                "https://images.unsplash.com/photo-1606546008984-41818b01968a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
                "https://awalkintheworld.com/wp-content/uploads/2020/08/beach-saint-martins-island-bangladesh-1920x1080.jpg",
                "https://avijatrik.org/wp-content/uploads/2019/06/cover-3-870x555.jpg",
                "https://images.unsplash.com/photo-1585501296541-c2af5630245f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ],
            day: 2,
            night: 1,
            gidePrice: 200,
            destinations: [
                "St. Martin's Island"
            ],
            destinationId: "st1",
            bg: 'https://chokkhttps://www.theindependentbd.com/assets/news_images/St-Martin-as-its-territory.jpgor.com/wp-content/uploads/2018/10/Sreemangal.jpg',
            travelers: [
                {
                    name: "Adult",
                    id: "ad",
                    av: true,
                    start: 1,
                    end: 4,
                    person: 1
                },
                {
                    name: "Children",
                    id: "ch",
                    av: false,
                    start: 1,
                    end: 4,
                    person: 1
                },
                {
                    name: "Infant",
                    id: "in",
                    av: false,
                    start: 1,
                    end: 1,
                    person: 1
                }
            ],
            max: 12
        },
    ]

    // Destination Items
    const destinations = [
        {
            title: "Cox's bazar",
            cId: "cx1",
            img: "https://cdn.bangladeshscenictours.com/wp-content/uploads/2019/11/Exploring-Coxs-Bazar-990x490.jpg",
        },
        {
            title: "Sajek",
            cId: "sj1",
            img: "https://whatson.guide/wp-content/uploads/2018/02/171782_185994668099908_100000681295465_502955_3502055_o.jpg",
        },
        {
            title: "St. Martin's",
            cId: "st1",
            img: "https://travelvibe.net/wp-content/uploads/2021/03/Most-attractive-tourist-attraction-of-bangladesh-saint-martin-e1615271792566.jpg",
        },
        {
            title: "Bandarban",
            cId: "bb1",
            img: "https://sgp1.digitaloceanspaces.com/cosmosgroup/news/y8eC0WBzPEEVyKIGGjcM3zKIgirEYLTLvioF3GaP.jpeg",
        },
        {
            title: "Rangamati",
            cId: "rg1",
            img: "https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/details/6754470_suspension-bridge-kaptai-lake-rangamati.jpg",
        },
        {
            title: "Sylhet",
            cId: "sy1",
            img: "https://cdn.getyourguide.com/img/tour/5728ce3b7284b.jpeg/146.jpg",
        },
        {
            title: "Sreemangal",
            cId: "sr1",
            img: "https://img.locationscout.net/images/2017-01/sreemangal-bangladesh-1j57_l.jpeg",
        }
    ]

    const hdhdh = [
        {
            name: "Adult",
            id: "ad",
            av: true,
            start: 1,
            end: 4
        },
        {
            name: "Children",
            id: "ch",
            av: false,
            start: 1,
            end: 4
        },
        {
            name: "Infant",
            id: "in",
            av: false,
            start: 1,
            end: 1
        }
    ]

    // Post Initial Data
    app.get('/post', (req, res) => {
        tourCollection.insertMany(tourItems)
            .then(response => {
                res.send("Success")
            })
            .catch(err => {
                res.status(400).send("Bad request.")
            })
    })

    // Get all admin items
    app.get('/admins', (req, res) => {
        adminsCollection.find({})
        .toArray((error, data) => {
            res.send(data)
        }) 
    })

    // Get All Tour Items
    app.get('/tour-items', (req, res) => {
        if (req.query.desId) {
            tourCollection.find({})
                .toArray((error, data) => {
                    const filteredItems = data.filter(dt => dt.destinationId === req.query.desId)
                    res.status(200).send(filteredItems)
                })
        } else {
            tourCollection.find({})
                .toArray((error, data) => {
                    res.status(200).send(data)
                })
        }
    })

    // Get Tour Item
    app.get('/tour-item/:itemId', (req, res) => {
        tourCollection.findOne({ cId: req.params.itemId })
            .then((data) => {
                res.status(200).send(data)
            })
    })


    // Get All Destinason Items
    app.get('/destinason-items', (req, res) => {
        destinationCollection.find({})
            .toArray((error, data) => {
                res.status(200).send(data)
            })
    })

    // Get Destinason Item
    app.get('/destinason-item/:itemId', (req, res) => {
        destinationCollection.findOne({ cId: req.params.itemId })
            .then((data) => {
                res.status(200).send(data)
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