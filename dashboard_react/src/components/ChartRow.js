import React from 'react';
import { Link } from 'react-router-dom';

function ChartRow(props){
    return (
                <tr>
                    <td>{ props.id }</td>
                    <td>{ props.description }</td>
                    <td>{ props.brand }</td>
                    <td> { props.mileage }</td>
                    <td> { props.category.type }</td>
                    <td>
                        <Link className="" to = { `/ProductDetail/${ props.id }` }>
                            Ver detalle
                        </Link>
                    </td>
                </tr>
            )
    }
    
        

export default ChartRow;