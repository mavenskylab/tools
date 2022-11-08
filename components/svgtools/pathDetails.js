import { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

export default function PathDetails({ svg, dispatch }) {
    const path = svg.paths[svg.selected] ?? {} 
    if (Object.keys(path).length === 0) {
        return (
            <div className="w-56 p-3 text-center">
                Select a polygon
            </div>
        )
    }

    function handlePolygonUpdate(e) {
        dispatch({type: SVG_ACTION_TYPES.UPDATE_PATH, payload: { ...path, [e.target.name]: e.target.value }})
    }

    return (
        <div className="p-2 w-56">
            <div className="pt-2">
                <label>
                    Sides
                    <input type="text" className="w-full mt-1" name="sides" value={path.sides} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Fill
                    <input type="text" className="w-full mt-1" name="fill" value={path.fill} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Stroke width
                    <input type="text" className="w-full mt-1" name="strokeWidth" value={path.strokeWidth} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Stroke fill
                    <input type="text" className="w-full mt-1" name="strokeFill" value={path.strokeFill} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Border radius
                    <input type="text" className="w-full mt-1" name="borderRadius" value={path.borderRadius} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="flex py-2">
                <div className="pr-1">
                    <label>
                        Width
                        <input type="text" className="w-full mt-1" name="width" value={path.width} onChange={handlePolygonUpdate} />
                    </label>
                </div>
                <div className="pl-1">
                    <label>
                        Height
                        <input type="text" className="w-full mt-1" name="height" value={path.height} onChange={handlePolygonUpdate} />
                    </label>
                </div>
            </div>
            <div className="flex py-2">
                <div className="pr-1">
                    <label>
                        X
                        <input type="text" className="w-full mt-1" name="x" value={path.x} onChange={handlePolygonUpdate} />
                    </label>
                </div>
                <div className="pl-1">
                    <label>
                        Y
                        <input type="text" className="w-full mt-1" name="y" value={path.y} onChange={handlePolygonUpdate} />
                    </label>
                </div>
            </div>
        </div>
    )
}
