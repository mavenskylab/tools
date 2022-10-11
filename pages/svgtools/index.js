import BorderPane from '@/layouts/borderPane'

import Sidebar from '@/components/sidebar'

import DoubleChevron from '@/buttons/doubleChevron'

import Polygon from './polygon'
import PolygonList from './polygonList'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
    const [polygons, setPolygons] = useState([])
    const [selectedPolygon, setSelectedPolygon] = useState({})

    const [isMeasurementCollapsed, setMeasurementCollapsed] = useState(true)

    function addPolygon() {
        const polygon = {
            id: uuidv4(),
            groupId: uuidv4(),
            hover: false,
            sides: '4',
            fill: 'none',
            strokeWidth: '3',
            strokeFill: '#000000',
            borderRadius: '25',
            width: '300',
            height: '300',
            x: '100',
            y: '100'
        }
        setPolygons(prev => [...prev, polygon])
        selectPolygon(polygon)
    }

    function polygonRemove(id) {
        const newPolygons = [...polygons]
        newPolygons.splice(newPolygons.findIndex(polygon => polygon.id === id), 1)
        setPolygons([...newPolygons])
    }

    function polygonUpdate(polygon) {
        const newPolygons = [...polygons]
        newPolygons[newPolygons.findIndex(old => old.id === polygon.id)] = polygon
        setPolygons([...newPolygons])
        selectPolygon(polygon)
    }

    function selectPolygon(polygon) {
        setSelectedPolygon(polygon)
        setMeasurementCollapsed(false)
    }

    function polygonMouseEnter(id) {
        const newPolygons = [...polygons]
        const polygon = newPolygons.find(polygon => polygon.id === id)
        polygon.hover = true
        setPolygons([...newPolygons])
    }

    function polygonMouseLeave(id) {
        const newPolygons = [...polygons]
        const polygon = newPolygons.find(polygon => polygon.id === id)
        polygon.hover = false
        setPolygons([...newPolygons])
    }

    const sidebarContent = (
        <>
            <PolygonList polygons={polygons} polygonSelect={selectPolygon} polygonRemove={polygonRemove} mouseEnter={polygonMouseEnter} mouseLeave={polygonMouseLeave} />
            <button type="button" onClick={addPolygon}>Add Polygon</button>
        </>
    )

    const content = (
        <div className="flex gap-x-1 h-full">
            <div className="bg-slate-200 grow h-full">
                <svg className="bg-white max-w-full max-h-full preview" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    {polygons?.map(polygon => {
                        const radian = 2 * Math.PI / polygon.sides
                        const xLen = polygon.width * (polygon.sides % 4 === 0 ? Math.tan(Math.PI / polygon.sides) : Math.sin(Math.PI / polygon.sides))
                        const yLen = polygon.height * (polygon.sides % 4 === 0 ? Math.tan(Math.PI / polygon.sides) : Math.sin(Math.PI / polygon.sides))

                        let direction = Math.PI
                        let d = `M ${((parseInt(polygon.width) + xLen - 2 * polygon.borderRadius) / 2 + parseInt(polygon.x)).toFixed(5)} ${parseInt(polygon.y) + parseInt(polygon.height)}`

                        for (let i = 0; i < polygon.sides; i++) {
                            if (polygon.borderRadius === '0') {
                                d += ` l ${(xLen * Math.cos(direction)).toFixed(5)} ${(yLen * Math.sin(direction)).toFixed(5)}`
                            } else {
                                d += ` l ${((xLen - 2 * polygon.borderRadius) * Math.cos(direction)).toFixed(5)} ${((yLen - 2 * polygon.borderRadius) * Math.sin(direction)).toFixed(5)}`
                                d += ` q ${(polygon.borderRadius * Math.cos(direction)).toFixed(5)} ${((polygon.borderRadius) * Math.sin(direction)).toFixed(5)}`

                                let theta = Math.PI - radian
                                let base = 2 * polygon.borderRadius * Math.sin(theta / 2)
                                let rad = direction + (Math.PI - theta) / 2
                                d += ` ${(base * Math.cos(rad)).toFixed(5)} ${(base * Math.sin(rad)).toFixed(5)}`
                            }
                            direction += radian
                        }

                        d += ' Z'

                        return (
                            <g key={polygon.groupId} onMouseEnter={() => polygonMouseEnter(polygon.id)} onMouseLeave={() => polygonMouseLeave(polygon.id)} onClick={() => selectPolygon(polygon)} >
                                <path fill={polygon.fill} stroke={polygon.strokeFill} strokeWidth={polygon.strokeWidth} d={d} />
                                {polygon.hover ? <path className="hover" d={d} /> : ''}
                            </g>
                        )
                    })}
                </svg>
            </div>
            <div className={`bg-slate-200 h-full`}>
                <div className="bg-slate-300 p-1">
                    <DoubleChevron isCollapsed={isMeasurementCollapsed} setCollapsed={setMeasurementCollapsed} rotation={180} delay={'delay-200'}/>
                </div>
                <div className={`overflow-x-hidden transition-size duration-300 ${isMeasurementCollapsed ? 'w-0 pl-14' : 'w-56'}`}>
                    <Polygon polygon={selectedPolygon} polygonUpdate={polygonUpdate} />
                </div>
            </div>
        </div>
    )

    return (
        <BorderPane title={'SVG Tools'} sidebar={<Sidebar content={sidebarContent} />} content={content} />
    )
}
