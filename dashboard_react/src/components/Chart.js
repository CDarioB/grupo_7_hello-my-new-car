import React, { useState, useEffect, useRef } from 'react';
import ChartRow from './ChartRow';

function Chart() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [pagesAmount, setPagesAmount] = useState(0);
    const [productsAmount, setProductsAmount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3030/api/products?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setProductsAmount(data.count);
            })
            .catch(error => console.error(error));
    }, [page]);

    useEffect(() => {
        setPagesAmount(Math.ceil(productsAmount / 10));
    }, [productsAmount]);

    const previousPage = () => {
        if (page !== 0) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page !== pagesAmount - 1) {
            setPage(page + 1);
        }
    }


    useEffect( () => {
			fetch(`http://localhost:3030/api/products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setProductsAmount(data.count);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Listado de automoviles</h5>
            </div>
            <div className="card-body">
                <form className='productForm'>
                    <label htmlFor="">Buscar por referencia del auto:</label>
                    <input type="text" className="form-control" placeholder='Ingresa el nombre del automovil' />
                    <button className="btn btn-info" style={{backgroundColor:'#4e73df',borderColor:'#4e73df'}}>
                        <i className="fas fa-fw fa-search"></i> Buscar
                    </button>
                </form>
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Referencia del carro</th>
                                <th>Marca</th>
                                <th>Kilometraje</th>
                                <th>Categoría</th>
                                <th>Ver detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((row, index) => {
                                    return <ChartRow
                                        {...row}
                                        key={index}
                                    />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;