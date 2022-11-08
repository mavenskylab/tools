import { useReducer } from "react"
import { v4 as uuidv4 } from 'uuid'

export const SVG_ACTION_TYPES = {
    ADD_GROUP: 0,
    DEL_GROUP: 1,
    ADD_PATH: 2,
    ADD_POLYGON: 3,
    DEL_PATH: 4,
    SELECT_PATH: 5,
    UPDATE_PATH: 6,
    MOUSE_ENTER: 7,
    MOUSE_LEAVE: 8
}

function reducer(svg, { type, payload}) {
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
        case SVG_ACTION_TYPES.MOUSE_ENTER:
            return pathMouseEnter(payload)
        case SVG_ACTION_TYPES.MOUSE_LEAVE:
            return pathMouseLeave(payload)
        default:
            return svg
    }

    function addGroup(pathId) {
        const groupId = uuidv4()
        const groups = { ...svg.groups }
        const groupOrder = [...svg.groupOrder]

        groups[groupId] = [pathId] ?? []
        groupOrder.push(groupId)

        return {
            ...svg,
            groups: groups,
            groupOrder: groupOrder
        }
    }

    function delGroup(groupId) {
        const paths = { ...svg.path }
        const groups = { ...svg.groups }
        const groupOrder = [...svg.groupOrder]

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

    function addPath(path) {
        const pathId = uuidv4()
        const paths = { ...svg.paths }

        paths[pathId] = path

        if (!svg.groupOrder.length) {
            svg = addGroup(pathId)

            return {
                ...svg,
                paths: paths
            }
        }

        const groups = { ...svg.groups }
        groups[[...svg.groupOrder].pop()].push(pathId)

        return {
            ...svg,
            paths: paths,
            groups: groups
        }
    }

    function delPath(pathId) {
        const paths = { ...svg.paths }
        const groups = { ...svg.groups }

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
            selected: pathId
        }
        
    }

    function updatePath(path) {
        const paths = { ...svg.paths }
        paths[svg.selected] = path

        return {
            ...svg,
            paths: paths
        }
    }

    function pathMouseEnter(pathId) {
        const paths = { ...svg.paths }

        paths[pathId].hover = true

        return {
            ...svg,
            paths: paths
        }
    }

    function pathMouseLeave(pathId) {
        const paths = { ...svg.paths }

        paths[pathId].hover = false

        return {
            ...svg,
            paths: paths
        }
    }
}

export default function svgReducer() {
    return useReducer(reducer, { paths: {}, groups: {}, groupOrder: [], selected: undefined })
}
