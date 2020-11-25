import React from 'react'
import { getFunName } from '../helpers'


class StorePicker extends React.Component {

  myInput = React.createRef()

  goToStore = (event) => {
    // if you need to access 'this' keyword you must use the arrow function syntax for custom methods
    // form default action is to submit data and refresh page so we need to prevent default 
    event.preventDefault()
    // golden rule in react is dont touch the DOM
    // first value is react thing and second is js thing?
    const name = this.myInput.current.value
    // access react router for state 
    this.props.history.push(`/store/${name}`)
    
  }
  
  componentDidMount() {
    console.log('Mounted')
  }

  render() {
    return ( 
    <React.Fragment>
    <form className="store-selector" onSubmit={this.goToStore}>
      <h2>Please Enter A Store</h2>
      <input type="text" ref={this.myInput} name="store" required placeholder="Store Name" defaultValue={getFunName()} />
      <button type="submit">Visit Store</button>
    </form>
    </React.Fragment>
    )
  }
}

export default StorePicker