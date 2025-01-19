import React from 'react';
import ReactDOM from 'react-dom';

import SideBar from './Sidebar';
import MainBody from './MainBody';






const AppLayout = () => {
    return(
        <div className="container">
            <div className='child1'>
            <SideBar/>
            </div>
          <div className='child2'>
          <MainBody/>
          </div>
           
           
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>) 
