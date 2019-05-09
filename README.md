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

## My Project - Player Connect

![Player Connect](https://github.com/henry-stroud/wdi-group-project/blob/master/img/homepage.png?raw=true)

You can find a hosted version here ----> [player-connect.herokuapp.com/](http://player-connect.herokuapp.com/)

### Overview

Player Connect is an application that performs as a social network for gamers. The app allows for user register and login, once a user is logged in they choose their favourite 6 games, served from the IGDB database, as well as uploading a profile picture (via FileStack's API). Once user's have created their profile they are able to review and comment any game in the world, as well as chat live via the chatbox. The site also displays up to date gaming news via IGN's API as well as video recommendations.  

### Brief
- **Build a full-stack application** build both backend and front-end
- **Use an Express API** to serve data from a Mongo database
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

The project work was divided between the three of us, I focused mainly on the back-end models, the live chatbox powered by socket.io, as well as the relationship between our API, IGDB's API and the Front-End.

I studied the documentation for the IGDB API and quickly found that they used Apicalypse, a minimalistic query language for RESTful APIs. I had to learn the basics of this before being able to execute GET requests to the API, which was a little time-consuming. Once I had figured this out, I delved into making a series of requests - finding that the API was structured in a way that meant I had to make multiple requests to achieve the data I needed.

![screenshot - Home Page](https://github.com/henry-stroud/wdi-group-project/blob/master/img/homepage.png?raw=true)

I then set about building the back-end wireframes, before structuring the Mongo database out.

![screenshot - Log In](https://github.com/henry-stroud/wdi-group-project/blob/master/img/login.png?raw=true)


![screenshot - Game Forum](https://github.com/henry-stroud/wdi-group-project/blob/master/img/gameshow.png?raw=true)

![screenshot - Social / Chatbox](https://github.com/henry-stroud/wdi-group-project/blob/master/img/chatroom.png?raw=true)

![screenshot - User Profile](https://github.com/henry-stroud/wdi-group-project/blob/master/img/usershow.png?raw=true)


Using axios to make API requests, as well promises, we chained together several API requests in an order that took the initial search from the user and parsed that data through each API to gather the correct result. We also had to encode the data into URL format, so the query could be read by the API request.

![screenshot - Spotify Login](https://github.com/henry-stroud/wdi-project-2/blob/master/img/sign-in.png?raw=true)

This data was then mapped out into each component, and reset after each new search by the user.

### Challenges

One of the main challenges was allowing a user to login via Spotify. This was actually completed after the project had finished, as I became aware of a React plugin that allowed for Implicit Grant Authorization access. After some research online I managed to apply the component to our site, as well as setting the temporary apiKey in state to be used by the user and site. This meant that any user worldwide can login with their account and receive all the data they need.

We also went through some challenges with passing state down to child components. We figured out that it was much more convenient to hold the state in our main app.js file and then pass the props down from there rather than through unrelated components.

### Wins

One of the biggest wins was adding the Spotify login auth as stated above. Beforehand we were manually generating a key to be used every hour with the app, that was not sufficient for a public website. Another win was getting the correct data to display from lastFM as we had some trouble navigating their API data.

Another big win was getting the map to reset and re-load each time using previous props in the componentDidUpdate function, as we struggled with this initially.

The below code is a snippet of the map.

```
class Map extends React.Component {
  constructor() {
    super()
    this.markers = null
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.props.center,
      zoom: 2
    })
    this.setMarkers()
  }

  setMarkers(){
    this.marker =  new mapboxgl.Marker()
      .setLngLat(this.props.center)
      .addTo(this.map)
    return this.marker
  }

  componentDidUpdate(prev) {
    if(this.props.center !== prev.center) {
      this.map = new mapboxgl.Map({
        container: this.mapDiv,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.props.center,
        zoom: 2
      })
      this.setMarkers()
    }
  }


  render() {
    return(
      <div className="map" ref={el => this.mapDiv = el}>
      </div>
    )
  }
}
```

## Future features

At the moment the app is quite slow, due to the chaining of API calls. I think in order to make it faster I would do further research into an API that could provide all the data needed, rather than filtering through what ended up being four different APIs. If I had more time I would have liked to make the app more responsive on mobile.
