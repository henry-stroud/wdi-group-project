# WDI-Project 3
# General Assembly Project 3:  A MERN Stack App

## Goal: To create a Full-Stack application using Mongoose, Express, React and Node.js
### Timeframe
1 week

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* React.js
* Mongoose, MongoDB
* Express
* Node.js
* IGDB Data API v3
* GitHub
* FileStack
* SASS
* Mocha


## My Project - Player Connect

![Player Connect](https://github.com/henry-stroud/wdi-group-project/blob/master/img/homepage.png?raw=true)

You can find a hosted version here ----> [player-connect.herokuapp.com/](http://player-connect.herokuapp.com/)

### Overview

Player Connect is a social network for gamers. The app allows for users to register and login. Once a user is logged in they choose their favourite 6 games, (served from the IGDB (Internet Game DataBase)) API, as well as a profile picture (uploaded via FileStack's API). Once users have created their profiles they are able to review and comment on any game in the world, as well as chat live via the chatbox. The site also displays up to date gaming news from IGN via News API as well as videos to watch.  

### Brief
- **Build a full-stack application** build both backend and front-end
- **Use an Express API** and serve data from a Mongo database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Consume at least **one public API** to enhance the app
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **Have a visually impressive design**
- **Be deployed online** so it's publicly accessible.
- **Have automated tests** for _at least_ one RESTful resource on the back-end.

### Process

We began the project by exchanging possible ideas for the application, we settled on the idea of a social network for computer gamers that used an external API, IGDB (Internet Game Database). We decided to partition the initial workload, using a Trello board to determine the tasks that needed to be done as well as assigning these tasks to each team member.

![screenshot - Trello Board](https://github.com/henry-stroud/wdi-group-project/blob/master/img/Trello.png?raw=true)

After we had laid out the initial work to be done, we set about building the wireframes for the project. We decided on a multi-page layout with an option for login and exclusive content to logged in users.

![screenshot - Login Page - WireFrame](https://github.com/henry-stroud/wdi-group-project/blob/master/img/wireframe2.png?raw=true)

![screenshot - Home Page - WireFrame](https://github.com/henry-stroud/wdi-group-project/blob/master/img/wireframe3.png?raw=true)

![screenshot - Game Page - WireFrame](https://github.com/henry-stroud/wdi-group-project/blob/master/img/wireframe4.png?raw=true)

The project work was divided between the three of us, I focused mainly on the back-end models, the live chatbox powered by socket.io, as well as the relationship between our API, IGDB's API and the React Front-End.

I studied the documentation for the IGDB API and quickly found that they used Apicalypse, a minimalistic query language for RESTful APIs. I had to learn the basics of this before being able to execute GET requests to the API, which was a little time-consuming. Once I had figured this out, I delved into making a series of requests - finding that the API was structured in a way that meant I had to make multiple requests to achieve the data I needed.

![screenshot - Home Page](https://github.com/henry-stroud/wdi-group-project/blob/master/img/homepage.png?raw=true)

I then set about building the back-end wireframes, before structuring the models using the ODM library for MongoDB, Mongoose. I decided to use three main models for the games, messages, and users. Below is a code snippet of the game model, which has user ratings and comments embedded, it also has a virtual field on the game for the average user rating over the whole site.

```

const userRatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', autopopulate: true },
  userRating: { type: Number, min: 0, max: 100}
})


const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', autopopulate: true },
  text: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const gameSchema = new mongoose.Schema({
  gameId: { type: Number },
  name: {type: String },
  color: {type: String},
  userRating: [ userRatingSchema ],
  userComment: [ commentSchema ]
})


gameSchema.virtual('avgRating')
  .get(function() {
    return Math.round(this.userRating.reduce((acc, cv) => {
      return acc + cv
    }, 0) / this.userRating.length)
  })

gameSchema.set('toJSON', { virtuals: true })
```

Once the back-end had been built and I had successfully tested the routes in Insomnia, I began work on the front-end mapping out the data incoming from the News API as well as IGDB.

My teammates were at this point focusing on building the framework of the site, displaying the data pulled in by the API in a readable and presentable way and building tests for the chatbox routes.

I had to figure out a way to attach the external data from IGDB, to our own models - without scraping the entire database. I settled on the idea of only adding a reference to the game to our back-end once a user had clicked on it, and attaching our own ratings and comments to that reference, then displaying that to the user. This code is displayed below:

```

function getGame( req, res ) {
  console.log(req.body.gameId)
  Game
    .findOne({ gameId: req.body.gameId})
    .then(game => {
      if (!game) {
        req.body.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        return Game
          .create(req.body)
      }
      return game
    })
    .then(game => res.status(200).json(game))
    .catch((err) => res.json(err))
}
```

Once we had the back-end built, we focused on the front-end display of the information. Most of the data in our app is passed down through props via React-Router's Link component, allowing us to create a versatile multi-page site.

Throughout the process we did daily standups in the morning, as we each explained the code we had committed in the evenings. During the day we sat in a group and coded on our individual components, coming together on any complex problems as well as communicating our goals for that day.

![screenshot - Log In](https://github.com/henry-stroud/wdi-group-project/blob/master/img/login.png?raw=true)

![screenshot - Game Forum](https://github.com/henry-stroud/wdi-group-project/blob/master/img/gameshow.png?raw=true)

![screenshot - Social / Chatbox](https://github.com/henry-stroud/wdi-group-project/blob/master/img/chatroom.png?raw=true)

![screenshot - User Profile](https://github.com/henry-stroud/wdi-group-project/blob/master/img/usershow.png?raw=true)


### Challenges

One of the main challenges was displaying some of the data from the back-end in the front-end, especially the user comments on the user profile. I realised after I had built the back-end and structured the site around it, I should have made the comments referenced rather than embedded, as it gave me a host of problems displaying it, and I had to use a lot of map and filter methods to rectify the situation.

### Wins

One of the biggest wins was getting socket.io to work on the chatbox, allowing for a live chat between users on the site. View the server-side code below:

```
const server = app.listen(port, () => console.log(`App is listening on port ${port}`))

const socket = require('socket.io')
const io = socket(server)

io.on('connection', (socket) => {
  console.log(`socket is running, socket id: ${socket.id}`)

  socket.on('sendMessage', function(data) {
    io.emit('receiveMessage', data)
  })
})

module.exports = app
```

Client-side code:

```
class Chat extends React.Component {
  constructor(){
    super()

    this.state = { redirect: false, data: {}, errors: {} }

    this.socket = io('localhost:4000')

    this.sendMessage = (allMessages) => {
      this.socket.emit('sendMessage', (allMessages))
    }

    this.socket.on('receiveMessage', function(data){
      addMessage(data)
    })

    const addMessage = data => {
      this.setState({ messages: data })
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getMessages = this.getMessages.bind(this)

  }

  componentDidMount() {
    this.getMessages()
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/messages', this.state.data, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then(() => axios.get('/api/messages'))
      .then((res)=> this.setState({...this.state, messages: res.data}))
      .then(() => this.sendMessage(this.state.messages))
      .then(() => this.setState({data: {}}))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

```

## Future features

In retrospect the way that we passed down props to each component means that the site is not easily navigable, as users cannot simply go to a url for a game.

I would like to have made the app much more responsive, as well as being responsive on mobile. Unfortunately due to time constraints we prioritised the functionality over responsiveness, which in hindsight may have been an oversight.

## Key Takeaways

One of the key learnings from this project was the use of Git. We had to rectify several merge conflicts when we first began the project as we were all learning the basics of group based project work. Eventually we decided the partition work on separate components to avoid git conflicts as well as having one git master who controlled the commits to the master branch. I learnt a lot about back-end model structuring during the project, and also routing. It was probably the most challenging project we had to undertake, and a clear team plan and structure was essential for success.
