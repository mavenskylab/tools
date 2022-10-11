import Link from 'next/link'

export default function Footer({ content }) {
    content = content ?? <p>
        {"Made by "}
        <Link href="https://github.com/mavenskylab" target="_blank" rel="noopener noreferrer">
            <a>mavenskylab</a>
        </Link>
        {". Source code available at "}
        <Link href="https://github.com/mavenskylab" target="_blank" rel="noopener noreferrer">
            <a>Github</a>
        </Link>
        .
    </p>


    return (
        <footer className={`w-full p-2`}>{content}</footer>
    )
}
