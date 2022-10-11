import Polygon from './polygon'

export default function PolygonList({ polygons, polygonSelect, polygonRemove, mouseEnter, mouseLeave }) {
    let polygonCount = 1

    return (
        polygons?.map(polygon => {
            return (
                <div key={polygon.id} className="bg-slate-200 flex outline-2 outline-slate-700 hover:outline active:outline active:outline-info focus:outline w-full p-2 mb-2" title="Select Polygon"
                    onMouseEnter={() => { mouseEnter(polygon.id) }} onMouseLeave={() => { mouseLeave(polygon.id) }} onClick={() => polygonSelect(polygon)}>
                    <button type="button" ></button>
                    <div className="grow">Polygon {polygonCount++}</div>
                    <button type="button" className="text-slate-500 hover:text-danger px-2" title="Delete Polygon" onClick={() => polygonRemove(polygon.id)}>
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-slate-500 hover:fill-danger w-4 h-4">
                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                        </svg>
                    </button>
                </div>
            )
        })
    )
}
