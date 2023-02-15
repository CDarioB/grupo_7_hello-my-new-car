import React from 'react';
import CounterSection from './CounterSection';
import ContentRowCenter from './ContentCenter';
import Chart from './Chart';

function MainContent(){
    return(
        <React.Fragment>
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Hello My New Car </h1>
					</div>
					<CounterSection />
					<ContentRowCenter />
					<Chart/>
				</div>
        </React.Fragment>
    )

}
export default MainContent;