import Path from './path'

import { Droppable } from 'react-beautiful-dnd'

export default function group({ id, group, index, dispatch, setMeasurementCollapsed }) {
    return (
        <Droppable droppableId={id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    className="py-2"
                    {...provided.droppableProps}
                >
                    <div className="outline outline-slate-200 outline-2 px-2 pt-4">
                        <p className="absolute bg-slate-100 -translate-y-7 px-2">Group {index + 1}</p>
                        {group.map((pathId, index) => <Path key={pathId} id={pathId} index={index} dispatch={dispatch} setMeasurementCollapsed={setMeasurementCollapsed} />)}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    )
}
