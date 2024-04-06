import React from 'react';

const Topdiv = ({ startingLat, startingLng, endingLat, endingLng, speed }) => {
    return (
        <div className='upper_div'>
            <div className='upper_content'>
                <div>
                    <h2>Starting</h2>
                    <br />
                    <div>
                        <p>Lat: {startingLat}</p>
                        <p>Long: {startingLng}</p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h2 style={{ color: "blue" }}>Speed:</h2><p style={{ color: "blue" }}>{speed}kmph</p>
                </div>
                <div>
                    <div>
                        <h2>Ending</h2>
                        <br />
                        <div>
                            <p>Lat: {endingLat}</p>
                            <p>Long: {endingLng}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topdiv;
