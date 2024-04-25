import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';



export default function UserView({ productsData }) {
    // console.log({coursesData})
    // const { coursesData } = coursesData;
    // console.log(coursesData)
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

        //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productsArr)

    }, [productsData])

    return(
        <>
           
            { products }
        </>
        )
}

