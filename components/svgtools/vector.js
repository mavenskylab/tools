import { SVG_ACTION_TYPES } from '@/hooks/svgReducer'

function getRadius(sides, width) {
    if (sides === '4') {
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

    const iA = ((path.sides - 2) * Math.PI / path.sides)

    const bRR = Math.sqrt(path.borderRadius**2 + R**2 - 2 * path.borderRadius * R * Math.cos(iA / 2))
    const bRA = Math.asin(path.borderRadius * Math.sin(iA / 2) / bRR)

    const xP = parseInt(path.x) + path.width / 2
    const yP = parseInt(path.y) + (path.sides % 2 ? R + (path.height - R - r) / 2 : path.height / 2)

    let points = []
    let direction = path.sides == 4 ? Math.PI * 1.25 : - Math.PI / 2
    for (let i = 0; i < path.sides; i++) {
        points.push([
            (xP + bRR * Math.cos(direction - bRA)).toFixed(5), 
            (yP + bRR * path.height / path.width * Math.sin(direction - bRA)).toFixed(5)
        ])
        points.push([
            (xP + R * Math.cos(direction)).toFixed(5),
            (yP + R * path.height / path.width * Math.sin(direction)).toFixed(5)
        ])
        points.push([
            (xP + bRR * Math.cos(direction + bRA)).toFixed(5),
            (yP + bRR * path.height / path.width * Math.sin(direction + bRA)).toFixed(5)
        ])
        direction += radian
    }

    const list = points.map((p, i) => {
        if (i === 0) {
            return `M ${p[0]} ${p[1]}`
        } else if (path.borderRadius !== '0') {
            if (i % 3 === 1) {
                return `Q ${p[0]} ${p[1]}`
            } else if (i % 3 === 2) {
                return `${p[0]} ${p[1]}`
            }
        }

        return `L ${p[0]} ${p[1]}`
    })

    list.push('Z')

    const d = list.join(' ')

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