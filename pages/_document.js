import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
                {/* Dev stylesheet */}
                {/* <link rel="stylesheet" type="text/css" href="dev.css" /> */}
            </Head>
            <body className="dark:bg-slate text-neutral-300">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
