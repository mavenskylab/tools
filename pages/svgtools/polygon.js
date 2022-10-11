export default function Polygon({ polygon, polygonUpdate }) {
    polygon = polygon ?? {} 
    if (Object.keys(polygon).length === 0) {
        return (
            <div className="w-56 p-3 text-center">
                Select a polygon
            </div>
        )
    }

    function handlePolygonUpdate(e) {
        polygonUpdate({ ...polygon, [e.target.name]: e.target.value })
    }

    return (
        <div className="p-2 w-56">
            <div className="pt-2">
                <label>
                    Sides
                    <input type="text" className="w-full mt-1" name="sides" value={polygon.sides} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Fill
                    <input type="text" className="w-full mt-1" name="fill" value={polygon.fill} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Stroke width
                    <input type="text" className="w-full mt-1" name="strokeWidth" value={polygon.strokeWidth} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Stroke fill
                    <input type="text" className="w-full mt-1" name="strokeFill" value={polygon.strokeFill} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="pt-2">
                <label>
                    Border radius
                    <input type="text" className="w-full mt-1" name="borderRadius" value={polygon.borderRadius} onChange={handlePolygonUpdate} />
                </label>
            </div>
            <div className="flex py-2">
                <div className="pr-1">
                    <label>
                        Width
                        <input type="text" className="w-full mt-1" name="width" value={polygon.width} onChange={handlePolygonUpdate} />
                    </label>
                </div>
                <div className="pl-1">
                    <label>
                        Height
                        <input type="text" className="w-full mt-1" name="height" value={polygon.height} onChange={handlePolygonUpdate} />
                    </label>
                </div>
            </div>
            <div className="flex py-2">
                <div className="pr-1">
                    <label>
                        X
                        <input type="text" className="w-full mt-1" name="x" value={polygon.x} onChange={handlePolygonUpdate} />
                    </label>
                </div>
                <div className="pl-1">
                    <label>
                        Y
                        <input type="text" className="w-full mt-1" name="y" value={polygon.y} onChange={handlePolygonUpdate} />
                    </label>
                </div>
            </div>
        </div>
    )
}
