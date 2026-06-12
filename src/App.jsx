import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalProvider }   from './context/ModalContext'
import ChromaticBackground from './components/ui/ChromaticBackground'
import LoadingScreen       from './components/ui/LoadingScreen'
import GlobalAtmosphere    from './components/ui/GlobalAtmosphere'
import SectionBridge       from './components/ui/SectionBridge'
import ProjectModal        from './components/ui/ProjectModal'
import CaseStudyModal      from './components/ui/CaseStudyModal'
import Header              from './components/layout/Header'
import Hero                from './components/sections/Hero'
import Experience          from './components/sections/Experience'
import Services            from './components/sections/Services'
import AIDev               from './components/sections/AIDev'
import Branding            from './components/sections/Branding'
import WebDesign           from './components/sections/WebDesign'
import ContentYoutube      from './components/sections/ContentYoutube'
import Work                from './components/sections/Work'
import Process             from './components/sections/Process'
import Contact             from './components/sections/Contact'

function AppInner() {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.language || 'en'
  }, [i18n.language])

  return (
    <>
      <LoadingScreen />
      <ChromaticBackground />
      <GlobalAtmosphere />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main>
          <Hero />
          <SectionBridge offset="right" />
          <Experience />
          <SectionBridge offset="center" />
          <Services />
          <SectionBridge offset="left" />
          <AIDev />
          <SectionBridge offset="right" />
          <Branding />
          <SectionBridge offset="center" />
          <WebDesign />
          <SectionBridge offset="left" />
          <ContentYoutube />
          <SectionBridge offset="right" />
          <Work />
          <SectionBridge offset="center" />
          <Process />
          <SectionBridge offset="left" intensity={1.2} />
          <Contact />
        </main>
      </div>
      <ProjectModal />
      <CaseStudyModal />
    </>
  )
}

export default function App() {
  return (
    <ModalProvider>
      <AppInner />
    </ModalProvider>
  )
}
