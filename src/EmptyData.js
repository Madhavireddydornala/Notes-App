import React from "react";
import image1 from './images/image1.1.png';

const EmptyData = (selectedGroup) => {
    return(
        <div>
            <div>
                <img src={image1} alt="image1" className="img" />
                <h1 className="notes">Pocket Notes</h1>
                <p className="para">
                    Send and receive messages without keeping your phone online.<br />
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                </p>
            </div>
            
            <div>
                {/* <Footer selectedGroup={selectedGroup} /> */}
            </div>
        </div>
    );
}

export default EmptyData;
