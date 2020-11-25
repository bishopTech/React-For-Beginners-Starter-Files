import React from 'react'
import Header from "./Header";
import Inventory from './Inventory'
import Order from './Order'



class App extends React.Component {
  state = {
    fishes : {},
    order : {}
  }

  addFish = (fish) => {
    // how to update state : 
    // First take a copy of state 
    // add new thing to variable (add fish to fishes)
    // set state with the new state variable (fishes)
    const fishes = {...this.state.fishes }
    fishes[`fish${Date.now()}`] = fish 
    this.setState({
      // oldFishes in current state: new fishes 
      fishes
    })
  }
  
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Chris is neat" />
          <Order />
          <Inventory addFish={this.addFish} />
        </div>
      </div>
    )
  }
}

export default App