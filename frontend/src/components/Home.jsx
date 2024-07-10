import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/productsAPI.js'
import ProductItem from './product/ProductItem.jsx'
import Loader from './layout/Loader.jsx'
import toast from 'react-hot-toast'
import CustomPagination from './layout/CustomPagination.jsx'
import { useSearchParams } from 'react-router-dom'

const Home = () => {

  let [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const params = { page }

  const { data, isLoading, error, isError } = useGetProductsQuery(params)

  useEffect(() => {
    if(isError) {
      toast.error(error?.data?.message)
    }
  }, [isError])

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
            <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProductsCount}/>
          </div>
        </div>
      </>
  )
}

export default Home
