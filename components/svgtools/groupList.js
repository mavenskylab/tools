import Group from './group'

import { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'

export default function GroupList({ svg, dispatch }) {

    function onDragEnd(result) {
        const { draggableId, source, destination } = result

        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

        source.groupId = source.droppableId
        delete source.droppableId

        destination.groupId = destination.droppableId
        delete destination.droppableId

        dispatch({ 
            type: SVG_ACTION_TYPES.ORDER_PATH,
            payload: {
                pathId: draggableId, 
                source, 
                destination
            }
        })

    }

    resetServerContext()

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {svg.groupOrder.map((groupId, index) => <Group key={groupId} id={groupId} group={svg.groups[groupId]} index={index} paths={svg.paths} dispatch={dispatch} />)}
            {/* <Droppable droppableId={"group-1"}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {paths?.map((polygon, index) => <Polygon key={polygon.id} polygon={polygon} index={index} />)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> */}
        </DragDropContext>
    )

}
