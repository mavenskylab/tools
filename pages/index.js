import BorderPane from '../layouts/borderPane'

import Sidebar from '../components/sidebar'

export default function Home() {
    return (
        <>
            <BorderPane title={'Home'} sidebar={<Sidebar />} />
        </>
    )
}
