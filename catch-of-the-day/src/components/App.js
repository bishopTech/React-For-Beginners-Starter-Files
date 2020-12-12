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

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };


  deleteFish = (key) => {
    // copy state 
    const fishes = {...this.state.fishes}; 
    // update state object
    fishes[key] = null;
    // update the state 
    this.setState( {fishes} );
    // you can test this by going the js console in your browser, hitting $r to select the app component and then calling the method with dot notation 
    // ie : $r.deleteFish('fish1')

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

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState( { order });
  }
  
  
  
  
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App