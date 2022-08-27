import React from 'react'
import { BouncingBalls, FadingBalls, Spin } from 'react-cssfx-loading/lib'

function Card({data , load}) {
  return (
    <div className='card d-no '>
     { !load && ( <div className="data-container">
        <div className=' data-column '>
          <div className="title">IP ADRESS</div>
          <div className="data">{data.ip}</div>
        </div>


        <div className=' data-column'>
          <div className="title">Location</div>
          <div className="data">{data.location.city}, {data.location.country}  {data.as.asn ? data.as.asn : 'NONE' }</div>
        </div>


        <div className=' data-column' >
          <div className="title">TIMEZONE</div>
          <div className="data">UTC {data.location.timezone} </div>
        </div>
        
        <div className=' data-column'>
          <div className="title">ISP</div>
          <div className="data">{data.isp}</div>
        </div>
      </div>)}
      { load && <div className='load-spin my-auto'  ><FadingBalls width="15px" height="15px" /></div> }
      
    </div>
  )
}

export default Card