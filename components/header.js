import Head from 'next/head'

import Nav from './nav'

export default function Header({ innerRef, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <Nav innerRef={innerRef} title={title} />
        </>
    )
}
