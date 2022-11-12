import Group from './group'

import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'

export default function GroupList({ svg, dispatch }) {

    function onDragEnd() {

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
