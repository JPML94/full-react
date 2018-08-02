import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    products: [],
    product: {
      name: 'Product 1',
      description: 'Sample product',
      price: 0,
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = _ => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err))
  }

  addProduct = _ => {
    const { product } = this.state;
    fetch(`http://localhost:4000/products/add?name=${product.name}&description=${product.description}&price=${product.price}`)
      .then(this.getProducts)
      .catch(err => console.error(err))
  }
  
  renderProduct = ({ product_id, name }) => <div key={product_id}>{name}</div>

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}

        <div>
          <input 
            value={product.name} 
            onChange={e => this.setState({ product: { ...product, name: e.target.value }})} />
          <input 
            value={product.description} 
            onChange={e => this.setState({ product: { ...product, description: e.target.value }})} />
          <input 
            value={product.price} 
            onChange={e => this.setState({ product: { ...product, price: e.target.value }})} />
          <button onClick={this.addProduct}>Add Product </button>
        </div>
      </div>
    );
  }
}

export default App;
