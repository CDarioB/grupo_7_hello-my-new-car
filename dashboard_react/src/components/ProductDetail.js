import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


function ProductDetail(props) {

    let params = useParams();

    const [product, setProduct] = useState({});
    const [images,setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      fetch(`http://localhost:3030/api/products/${params.id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          setImages(data.images);
        })
        .catch(error => console.error(error));
    }, [params.id]);
  
    const handleNextImage = () => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };
  
    const handlePrevImage = () => {
      setCurrentImageIndex(
        currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
      );
    };

  return (
    <div className="col-lg-6 mb-4 productDetail__container">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            {" "}
            {product.name}{" "}
          </h5>
        </div>
        <div className="productDetail">
          <div className="card-body">
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: 30 + "rem" }}
                src={images[currentImageIndex]}
                alt="Imagen producto"
              />
              <button className="button" style={{backgroundColor:'#4e73df', color:'white',borderColor:'white'}} onClick={handlePrevImage}>Anterior</button>
              <button className="button" style={{backgroundColor:'#4e73df', color:'white',borderColor:'white'}}  onClick={handleNextImage}>Siguiente</button>
            </div>
          </div>
          <div className="productDetail__text">
            <p>
              <b>Producto:</b> {product.description}
            </p>
            <hr />
            <p>
              <b>Kilometraje:</b> {product.mileage} Km
            </p>
            <hr />
            <p>
              <b>Precio:</b> {product.discount_price} COP
            </p>
            <hr />
            <p>
              <b> Descuento (Si aplica):</b> {product.discount_percentage} %
            </p>
            <hr />
            <p>
              <b>Descripción:</b>
            </p>
            <p>{product.description}</p>
            <hr />
            <p>
              <b>Stock:</b>
            </p>
            <p>No Defindo</p>
            <Link className="button" style={{backgroundColor:'#4e73df'}} to = "/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

