import React from 'react'
import '../Card.css'
const Card = () => {
    return (
        <>
            <section>
                <div className='container-fluid'>
                    <div className="card mx-auto col-md-3 col-10 mt-5 pt-4">
                        <div className="d-flex sale ">
                            <div className="btnn btn">SALE</div>
                        </div>
                        <img className='mx-auto img-thumbnail'
                            src="https://i.imgur.com/WaZxrEe.jpg"
                            width="auto" height="auto" />
                        <div className="card-body text-center mx-auto">
                            <h5 className="card-title">Sofa Chair</h5>
                            <p className="card-text">$1,399</p>
                        </div>
                        <p>A great option weather you are at office or at home. </p>
        
        <button className="btn btn-danger">Add to cart</button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Card
