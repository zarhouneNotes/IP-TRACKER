import {ReactComponent as LocMark} from './images/icon-location.svg'
import {Marker , MapContainer , TileLayer , Popup   } from 'react-leaflet'
import {renderToStaticMarkup} from 'react-dom/server' ;
import {divIcon} from 'leaflet'
import { useMap } from 'react-leaflet';
import {useEffect , useState , useMemo} from 'react'
import { Rectangle } from 'leaflet';





function Map({data , load}) {
  const innerBounds = [
    [49.505, -2.09],
    [53.505, 2.09],
  ]
  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]
  
  const redColor = { color: 'red' }
  const whiteColor = { color: 'white' }
  
  function SetBoundsRectangles() {
    const [bounds, setBounds] = useState(outerBounds)
    const map = useMap()
  
    const innerHandlers = useMemo(
      () => ({
        click() {
          setBounds(innerBounds)
          map.fitBounds(innerBounds)
        },
      }),
      [map],
    )
    const outerHandlers = useMemo(
      () => ({
        click() {
          setBounds(outerBounds)
          map.fitBounds(outerBounds)
        },
      }),
      [map],
    )
  
    return (
      <>
        <Rectangle
          bounds={outerBounds}
          eventHandlers={outerHandlers}
          pathOptions={bounds === outerBounds ? redColor : whiteColor}
        />
        <Rectangle
          bounds={innerBounds}
          eventHandlers={innerHandlers}
          pathOptions={bounds === innerBounds ? redColor : whiteColor}
        />
      </>
    )
  }
  
  return(
    <MapContainer bounds={outerBounds} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetBoundsRectangles />
    </MapContainer>,
  ) }
export default Map ;