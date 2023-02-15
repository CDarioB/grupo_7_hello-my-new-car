import React from 'react';
import LastProductInDb from './LastProductInDb';
import CategoriesInDb from './CategoriesInDb';

function ContentCenter(){
    return (
        <div className="d-flex row">
            <LastProductInDb />
            <CategoriesInDb  />
        </div>
    )
}

export default ContentCenter;