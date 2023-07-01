import React, { Component } from "react";
// import Particles from 'react-particles-js';
import ParticlesBg from "particles-bg";

import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import "./App.css";
import BirdGame from "./BirdGame/BirdGame";

const GAME_WIDTH = Math.max(document.documentElement.clientHeight) * 0.4;
const BIRD_SIZE = 0.04 * GAME_WIDTH;
const GAME_HEIGHT = GAME_WIDTH;
const GRAVITY = 0.008 * GAME_WIDTH;
const JUMP_HEIGHT = 0.16 * GAME_WIDTH;
const OBSTACLE_WIDTH = 0.08 * GAME_WIDTH;
const OBSTACLE_GAP = 0.3125 * GAME_WIDTH;

const initialState = {
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="lines" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} />
            <BirdGame
              GAME_WIDTH={GAME_WIDTH}
              GAME_HEIGHT={GAME_HEIGHT}
              BIRD_SIZE={BIRD_SIZE}
              GRAVITY={GRAVITY}
              JUMP_HEIGHT={JUMP_HEIGHT}
              OBSTACLE_GAP={OBSTACLE_GAP}
              OBSTACLE_WIDTH={OBSTACLE_WIDTH}
            />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
