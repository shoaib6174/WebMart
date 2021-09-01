import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import { productListReducer } from '../reducers/productReducers';
function HomeScreen({history}) {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

  

    return (
        <div>
            <h2> This is a Demo Website. <a style={{"color": "blue", 'text-decoration': 'underline'}} href='https://md-shoaib.me' target="_blank" >Contact The Developer</a> </h2>
            {
                loading ? <Loader/>
                : error ? <Message variant='danger' > {error}</Message>
                    : 
                    <div>
                    <Row>
                {
                        products.map(product=> (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                                <Product product={product}/>
                            </Col>
                        ))
                    }
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
            
        </div>
    )
}

export default HomeScreen
