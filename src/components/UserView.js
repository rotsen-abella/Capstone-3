import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchProduct from './SearchProducts';




export default function UserView({ productsData }) {
    
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
            console.log(product)
            
            if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        
        setProducts(productsArr)

    }, [productsData])

    return(
        <>
           <SearchProduct />
            { products }
        </>
        )
}

