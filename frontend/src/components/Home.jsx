import React from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/productsAPI.js'
import ProductItem from './product/ProductItem.jsx'
import Loader from './layout/Loader.jsx'

const Home = () => {

  const { data, isLoading } = useGetProductsQuery()

  if (isLoading) return <Loader/>
  
  return (
      <>
        <MetaData title={'Best Online One Stop Shop'}/>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-12">
            <h1 id="products_heading" className="text-secondary">Latest Products</h1>
  
            <section id="products" className="mt-5">
              <div className="row">

              {data?.products?.map((product) => 
                <ProductItem product={product}/>
              )}
  
                
  
              </div>
            </section>
          </div>
        </div>
      </>
  )
}

export default Home
