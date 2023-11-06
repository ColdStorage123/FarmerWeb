import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';
 import OrderComponent from '../OrderComponent';
import AcceptedCSR1 from '../OrderPlacementHome1';

function Home() {

    

   
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                 <Link to ='/orderplacement' className='link-style'>
                <div className='card-inner'>
                   
                    <h3>Order Now</h3>
                    <BsFillArchiveFill className='card_icon'/>  
                </div>
                </Link>
                
            </div>
            <div className='card' >
            <Link to ='/farmerorders' className='link-style'>  
                <div className='card-inner'>
                    <h3>Track Your Orders</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
            <div className='card'>
            <Link to ='/' className='link-style'>  
                <div className='card-inner'>
                    <h3>View History</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
            <div className='card'>
            <Link to ='/' className='link-style'>  
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
        </div>
        <div className='order-preview'>
        <h2>Recent Orders</h2>
        <AcceptedCSR1 limit={4} />
        <Link to='/orderplacement' className='link-style'>
          View All Storages
        </Link>
      </div>

        

       
    </main>
  )
}

export default Home
