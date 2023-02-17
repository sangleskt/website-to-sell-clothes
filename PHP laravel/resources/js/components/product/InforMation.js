import React, { Component } from 'react'

class InforMation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgShow:''
    }
    this.renderNameBrand = this.renderNameBrand.bind(this)
  }

  componentDidMount () {
        
    let urlCB = window.Laravel.baseUrl + '/api/category-brand';  
    axios.get(urlCB)
        .then(response => {
            this.setState({
                listCategory: response.data.category,
                listBrand: response.data.brand
            });
        })   
  }

  renderNameBrand() {
    let abc = this.state.listBrand;
    // const result = abc.filter(abc => this.props.data.brand == abc.id );

    if(this.state.listBrand instanceof Array) {
        return this.state.listBrand.map((item, i) => {
            return (
                if(item.id)
                <option key={i} index={i} value={item.id}>
                    {item.brand}
                </option>
            )
        })
    }
 }

  render () {
    return (
            <div className="col-sm-7">
              <div className="product-information">
                <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                <h2>{this.props.data.name}</h2>
                <p>Web ID: <h2>{this.props.data.web_id}</h2></p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                  <span>US ${this.props.data.price}</span>
                  <label>Quantity:</label>
                  <input type="text" value="3" />
                  <button type="button" className="btn btn-fefault cart" >
                    <i className="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p><b>Availability:</b> In Stock</p>
                <p><b>Condition:</b> New</p>
                <p><b>Brand:</b> E-SHOPPER</p>
                <a href=""><img src="images/product-details/share.png" className="share img-responsive"  alt="" /></a>
							</div>
            </div>
    )
  }
  
}

export default InforMation