import { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

import { Draggable } from 'react-beautiful-dnd'

export default function Path({ id, path, index, dispatch }) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    className="pb-2"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div
                        className={`bg-slate-200 flex items-center${path.hover ? ' outline ' : ' '}outline-info outline-2 active:outline active:outline-info w-full h-10`}
                        onMouseEnter={() => dispatch({ type: SVG_ACTION_TYPES.MOUSE_ENTER, payload: id })}
                        onMouseLeave={() => dispatch({ type: SVG_ACTION_TYPES.MOUSE_LEAVE, payload: id })}
                        onClick={() => dispatch({ type: SVG_ACTION_TYPES.SELECT_PATH, payload: id })}
                    >
                        <title>Select Path</title>
                        <div className="bg-slate-300 flex items-center gap-x-1 h-full p-1">
                            <div className="text-[0.6rem] leading-[0.6rem] h-full">{index + 1}</div>
                            <svg className="stroke-slate-900 stroke-2 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Move Path</title>
                                <g>
                                    <line x1="5" y1="6" x2="19" y2="6" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <line x1="5" y1="18" x2="19" y2="18" />
                                </g>
                            </svg>
                        </div>
                        <div className="grow px-2">Path</div>
                        <div className="h-full">
                            <button type="button" className="text-slate-500 hover:text-danger p-1" onClick={() => dispatch({ type: SVG_ACTION_TYPES.DEL_PATH, payload: id })}>
                                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-slate-500 hover:fill-danger w-3 h-3">
                                    <title>Delete Path</title>
                                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}