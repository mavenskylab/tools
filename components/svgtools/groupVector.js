import Vector from './vector'

export default function GroupVector({ group, paths, dispatch }) {
    return (
        <g>
            {Object.values(group).map(pathId => <Vector key={pathId} id={pathId} path={paths[pathId]} dispatch={dispatch} />)}
        </g>
    )
}