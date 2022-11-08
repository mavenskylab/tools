import { useState, useEffect } from 'react'

export default function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 })

    const handleSize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleSize)
        handleSize()
    }, [])

    return size
}
