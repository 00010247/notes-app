const express = require('express')
const app = express()

const fs = require('fs')


app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

//localhost:8000
app.get('/', (req, res) => {
    res.render('home')
})

//this function gets the form and records to the database in form of json file
app.post('/create', (req, res) => {
    const title = req.body.title
    const body = req.body.body


    if (title.trim() === '' && body.trim() === '') {
        res.render('create', {error: true})
    } else {
        fs.readFile('./data/blogs.json', (err, data )=> {
            if (err) throw err

            const blogs = JSON.parse(data)

            blogs.push({
                id: id (),
                title: title,
                body: body,
            })

            fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err => {
                if (err) throw err

                res.render('create', {success: true})
            })
        } )
    }


    res.render('create')
})

app.get('/create', (req, res) => {
    res.render('create')
})

const blogs = ['Some awesome title', 'lorem ipsum']

app.get('/blogs', ((req, res) => {
    res.render('blogs', {blogs: blogs})
}))


app.get('/blogs/detail', (req, res) => {
    res.render('detail')
})


app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000...')
})


 function id () {

    return '_' + Math.random().toString(36).substr(2, 9);
}
