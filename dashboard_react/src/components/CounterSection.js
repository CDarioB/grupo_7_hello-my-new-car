import React, { useState, useEffect } from 'react';
import CounterCard from './CounterCard';

function CounterSection(){

    const [productCouter, setproductCouter] = useState(0);
    const [categoryCouter, setCategoryCouter] = useState(0);
    const [userCouter, setUserCouter] = useState(0);

	useEffect( () => {
        fetch('http://localhost:3030/api/products')
        .then(response => response.json())
        .then(data => {
            setproductCouter(data.count);
            setCategoryCouter(Object.keys(data.countByCategory).length);
        })
        .catch(error => console.error(error));
    }, []);

    useEffect( () => {
        fetch('http://localhost:3030/api/users')
        .then(response => response.json())
        .then(data => {
            setUserCouter(data.count);

        })
        .catch(error => console.error(error));
    }, []);

    let productsInDB = {
        title: 'Productos en base de datos',
        color: 'primary', 
        cuantity: productCouter,
        icon: 'fa-book'
    }

    let usersInDB = {
        title: 'Usuarios en base de datos', 
        color: 'success', 
        cuantity: userCouter,
        icon: 'fa-user'
    }

    let categoriesInDB = {
        title: 'Categorías de productos en base de datos',
        color: 'warning',
        cuantity: categoryCouter,
        icon: 'fa-clipboard-check'
    }

    let cartProps = [productsInDB, usersInDB, categoriesInDB];

    return (
    
        <div className="row">
            
            {cartProps.map( (car, i) => {

                return <CounterCard {...car} key={i}/>
            
            })}

        </div>
    )
}

export default CounterSection;