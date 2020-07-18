import React, { Component } from 'react';
import axios from 'axios';
import ProductCard from './../../productCard/ProductCard';

const title= 'Recommended Products'

class Recommended extends Component {

  componentWillMount(){
    this.getRecommended();
  }

  getRecommended(){
    axios.get(`http://202.51.74.64:8080/justNep/product/recommended`)
    .then(res => {
      const posts = res.data.map(obj => obj);
      this.setState({posts});
      console.log(posts)
    });
  }

  constructor(props){
    super(props);

    this.state = {
      posts:[],
    };
    this.getRecommended = this.getRecommended.bind(this);
  }

  render(){
    return(

          <ProductCard data = {this.state.posts}
                        title = {title}/>
    );
  }
}

export default Recommended;