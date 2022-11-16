import { useReducer } from "react"
import { v4 as uuidv4 } from 'uuid'

export const SVG_ACTION_TYPES = {
    ADD_GROUP: 0,
    DEL_GROUP: 1,
    ORDER_GROUP: 2,
    ADD_PATH: 3,
    ADD_POLYGON: 4,
    DEL_PATH: 5,
    SELECT_PATH: 6,
    UPDATE_PATH: 7,
    ORDER_PATH: 8,
    MOUSE_ENTER: 9,
    MOUSE_LEAVE: 10,
    SET_MEASUREMENT_COLLAPSED: 11
}

function reducer(svg, { type, payload }) {
    switch (type) {
        case SVG_ACTION_TYPES.ADD_GROUP:
            return addGroup()
        case SVG_ACTION_TYPES.DEL_GROUP:
            return delGroup(payload)
        case SVG_ACTION_TYPES.ADD_POLYGON:
            payload = {
                sides: '4',
                fill: 'none',
                strokeWidth: '3',
                strokeFill: '#000000',
                borderRadius: '25',
                width: '300',
                height: '300',
                x: '100',
                y: '100',
                hover: false
            }
        case SVG_ACTION_TYPES.ADD_PATH:
            return addPath(payload)
        case SVG_ACTION_TYPES.DEL_PATH:
            return delPath(payload)
        case SVG_ACTION_TYPES.SELECT_PATH:
            return selectPath(payload)
        case SVG_ACTION_TYPES.UPDATE_PATH:
            return updatePath(payload)
        case SVG_ACTION_TYPES.ORDER_PATH:
            return orderPath(payload.pathId, payload.source, payload.destination)
        case SVG_ACTION_TYPES.MOUSE_ENTER:
            return pathMouseEnter(payload)
        case SVG_ACTION_TYPES.MOUSE_LEAVE:
            return pathMouseLeave(payload)
        case SVG_ACTION_TYPES.SET_MEASUREMENT_COLLAPSED:
            return {
                ...svg,
                measurementCollapsed: payload
            }
        default:
            return svg
    }

    function addGroup(pathId) {
        const groupId = uuidv4()
        const { groups, groupOrder } = structuredClone(svg)

        groups[groupId] = [pathId] ?? []
        groupOrder.push(groupId)

        return {
            ...svg,
            groups: groups,
            groupOrder: groupOrder
        }
    }

    function delGroup(groupId) {
        const { paths, groups, groupOrder } = structuredClone(svg)

        groups[groupId].map(pathId => delete paths[pathId])
        delete groups[groupId]
        groupOrder.splice(groupOrder.findIndex(id => id === groupId), 1)

        return {
            ...svg,
            paths: paths,
            groups: groups,
            groupOrder: groupOrder
        }
    }

    function orderGroup(groupId) {

    }

    function addPath(path) {
        const pathId = uuidv4()
        const { paths } = structuredClone(svg)

        paths[pathId] = path

        if (!svg.groupOrder.length) {
            svg = addGroup(pathId)

            return {
                ...svg,
                paths: paths,
                selected: pathId,
                measurementCollapsed: false
            }
        }

        const { groups } = structuredClone(svg)
        groups[[...svg.groupOrder].pop()].push(pathId)

        return {
            ...svg,
            paths: paths,
            groups: groups,
            selected: pathId,
            measurementCollapsed: false
        }
    }

    function delPath(pathId) {
        const { paths, groups } = structuredClone(svg)

        delete paths[pathId]
        Object.keys(groups).map(id => {
            groups[id].splice(groups[id].findIndex(path => path === pathId), 1)
        })

        return {
            ...svg,
            paths: paths,
            groups: groups
        }
    }

    function selectPath(pathId) {
        if (!svg.paths[pathId]) {
            return svg
        }

        return {
            ...svg,
            selected: pathId,
            measurementCollapsed: false
        }

    }

    function updatePath(path) {
        const { paths } = structuredClone(svg)
        paths[svg.selected] = path

        return {
            ...svg,
            paths: paths
        }
    }

    function orderPath(pathId, source, destination) {
        const { groups } = structuredClone(svg)

        groups[source.groupId].splice(source.index, 1)
        groups[destination.groupId].splice(destination.index, 0, pathId)
        
        return {
            ...svg,
            groups: groups
        }
    }

    function pathMouseEnter(pathId) {
        const { paths } = structuredClone(svg)

        paths[pathId].hover = true

        return {
            ...svg,
            paths: paths
        }
    }

    function pathMouseLeave(pathId) {
        const { paths } = structuredClone(svg)

        paths[pathId].hover = false

        return {
            ...svg,
            paths: paths
        }
    }
}

export default function svgReducer() {
    return useReducer(reducer, { paths: {}, groups: {}, groupOrder: [], selected: undefined, measurementCollapsed: true })
}
