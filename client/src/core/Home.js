import React, {useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from "./apiCore"
import Card from './Card';
import Search from './Search';
import bannerPhoto from '../img/banner.png'


const Home = () => {
    const [productBySell, setProductsBySell] = useState([])
    const [productByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const [results, setSearchResult] = useState([])

    const [data, setData] = useState({
        searched: false 
    })

    const { searched } =data
    

    const loadSearchResult = (result) => {
      
        setSearchResult(result)

        if (result.length > 0) {
            setData({
                searched: true
            })
        }
        
        
    }

    


    const loadProductsBySell = () => {
        getProducts('sold')
            .then(data => {

                if (data.error) {
                
                    setError(data.error)
                    
                } else {
                    
                    setProductsBySell(data)
                    
                }
                
            })
            .catch(error => console.log(error))
        
    }


    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])


    const banner = () => (
        <div className="row shadow" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat',position: 'relative', marginBottom: '20px'}}>
            
            <img src={bannerPhoto} alt="Banner" style={{ width: '98%' }} />
            
            <div className="searchDiv clearfix" style={{ position: 'absolute', width: '70%' }}>
              <Search loadSearchResult={loadSearchResult} />
            </div>
            
            
        </div>
    )


 
    const searchProducts = (results) => {
        
        return (

            <div className="container mt-5">
                <div className="row">
                    <h2 className="mt-4 mb-4" >
                        {searchMessage(searched, results)}
                    </h2>

                </div>

                <div className="row">
                    
                    {results.map((product, i) => (

                        <div key={i} className="mb-3 col-md-4 col-sm-6 col-xs-12" >
                        <Card  product={product} />
                        </div>
                    ))} 
                </div> 
            </div>
        )
    }


    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }

        if (searched && results.length < 1) {
            return `No products found`
        }
    }


    return (
        <Layout
            title="Home page"
            description="Node React E-commerce app"
            className="container-fluid"
        >

            
            {banner()}

            

            
            {searchProducts(results)}

            <div className="newArrivals">

                <h3 className="text-center mb-4 card bg-success p-2 text-white col-md-3 col-sm-6 col-xs-3">New Arrivals</h3>
            </div>



            <div className="row">
                {productByArrival.map((product, i) => (
                    <div key={i} className=" mb-3 col-md-4 col-sm-6 col-xs-12" >
                        <Card  product={product} />
                    </div>
                ))}
            </div>

            
            <h2 className="mb-4 text-center card bg-success p-2 text-white col-md-3 col-sm-6 col-xs-3">Best Sellers</h2>
            <div className="row" >
                {productBySell.map((product, i) => (
                    <div key={i} className=" mb-3 col-md-4 col-sm-6 col-xs-12" >
                         <Card  product={product} />
                     </div>
                ))}
            </div>

        </Layout>
    )
}


export default Home