import { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

function getRadius(sides, width) {
    if (sides == 4) {
        const R = width / 2 / Math.cos(Math.PI / sides)
        return [R, R * Math.cos(Math.PI / sides)]
    }

    if (sides % 2) {
        const R = width / 2 / Math.sin((sides - 1) / 2 * Math.PI / sides)
        return [R, R * Math.cos(Math.PI / sides)]
    }

    const R = width / 2
    return [R, R * Math.cos(Math.PI / sides)]
}

export default function Vector({ id, path, dispatch }) {
    const [R, r] = getRadius(path.sides, path.width)

    const radian = 2 * Math.PI / path.sides

    const xP = parseInt(path.x) + path.width / 2
    const yP = parseInt(path.y) + (path.sides % 2 ? R + (path.height - R - r) / 2 : path.height / 2)

    let points = []
    let direction = path.sides == 4 ? Math.PI * 1.25 : - Math.PI / 2
    for (let i = 0; i < path.sides; i++) {
        points.push([
            (xP + R * Math.cos(direction)).toFixed(5),
            (yP + R * path.height / path.width * Math.sin(direction)).toFixed(5)
        ])
        direction += radian
    }

    const list = points.map((p, i) => {
        if (i === 0) {
            return `M ${p[0]} ${p[1]}`
        // } else if (i % 2) {
        //     return `A 10 10, 0, 0 1, ${p[0]} ${p[1]}`
        } else {
            return `L ${p[0]} ${p[1]}`
        }
    })

    list.push('Z')

    const d = list.join(' ')

    // let d = `M ${((parseInt(path.width) + xLen - 2 * path.borderRadius) / 2 + parseInt(path.x)).toFixed(5)} ${parseInt(path.y) + parseInt(path.height)}`

    // for (let i = 0; i < path.sides; i++) {
    //     if (path.borderRadius === '0') {
    //         d += ` l ${(xLen * Math.cos(direction)).toFixed(5)} ${(yLen * Math.sin(direction)).toFixed(5)}`
    //     } else {
    //         d += ` l ${((xLen - 2 * path.borderRadius) * Math.cos(direction)).toFixed(5)} ${((yLen - 2 * path.borderRadius) * Math.sin(direction)).toFixed(5)}`
    //         d += ` q ${(path.borderRadius * Math.cos(direction)).toFixed(5)} ${((path.borderRadius) * Math.sin(direction)).toFixed(5)}`

    //         let theta = Math.PI - radian
    //         let base = 2 * path.borderRadius * Math.sin(theta / 2)
    //         let rad = direction + (Math.PI - theta) / 2
    //         d += ` ${(base * Math.cos(rad)).toFixed(5)} ${(base * Math.sin(rad)).toFixed(5)}`
    //     }
    //     direction += radian
    // }

    // d += ' Z'

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