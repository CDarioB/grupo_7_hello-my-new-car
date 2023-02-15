import React, { useState, useEffect } from 'react';
import Category from './Category';

function CategoriesInDb() {
  const [Categories, setCategories] = useState({});

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
      .then(response => response.json())
      .then(data => {
        setCategories(data.countByCategory);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <React.Fragment >
      <div className="col-lg-6 mb-3" >
        <div className="card shadow mb-4">
          <div className="card-header py-4">
            <h5 className="m-0 font-weight-bold text-gray-800">Categorías en Base de Datos</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {Object.entries(Categories).map(([name, amount], index) => {
                return <Category
                  categories={name}
                  amount={amount}
                  key={index}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CategoriesInDb;
