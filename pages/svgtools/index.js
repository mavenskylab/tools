import BorderPane from '@/layouts/borderPane'

import Sidebar from '@/components/sidebar'
import Vector from '@/components/svgtools/vector'
import PathDetails from '@/components/svgtools/pathDetails'
import GroupList from '@/components/svgtools/groupList'

import DoubleChevron from '@/buttons/doubleChevron'

import svgReducer, { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

export default function Home() {
    const [svg, svgDispatch] = svgReducer()

    function setMeasurementCollapsed(payload) {
        svgDispatch({ type: SVG_ACTION_TYPES.SET_MEASUREMENT_COLLAPSED, payload: payload })
    }

    const sidebarContent = (
        <>
            <GroupList svg={svg} dispatch={svgDispatch} />
            <button type="button" onClick={() => svgDispatch({ type: SVG_ACTION_TYPES.ADD_POLYGON })}>Add Polygon</button>
        </>
    )

    const content = (
        <div className="flex gap-x-1 h-full">
            <div className="bg-slate-200 grow h-full">
                <svg className="bg-white max-w-full max-h-full preview" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    {Object.entries(svg.paths).map(([id, path]) => <Vector key={id} id={id} path={path} dispatch={svgDispatch} />)}
                </svg>
            </div>
            <div className={`bg-slate-200 h-full`}>
                <div className="bg-slate-300 p-1">
                    <DoubleChevron isCollapsed={svg.measurementCollapsed} setCollapsed={setMeasurementCollapsed} rotation={180} delay={'delay-200'} />
                </div>
                <div className={`overflow-x-hidden transition-size duration-300 ${svg.measurementCollapsed ? 'w-0 pl-14' : 'w-56'}`}>
                    <PathDetails svg={svg} dispatch={svgDispatch} />
                </div>
            </div>
        </div>
    )

    return (
        <BorderPane title={'SVG Tools'} sidebar={<Sidebar content={sidebarContent} />} content={content} />
    )
}
