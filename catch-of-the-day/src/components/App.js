import React from 'react'
import Header from "./Header";
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

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

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1;
    this.setState({
      order
    })
  }
  
  
  
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Chris is neat" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} /> ) }
          </ul>
          <Order />
          <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
        </div>
      </div>
    )
  }
}

export default App