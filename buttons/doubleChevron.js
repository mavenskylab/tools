import { useState } from 'react'

export default function DoubleChevron({ isCollapsed, setCollapsed, rotation, delay }) {
    rotation = rotation ?? 0
    delay = delay ?? ''

    function handleClick() {
        setCollapsed(!isCollapsed)
    }

    return (
        <button type="button" className="group bg-slate-300 hover:bg-slate-400 outline-2 outline-slate-900 hover:outline focus:outline active:outline active:outline-info rounded p-2"
            onClick={handleClick}>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={`fill-slate-700 group-hover:fill-slate-900 group-active:fill-info transition-transform duration-300 ${delay} w-8 h-8`}
                style={{ rotate: `${rotation - (isCollapsed ? 0 : 180)}deg` }}>
                <title>Show/Hide Measurements</title>
                <g>
                    <path d="M481.911,239.541L249.184,6.818c-9.087-9.089-23.824-9.089-32.912,0.002
                        c-9.087,9.089-9.087,23.824,0,32.912l216.27,216.266l-216.27,216.275c-9.087,9.089-9.087,23.824,0,32.912
                        c4.544,4.544,10.501,6.816,16.455,6.816s11.913-2.271,16.457-6.817l232.727-232.732c4.364-4.364,6.816-10.283,6.816-16.455
                        C488.727,249.824,486.276,243.905,481.911,239.541z"/>
                    <path d="M302.547,255.994c0-6.173-2.453-12.093-6.817-16.457L63.001,6.816
                        c-9.089-9.089-23.824-9.089-32.912,0.002c-9.087,9.089-9.087,23.824,0.002,32.912l216.272,216.266L30.089,472.272
                        c-9.087,9.089-9.087,23.824,0.002,32.912c4.543,4.544,10.499,6.816,16.455,6.816s11.913-2.271,16.457-6.817L295.731,272.45
                        C300.094,268.087,302.547,262.166,302.547,255.994z"/>
                </g>
            </svg>
        </button>
    )
}
