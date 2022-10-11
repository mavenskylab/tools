export default function Footer({ content }) {
    content = content ?? <p>
        {"Made by "}
        <a href="https://github.com/mavenskylab" target="_blank">mavenskylab</a>
        {". Source code available at "}
        <a href="https://github.com/mavenskylab" target="_blank">Github</a>
        .
    </p>


    return (
        <footer className={`w-full p-2`}>{content}</footer>
    )
}
