import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card'
import { getCategory, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices'
import RadioBox from './RadioBox';


const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    })



    const [ categories, setCategories ] = useState([])
    const [ error, setError ] = useState(false)
    
    const [ limit, setLimit ] = useState(6)
    const [ skip, setSkip ] = useState(0)
    const [ size, setSize ] = useState(0)
    const [ filteredResults , setFilteredResults ] = useState([])



    const init = () => {
        getCategory().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }


    const loadFilterResults = newFilters => {
        
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                  //  console.log(data.data);
                    
                    setFilteredResults(data.data)
                    setSize(data.size)
                    setSkip(0)
                }
            })
        
    }



    const loadMore = () => {

        let toSkip = skip + limit
        
        getFilteredProducts(skip, limit, myFilters.filters)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                  //  console.log(data.data);
                    
                    setFilteredResults([ ...filteredResults, ...data.data])
                    setSize(data.size)
                    setSkip(toSkip)
                }
            })
        
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button
                    className="btn btn-warning mb-5"
                    onClick={loadMore}
                >Load More</button>
            )
        )
    }



    useEffect(() => {
        init()
        loadFilterResults(skip, limit, myFilters.filters)

    }, [])


    const handleFilters = (filters, filterBy) => {
       // console.log("shop", filters, filterBy);
        const newFilters = {
            ...myFilters
        }

        newFilters.filters[filterBy] = filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        loadFilterResults(myFilters.filters)

        setMyFilters(newFilters)
    }


    const handlePrice = value => {
        const data = prices 

        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }

        return array

    }





    return (
        <Layout
            title="Shop page"
            description="Search and find books of your choice"
            className="container-fluid"
        >

            <div className="row mt-5"  >
                
                <div className="col-2" style={{ marginBottom: '150px' }} >

                    <h4 className="mb-3 card bg-success p-2 text-white" >Categories</h4>
                    
                        <Checkbox
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, 'category')}
                        />
                        
                   
                    <h4 className="mt-3 card bg-success p-2 text-white">Price</h4>
                    
                        <RadioBox
                            prices={prices}
                            handleFilters={
                                filters => handleFilters(filters, 'price')
                            }
                        />
                    
                    
                </div>
                
                <div className="col-10" >
                    {/* <h2 className="mb-4 " >Products</h2> */}

                    <div className="row" >
                        {filteredResults.map((product, i) => (
                            <div key={i} className=" mb-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                <Card  product={product} />
                            </div>
                        ))}  
                    </div>

                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
            
        </Layout>
    )
}

export default Shop