import React from 'react';
import './../../App.css';

function Menuleft(props) {

    return (

        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="/user/Account">
                                    <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                    ACCOUNT
                                </a>
                            </h4>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="/user/myproduct">
                                    <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                    MY PRODUCT
                                </a>
                            </h4>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="/user/addproduct">
                                    <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                    ADD PRODUCT
                                </a>
                            </h4>
                        </div>
                        
                    </div>
                    
                </div>{/*/category-products*/}
                
                <div className="price-range">{/*price-range*/}
                    <h2>Price Range</h2>
                    <div className="well text-center">
                        <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                        <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
                    </div>
                </div>{/*/price-range*/}
                <div className="shipping text-center">{/*shipping*/}
                    <img src="images/home/shipping.jpg" alt="" />
                </div>{/*/shipping*/}
            </div>
        </div>

    )
}
export default Menuleft;