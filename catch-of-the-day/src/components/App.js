import React from 'react'
import Header from "./Header";
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes : {},
    order : {}
  }

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
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
          {/* you can pass down all state with a spread: {...this.state } */}
          <Order fishes={this.state.fishes} order={this.state.order} />
          <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
        </div>
      </div>
    )
  }
}

export default App