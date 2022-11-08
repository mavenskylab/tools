import { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

export default function Vector({ id, path, dispatch }) {
    const radian = 2 * Math.PI / path.sides
    const xLen = path.width * (path.sides % 4 === 0 ? Math.tan(Math.PI / path.sides) : Math.sin(Math.PI / path.sides))
    const yLen = path.height * (path.sides % 4 === 0 ? Math.tan(Math.PI / path.sides) : Math.sin(Math.PI / path.sides))

    let direction = Math.PI
    let d = `M ${((parseInt(path.width) + xLen - 2 * path.borderRadius) / 2 + parseInt(path.x)).toFixed(5)} ${parseInt(path.y) + parseInt(path.height)}`

    for (let i = 0; i < path.sides; i++) {
        if (path.borderRadius === '0') {
            d += ` l ${(xLen * Math.cos(direction)).toFixed(5)} ${(yLen * Math.sin(direction)).toFixed(5)}`
        } else {
            d += ` l ${((xLen - 2 * path.borderRadius) * Math.cos(direction)).toFixed(5)} ${((yLen - 2 * path.borderRadius) * Math.sin(direction)).toFixed(5)}`
            d += ` q ${(path.borderRadius * Math.cos(direction)).toFixed(5)} ${((path.borderRadius) * Math.sin(direction)).toFixed(5)}`

            let theta = Math.PI - radian
            let base = 2 * path.borderRadius * Math.sin(theta / 2)
            let rad = direction + (Math.PI - theta) / 2
            d += ` ${(base * Math.cos(rad)).toFixed(5)} ${(base * Math.sin(rad)).toFixed(5)}`
        }
        direction += radian
    }

    d += ' Z'

    return (
        <g
            onMouseEnter={() => dispatch({ type: SVG_ACTION_TYPES.MOUSE_ENTER, payload: id })}
            onMouseLeave={() => dispatch({ type: SVG_ACTION_TYPES.MOUSE_LEAVE, payload: id })}
            onClick={() => dispatch({ type: SVG_ACTION_TYPES.SELECT_PATH, payload: id })}
        >
            <path fill={path.fill} stroke={path.strokeFill} strokeWidth={path.strokeWidth} d={d} />
            {path.hover ? <path className="hover" d={d} /> : ''}
        </g>
    )
}