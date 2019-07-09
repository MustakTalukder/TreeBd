import React, {useState, useEffect } from 'react';
import { getCategory, list } from "./apiCore"



const Search = (props) => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false 
    })


    const { categories, category, search } =data

    // console.log(props);
    

    const loadCategories = () => {
        getCategory()
            .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({
                    ...data,
                    categories: data 
                })
            }
        })
    }



    useEffect(() => {
        loadCategories()
    }, [])


    const searchData = () => {
      //  console.log(search, category);
        
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                    console.log(response.error);
                    
                    } else {
                        setData({
                            ...data,
                            results: response,
                            searched: true
                           
                        })

                        props.loadSearchResult(response)

                    }
                    
            })
        }
        
    }



    const searchSubmit = (e) => {

        e.preventDefault() 
        searchData()

    }

    const handleChange = name => e => {
        setData({
            ...data,
            [name]: e.target.value,
            searched: false
        })
    }



    
    const searchForm = () => (
        <form onSubmit={searchSubmit}  >
            <span className="input-group-text" style={{ background: '#019F61' }} >
                <div className="input-group" >


                    {/* <div className="input-group-prepend">
                        <select
                            className="btn mr-2 text-white"
                            onChange={handleChange("category")}
                            style={{ background: '#019F61' }}
                            >
                            <option className="text-white" value="All">All</option>
                            {categories.map((c, i) => (
                                <option className="text-white" key={i} value={c._id}>{c.name}</option>
                                ))}
                        </select>

                    </div> */}

                    <input
                        type="search"
                        className="form-control "
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                        />

                </div>

                <div className="btn input-group-append" style={{ border: 'none' }} >
                    <button className="input-group-text" ><i className="fas fa-search"></i></button>
                </div>

            </span>
        </form>
    )
    
    

    // const searchProducts = (results = []) => {
    //     return (
    //         <div className="row">
    //             <h2 className="mt-4 mb-4" >
    //                 {searchMessage(searched, results)}
    //             </h2>
    //             <div className="row">
    //                 {results.map((product, i) => (
    //                     <Card key={i} product={product} />
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }
    




    // Search bar




    // const searchForm = () => (
    //     <form onSubmit={searchSubmit} >
    //         <span className="input-group-text" style={{ background: '#019F61' }} >
    //             <div className="input-group" >
    //                 <div className="input-group-prepend">
    //                     <select
    //                         className="btn mr-2 text-white"
    //                         onChange={handleChange("category")}
    //                         style={{ background: '#019F61' }}
    //                     >
    //                         <option className="text-white" value="All">All</option>
    //                         {categories.map((c, i) => (
    //                             <option className="text-white" key={i} value={c._id}>{c.name}</option>
    //                         ))}
    //                     </select>

    //                 </div>

    //                 <input
    //                     type="search"
    //                     className="form-control"
    //                     onChange={handleChange("search")}
    //                     placeholder="Search by name"
    //                 />

    //             </div>

    //             <div className="btn input-group-append" style={{ border: 'none' }} >
    //                 <button className="input-group-text" ><i className="fas fa-search"></i></button>
    //             </div>

    //         </span>
    //     </form>
    // )





    return (
        <div>

            <div className="mb-3 searchBarResponsive"  >
                {searchForm()}
            </div>
 
             {/* <div className="mb-3 row"  >
              {searchProducts(results)}
            </div> */}
            
        </div>
    )
}

export default Search