import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/productsAPI.js'
import ProductItem from './product/ProductItem.jsx'
import Loader from './layout/Loader.jsx'
import toast from 'react-hot-toast'
import CustomPagination from './layout/CustomPagination.jsx'
import { useSearchParams } from 'react-router-dom'
import Filter from './layout/Filter.jsx'

const Home = () => {

  let [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const keyword = searchParams.get('keyword') || ''
  const params = { page, keyword }
  const min = searchParams.get('min') 
  const max = searchParams.get('max') 

  min != null && (params.min = min)
  max != null && (params.max = max)

  const { data, isLoading, error, isError } = useGetProductsQuery(params)

  useEffect(() => {
    if(isError) {
      toast.error(error?.data?.message)
    }
  }, [isError])

  const columnSize = keyword ? 4 : 3

  if (isLoading) return <Loader/>
  
  return (
      <>
        <MetaData title={'Best Online One Stop Shop'}/>
        <div className="row">
          {keyword && (
            <div className="col-6 col-md-3 mt-5">
              <Filter/>
            </div>
          )}
          <div className={keyword ? `col-12 col-sm-6 col-md-9` : "col-12 col-sm-6 col-md-12"}>
            <h1 id="products_heading" className="text-secondary">{keyword ? `${data?.products?.length} Products found with keyword: ${keyword}` : 'Latest Products'}</h1>
  
            <section id="products" className="mt-5">
              <div className="row">

              {data?.products?.map((product) => 
                <ProductItem product={product} columnSize={columnSize}/>
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
