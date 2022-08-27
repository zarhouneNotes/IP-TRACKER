import { useState ,useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import {ReactComponent as Arrow} from './images/icon-arrow.svg'
import Map from './Map';
import Card from './Card';
import MapLoading from './MapLoading';

function Form({getHandler}) {
    const [InputIP, setInputIP] = useState('')
    const [submittedIP, setSubmittedIP] = useState('')
    const [IPInfos, setIPInfos] = useState({})
    const [load , setLoad] = useState(true)
    const [wrongIP , setWrongIP] = useState(false)


    useEffect(() => {
      axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_gcq7VRXcHlYoqPQxPiVmA54qSbz7G&ipAddress=${submittedIP}`)
      .then(resp =>{
        setIPInfos(resp.data)
        
        setLoad(false)
        setWrongIP(false)
      })
      .catch(err =>{
          setWrongIP(true)
          console.log('st wrong')
      })
  
    }, [submittedIP])

    const clickHandel = (e) =>{
      if (e.key === 'Enter') {
        setSubmittedIP(InputIP) ; 
        setLoad(true)
      }
    }

  return    (
    <>
    <div className="bg-waring text-center form-container ">
        <div className="content ">
            <h3>IP Adress Tracker</h3>
            <InputGroup className='input-group mx-auto '  >
                <FormControl
                    onKeyDown={clickHandel}
                    style={{borderTopLeftRadius :'0.8em' , borderBottomLeftRadius:'0.8em'  , padding :"5px"  }}
                    value={InputIP}
                    onChange={(e)=>{setInputIP(e.target.value) }}
                    className='px-3 py-2 input-text'
                    placeholder="Search for any IP adress or domain"
                />
                <Button onClick={()=>{setSubmittedIP(InputIP) ; setLoad(true)}}  variant="dark" style={{borderTopRightRadius : '0.8em' , borderBottomRightRadius:'0.8em' , width:'1.3cm'}} >
                    <Arrow />
                </Button>
            </InputGroup>
        </div>
    </div>
    {!wrongIP && !load &&  <Map data={IPInfos.location}    />}
    { !wrongIP &&  <Card data={IPInfos}  load={load}  />}
    { !wrongIP && load && <MapLoading/>}
    {wrongIP && <h1 className='alert alert-danger'   >Verify your entered IP!!</h1>}
    
    
    </>
  )
}

export default Form