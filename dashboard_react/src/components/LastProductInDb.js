import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LastProductInDb(){

    const [product, setProduct] = useState([]);
    const [productId, setProductid] = useState(0);
    const [category, setCategory] = useState()
    const [images,setImages] = useState([])

	useEffect( () => {
        fetch('http://localhost:3030/api/products')
        .then(response => response.json())
        .then(data => {
            setProductid(data.products.length - 1);
            setProduct(data.products[data.products.length - 1]);
            console.log(data.products.length - 1)
            setCategory(data.products[data.products.length - 1].category.type)
        })
        .catch(error => console.error(error));
    }, []);

    useEffect( () => {
        if (product.id) {
            setProductid(product.id);
        }
    }, [product]);
    
    useEffect( () => {
    if(productId)
        fetch(`http://localhost:3030/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            setImages(data.images)
        })
        .catch(error => console.error(error));
    }, [productId]);


    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto en Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem'}} src={ images[0] } alt="Imagen producto"/>
                    </div>
                    <h4>Producto:  { product.description }</h4>
                    <p>Marca: { product.brand }</p>
                    <p>Precio:  $ { product.discount_price }</p>
                    <p>Categoría:   {category}</p>
                    <Link className="btn btn-primary" to={ `/ProductDetail/${ product.id }` }>Ver detalle del producto</Link>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
