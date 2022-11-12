export default function Sidebar({ width, content }) {
    width = width ?? 'w-56'

    return (
        <div className={`overflow-x-hidden h-full ${width} p-2`}>{content}</div>
    )
}
