import Head from 'next/head'

import useWindowSize from '@/hooks/useWindowSize'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

export default function Nav({ innerRef, title }) {
    const windowSize = useWindowSize()
    const [isCollapsed, setCollapsed] = useState(true)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [navHeight, setNavHeight] = useState(0)
    const [theme, setTheme] = useState('dark')

    const headerRef = innerRef ?? useRef()
    const navRef = useRef()

    function handleNavToggle() {
        setCollapsed(!isCollapsed)
    }

    return (
        <nav ref={headerRef} className="dark:bg-slate-100">
            <div className="flex relative px-3 py-2">
                <a className="self-center text-xl pr-4" href="/">Tools</a>
                <div className="border-l-2 border-l-slate-900"></div>
                <div className="self-center text-xl pl-4">{title}</div>
                <div className="flex flex-row-reverse grow">
                    <button className="bg-slate-200 rounded outline-2 outline-slate-500 hover:outline focus:outline ml-2 px-2" type="button" onClick={handleNavToggle}>
                        <svg className="w-10 h-10 fill-slate-700" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <title>Navigation Menu</title>
                            <g>
                                <path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" />
                                <path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" />
                                <path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" />
                            </g>
                        </svg>
                    </button>
                    <button className="ml-2" type="button">
                    </button>
                    <ul className="hidden md:flex">
                        <li className="self-center p-2"></li>
                    </ul>
                </div>
            </div>
            <div className={`absolute top-0${isCollapsed ? ' hidden ' : ' '}w-full h-screen z-40`} onClick={handleNavToggle} />
            <div className={`bg-slate-100 absolute right-1 overflow-hidden${isCollapsed ? ' hidden ' : ' '}sm:rounded sm:shadow-md w-screen sm:w-auto mt-1 z-50`}>
                <ul ref={navRef} className="p-1">
                    <li>
                        <Link className="block hover:text-info w-full p-2" href="/svgtools">SVG Tools</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
