import Header from '@/components/header'
import Footer from '@/components/footer'

import useWindowSize from '@/hooks/useWindowSize'

export default function BorderPane({ title, sidebar, content }) {
    const windowSize = useWindowSize()

    return (
        <main>
            <div className="bg-slate w-full" style={{ height: windowSize.height }}>
                <div className="bg-slate-100 absolute w-full h-14">
                    <Header title={title} />
                </div>
                <div className="flex w-full max-w-full h-full pt-14">
                    <div className="h-full z-10 pt-1 pr-1">
                        <div className="bg-slate-100 h-full">{sidebar}</div>
                    </div>
                    <div className="w-full pb-12">
                        <div className="w-full h-full py-1">
                            {content}
                        </div>
                    </div>
                    <div className="absolute w-full h-12 pl-56 bottom-0">
                        <div className="w-full h-full pl-1">
                            <div className="bg-slate-100 h-full px-2">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
