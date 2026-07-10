import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const projects = [
  { id:'01', name:'KS EVO', cn:'赛车模拟器概念设计', type:'SIM RACING / HMI', year:'2026', image:asset('/visual/project-ks-evo.png'), pages:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], color:'#ff5435', note:'将触控、显示与人机工学控制区整合进专业赛车方向盘，在高速状态下保持信息与操作的绝对清晰。', tags:['RESEARCH','ERGONOMICS','CMF'] },
  { id:'02', name:'ASAR', cn:'防晕 AR 眼镜', type:'WEARABLE / HEALTH', year:'2025', image:asset('/visual/asar-original.jpg'), pages:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34], color:'#98a99f', note:'以视觉补偿、前庭调节与嗅觉干预建立多感官协同体验，让高频出行回归舒适。', tags:['INSIGHT','WEARABLE','TECH'] },
  { id:'03', name:'VCRE', cn:'脊柱矫正康复外骨骼', type:'MEDICAL / EXOSKELETON', year:'2025', image:asset('/visual/project-vcre.png'), pages:[35,36,37,38,39,40,41,42], color:'#5b6b78', note:'在医疗级矫正与日常化康复之间寻找平衡，用模块化支撑回应真实的穿戴与康复场景。', tags:['MEDICAL','MODULAR','HUMAN FACTOR'] },
  { id:'04', name:'ALECS', cn:'无人月表勘探采集车', type:'MOBILITY / SPACE', year:'2025', image:asset('/visual/project-alecs.png'), pages:[43,44,45,46,47,48,49,50,51,52], color:'#b9b9b2', note:'面向月表资源探测与采样任务，用高机动悬架、感知单元和机械臂构成完整任务闭环。', tags:['MOBILITY','SYSTEM','SPACE'] }
]

const pageSrc = number => asset(`/portfolio/pages/p-${String(number).padStart(2,'0')}.jpg`)
const archivePages = [54,55,56,57,58,59,60]
const archiveLabels = ['录取通知书设计','品牌标志设计','广告视觉设计','机械臂造型设计','产品渲染练习','概念车设计','手绘练习']
const stripPages = Array.from({length:61},(_,index)=>index+1)
const indexProjects = [
  ...projects.map((project,index)=>({...project,indexImage:['/visual/index-ks.png','/visual/index-asar.png','/visual/index-vcre.png','/visual/index-alecs.png'].map(asset)[index],target:`#case-${project.id}`})),
  {id:'05',name:'GRAPHIC & ARCHIVE',cn:'平面设计 & 作品合辑',type:'VISUAL / ARCHIVE',indexImage:asset('/visual/index-archive.png'),target:'#archive'}
]
const awardItems = [
  '入围 2026 德国 iF 设计奖','美国 MUSE 设计奖银奖 ×2','美国好设计铜奖','旺旺时报金犊奖 · MSI 微星科技创作大赛优秀奖','入围 QQ 音乐车载音乐控件大赛','第19届中国好创意暨全国数字艺术设计大赛：省一等奖 ×1 / 省二等奖 ×2','第13届未来设计师暨全国高校数字艺术设计大赛：省二等奖 ×1 / 三等奖 ×3','第七届全国大学生工业设计大赛省三等奖','第八届全国大学生工业设计大赛：省二等奖 ×2 / 省三等奖 ×3','第八届上海广协 CMBA 神笔奖铜奖','第十届两岸新锐设计竞赛·华灿奖省一等奖','华夏奖文化艺术设计大赛：金奖 ×1 / 银奖 ×3 / 铜奖 ×2','第六届 SGADC 新加坡金沙艺术设计大赛铜奖 ×2','大学生视觉艺术设计大赛：国二等奖 ×1 / 省二等奖 ×2','西安工业大学录取通知书设计大赛一等奖'
]
const toolItems = [
  {name:'Photoshop',icon:asset('/tools/photoshop.svg')},{name:'Illustrator',icon:asset('/tools/illustrator.svg')},{name:'KeyShot',icon:asset('/tools/keyshot.png')},
  {name:'Rhino',icon:asset('/tools/rhino.svg')},{name:'SD ComfyUI',icon:asset('/tools/comfyui.svg')},{name:'Premiere Pro',icon:asset('/tools/premiere.svg')},
  {name:'After Effects',icon:asset('/tools/after-effects.svg')},{name:'SolidWorks',icon:asset('/tools/solidworks.png')},{name:'Figma',icon:asset('/tools/figma.svg')}
]

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>

function AutoFolioStrip(){
  const trackRef = useRef(null)
  const targetSpeed = useRef(.34)

  useEffect(()=>{
    const track = trackRef.current
    if(!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const compact = window.matchMedia('(max-width: 720px)').matches
    targetSpeed.current = compact ? .14 : .34
    let frame
    let x = 0
    let speed = .34
    let previous = performance.now()
    const tick = now => {
      const delta = Math.min(now-previous,40)
      previous = now
      speed += (targetSpeed.current-speed)*.035
      x -= speed*delta
      const loopWidth = track.scrollWidth/2
      if(loopWidth && -x>=loopWidth) x += loopWidth
      track.style.transform = `translate3d(${x}px,0,0)`
      track.dataset.speed = speed.toFixed(3)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(frame)
  },[])

  return <section className="folioStrip" aria-label="作品集横向浏览">
    <div className="folioStripHead shell" data-reveal>
      <div><span>03.5 / PORTFOLIO FILMSTRIP</span><b>AUTO SCROLL · HOVER TO SLOW</b></div>
      <output>01 / 61</output>
    </div>
    <div className="folioViewport" data-reveal onPointerEnter={()=>{targetSpeed.current=.075}} onPointerLeave={()=>{targetSpeed.current=window.matchMedia('(max-width: 720px)').matches?.14:.34}}>
      <div className="folioTrack" ref={trackRef}>
        {[...stripPages,...stripPages].map((page,index)=><figure key={`${page}-${index}`} aria-hidden={index>=stripPages.length}>
          <img src={pageSrc(page)} loading="lazy" alt={index<stripPages.length?`作品集第 ${page} 页`:''}/><figcaption>{String(page).padStart(2,'0')}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>
}

function App(){
  const [active,setActive] = useState(null)
  const [menu,setMenu] = useState(false)
  const [showTop,setShowTop] = useState(false)
  const [contactCard,setContactCard] = useState(false)
  const [activeStat,setActiveStat] = useState(null)

  useEffect(()=>{
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in')
    }),{threshold:.12})
    document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el))
    const move = e => {
      document.documentElement.style.setProperty('--mx',`${e.clientX}px`)
      document.documentElement.style.setProperty('--my',`${e.clientY}px`)
      const x = (e.clientX / window.innerWidth - .5) * 2
      const y = (e.clientY / window.innerHeight - .5) * 2
      document.documentElement.style.setProperty('--hero-x',`${x * 26}px`)
      document.documentElement.style.setProperty('--hero-y',`${y * 18}px`)
      document.documentElement.style.setProperty('--hero-image-x',`${x * -12}px`)
      document.documentElement.style.setProperty('--hero-image-y',`${y * -8}px`)
    }
    const syncScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scrollProgress',`${max > 0 ? (window.scrollY / max) * 100 : 0}%`)
      const viewport = Math.max(window.innerHeight, 1)
      const heroWipe = Math.min(Math.max(window.scrollY / (viewport * .95), 0), 1)
      const statement = document.querySelector('#statement')
      let statementWipe = 0
      if(statement){
        const rect = statement.getBoundingClientRect()
        const travel = Math.max(rect.height - viewport, viewport * .7)
        statementWipe = Math.min(Math.max((-rect.top) / travel, 0), 1)
      }
      document.documentElement.style.setProperty('--hero-wipe', heroWipe.toFixed(3))
      document.documentElement.style.setProperty('--statement-wipe', statementWipe.toFixed(3))
      setShowTop(window.scrollY > window.innerHeight * .8)
    }
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if(!coarsePointer) window.addEventListener('pointermove',move)
    window.addEventListener('scroll',syncScroll,{passive:true})
    syncScroll()
    return ()=>{ observer.disconnect(); if(!coarsePointer) window.removeEventListener('pointermove',move); window.removeEventListener('scroll',syncScroll) }
  },[])

  useEffect(()=>{
    document.body.style.overflow = active || contactCard ? 'hidden' : ''
    return ()=>{ document.body.style.overflow='' }
  },[active,contactCard])

  useEffect(()=>{
    const closeOnEscape=event=>{if(event.key==='Escape')setContactCard(false)}
    window.addEventListener('keydown',closeOnEscape)
    return ()=>window.removeEventListener('keydown',closeOnEscape)
  },[])

  const go = id => { document.querySelector(id)?.scrollIntoView({behavior:'smooth'}); setMenu(false) }

  return <main>
    <div className="scrollProgress" aria-hidden="true"/>
    <div className="cursorGlow" aria-hidden="true"/>
    <div className="cinemaBoot" aria-hidden="true">
      <div className="cinemaBootGrid"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
      <div className="cinemaBootText">
        <span>GJL DESIGN ARCHIVE / SYSTEM START</span>
        <b>DESIGNING<br/>THE UNSEEN.</b>
        <span>FORM · FUNCTION · EXPERIENCE</span>
      </div>
    </div>
    <button className={showTop?'floatingTop isVisible':'floatingTop'} onClick={()=>go('#top')} aria-label="返回顶部"><span>↑</span><small>TOP</small></button>
    <header className="topbar shell">
      <button className="logo" onClick={()=>setContactCard(true)} aria-label="查看谷嘉乐的联系方式"><b>GJL</b><span>谷嘉乐<br/>INDUSTRIAL DESIGNER</span></button>
      <nav className={menu?'nav open':'nav'}>
        <button onClick={()=>go('#work')}><span>WORK</span><small>作品</small></button>
        <button onClick={()=>go('#about')}><span>ABOUT</span><small>关于</small></button>
        <button onClick={()=>go('#contact')}><span>CONTACT</span><small>联系</small></button>
      </nav>
      <div className="navSide"><span><i/> AVAILABLE · 2026</span><button className="menu" onClick={()=>setMenu(!menu)}>{menu?'CLOSE':'MENU'}</button></div>
    </header>

    <section className="hero" id="top">
      <div className="heroNoise" aria-hidden="true"/>
      <div className="heroAura" aria-hidden="true"/>
      <div className="coverFrame" aria-hidden="true">
        <img src={asset('/visual/cover-original.jpg')} alt=""/>
        <div className="lightSweep"/>
      </div>
      <div className="heroMeta shell"><span>PORTFOLIO / 2026<small>谷嘉乐的个人设计小站</small></span><span>PRODUCT · FORM · EXPERIENCE</span></div>
      <div className="heroTitle shell">
        <p>产品设计不是描摹未来，<br/>而是让未知拥有形状。</p>
        <h1><span>DESIGNING</span><strong>THE UNSEEN<em>.</em></strong></h1>
      </div>
      <div className="heroFoot shell"><span>GU JIALE / 谷嘉乐</span><button onClick={()=>go('#statement')}>SCROLL TO EXPLORE <b>↓</b></button><span>XI'AN · CN</span></div>
    </section>

    <section className="statement" id="statement">
      <div className="statementSticky shell">
        <div className="sectionCode"><span>01</span> / APPROACH</div>
        <p data-reveal>BETWEEN <i>HUMAN</i><br/>AND <i>TECHNOLOGY,</i><br/>I DESIGN THE<br/><strong>INTERACTION.</strong></p>
        <div className="statementCopy" data-reveal><span>我的设计方法</span><p>从人的真实行为出发，把技术、工程与情绪价值压缩进一个克制而准确的产品形态。</p></div>
      </div>
    </section>

    <section className="about shell" id="about">
      <div className="sectionCode" data-reveal><span>02</span> / PROFILE</div>
      <div className="aboutGrid">
        <div className="aboutImage" data-reveal>
          <img src={asset('/portfolio/portrait-20260703.png')} alt="谷嘉乐个人肖像"/>
          <div className="portraitType" aria-hidden="true">
            <span className="portraitMark">GJL / ID DESIGNER</span>
            <span className="portraitPlace">XI'AN · CN</span>
            <span className="portraitYear">2026</span>
          </div>
        </div>
        <div className="aboutBody" data-reveal>
          <p className="micro">PRODUCT ID DESIGNER · XI'AN</p>
          <h2>让产品不仅<br/>被看见，更被<strong>感知。</strong></h2>
          <p className="aboutIntro">西安工业大学产品设计专业。关注智能硬件、未来出行与医疗健康，擅长从场景洞察、造型推导到建模渲染的完整设计表达。</p>
          <div className="career">
            <div className="careerItem" tabIndex="0"><time>2026</time><p>北京洛可可科技有限公司<span>ID 设计 / 建模渲染</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 项目经历</small><ul><li>尚宏仪表智能双模水表创新设计</li><li>米奥充电机器人外观设计</li><li>联宠 C09 / C10 智能猫砂盆外观及机构推导</li><li>沐岚香薰产品设计</li><li>SAZA 男士香氛全案设计与落地</li><li>碧水源智能模块化水厂设计</li></ul></aside></div>
            <div className="careerItem" tabIndex="0"><time>2025</time><p>徐州滨峰狮网络设计公司<span>ID 设计 / 建模渲染</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 项目经历</small><ul><li>ORAELE 出口香水外包装设计</li><li>CLNMOORE 神眸摄像头详情页宣发设计</li><li>产品建模、材质与效果图渲染</li></ul></aside></div>
            <div className="careerItem" tabIndex="0"><time>2024—</time><p>西安工业大学兵器装备工业设计中心<span>项目设计成员</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 项目经历</small><ul><li>新疆文创 LOGO 全案设计</li><li>XX 型远程多管火箭炮设计</li><li>XX 型指挥车设计</li><li>氢氧焰烧蚀平台合作项目</li><li>西安工业大学录取通知书设计与落地</li></ul></aside></div>
          </div>
        </div>
      </div>
      <div className="numbers" data-reveal>
        <div className={activeStat==='awards'?'statCard statAwards isOpen':'statCard statAwards'} data-stat="awards" tabIndex="0" onPointerEnter={()=>setActiveStat('awards')} onPointerLeave={()=>setActiveStat(null)} onFocus={()=>setActiveStat('awards')} onBlur={()=>setActiveStat(null)}><b>20<sup>+</sup></b><span className="statLabel"><strong>设计奖项</strong><small>DESIGN AWARDS</small></span><i className="statHint">点击查看 <em>↗</em></i>
          <aside className="statPopover awardsPopover"><header><small>AWARD EXPERIENCE / 获奖经历</small><strong>所获奖项</strong></header><ol>{awardItems.map((award,index)=><li key={award}><em>{String(index+1).padStart(2,'0')}</em><span>{award}</span></li>)}</ol></aside>
        </div>
        <div className={activeStat==='projects'?'statCard statProjects isOpen':'statCard statProjects'} data-stat="projects" tabIndex="0" onPointerEnter={()=>setActiveStat('projects')} onPointerLeave={()=>setActiveStat(null)} onFocus={()=>setActiveStat('projects')} onBlur={()=>setActiveStat(null)}><b>04</b><span className="statLabel"><strong>核心项目</strong><small>CORE PROJECTS</small></span><i className="statHint">点击查看 <em>↗</em></i>
          <aside className="statPopover projectsPopover"><header><small>SELECTED PROJECTS / 精选项目</small><strong>核心项目 · 04</strong></header><div className="statProjectList">{projects.map(project=><button key={project.id} onClick={()=>go(`#case-${project.id}`)}><em>{project.id}</em><span><b>{project.name}</b><small>{project.cn}</small></span><Arrow/></button>)}</div></aside>
        </div>
        <div className={activeStat==='tools'?'statCard statTools isOpen':'statCard statTools'} data-stat="tools" tabIndex="0" onPointerEnter={()=>setActiveStat('tools')} onPointerLeave={()=>setActiveStat(null)} onFocus={()=>setActiveStat('tools')} onBlur={()=>setActiveStat(null)}><b>09<sup>+</sup></b><span className="statLabel"><strong>设计工具</strong><small>DESIGN TOOLS</small></span><i className="statHint">点击查看 <em>↗</em></i>
          <aside className="statPopover toolsPopover"><header><small>DESIGN WORKFLOW / 设计流程</small><strong>工具矩阵 · 09</strong></header><div className="toolGrid">{toolItems.map(tool=><div key={tool.name}><span className="toolIcon"><img src={tool.icon} alt={`${tool.name} 软件图标`}/></span><b>{tool.name}</b></div>)}</div></aside>
        </div>
      </div>
    </section>

    <section className="portfolioIndex shell" id="index">
      <div className="indexTop" data-reveal><div className="sectionCode"><span>03</span> / CONTENTS</div><p>PORTFOLIO INDEX<br/>作品目录</p></div>
      <div className="indexVisual" data-reveal>
        <div className="indexGallery">
          {indexProjects.map(project=><button className="indexCard" key={project.id} onClick={()=>go(project.target)} onPointerMove={event=>{
            const rect=event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--index-x',`${event.clientX-rect.left}px`)
            event.currentTarget.style.setProperty('--index-y',`${event.clientY-rect.top}px`)
          }} aria-label={`前往 ${project.name} 项目`}>
            <span className="indexNumber">{project.id}</span>
            <img src={project.indexImage} alt=""/>
            <span className="indexShade" aria-hidden="true"/>
            <span className="indexCursor" aria-hidden="true">OPEN</span>
            <span className="indexLabel"><small>{project.type}</small><b>{project.name}</b><em>{project.cn}</em></span>
            <Arrow/>
          </button>)}
        </div>
      </div>
    </section>

    <AutoFolioStrip/>

    <div className="ticker tickerReverse" aria-hidden="true"><div>RESEARCH · IDEATION · FORM · PROTOTYPE · CMF · EXPERIENCE · RESEARCH · IDEATION · FORM · PROTOTYPE · CMF · EXPERIENCE ·</div></div>

    <section className="work" id="work">
      <div className="workHead shell" data-reveal>
        <div className="sectionCode"><span>04</span> / SELECTED WORK</div>
        <h2>SELECTED<br/><i>OBJECTS</i><sup>04</sup></h2>
        <p>2024—2026<br/>PRODUCT / ID / CONCEPT</p>
      </div>
      <div className="projects">
        {projects.map(project=><article className={`project project--${project.id}`} id={`case-${project.id}`} key={project.id} style={{'--accent':project.color}} data-reveal>
          <button className="projectMedia" onPointerMove={event=>{
            const rect = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--card-x',`${event.clientX-rect.left}px`)
            event.currentTarget.style.setProperty('--card-y',`${event.clientY-rect.top}px`)
          }} onClick={()=>setActive(project)} aria-label={`查看 ${project.name} 项目`}>
            <img src={project.image} alt={project.cn}/><span className="projectTint"/>
            <span className="projectNo">{project.id}</span><span className="projectCursor" aria-hidden="true">VIEW</span><span className="projectAction">VIEW PROJECT <Arrow/></span>
          </button>
          <div className="projectLine shell">
            <div><span>{project.type}</span><span>{project.year}</span></div>
            <h3>{project.name}</h3>
            <div className="projectText"><b>{project.cn}</b><p>{project.note}</p></div>
          </div>
        </article>)}
      </div>
    </section>

    <section className="archive shell" id="archive">
      <div className="archiveHead" data-reveal><div className="sectionCode"><span>05</span> / EXTENDED PRACTICE</div><h2>MORE<br/><i>WORKS</i></h2><p>包装 / 视觉 / 标志<br/>建模 / 渲染 / 手绘</p></div>
      <div className="archiveGrid">
        {archivePages.map((page,index)=><figure key={page} data-reveal><img src={pageSrc(page)} alt={`扩展作品集第 ${page} 页`}/><figcaption><span>{String(index+1).padStart(2,'0')}</span><b>{archiveLabels[index]}</b></figcaption></figure>)}
      </div>
    </section>

    <div className="ticker" aria-hidden="true"><div>INDUSTRIAL DESIGN · HUMAN EXPERIENCE · FUTURE OBJECTS · INDUSTRIAL DESIGN · HUMAN EXPERIENCE · FUTURE OBJECTS ·</div></div>

    <section className="contact" id="contact">
      <div className="contactLight"/>
      <div className="shell contactInner" data-reveal>
        <div className="sectionCode"><span>06</span> / CONTACT</div>
        <p>HAVE AN IDEA?</p>
        <h2>LET'S MAKE IT<br/><i>VISIBLE.</i></h2>
        <a href="mailto:2735901862@qq.com">START A CONVERSATION <Arrow/></a>
        <div className="contactMeta"><span>2735901862@qq.com</span><span>WECHAT / Gjl2735901862</span><span>155 9178 6656</span><button onClick={()=>go('#top')}>BACK TO TOP ↑</button></div>
      </div>
    </section>

    {contactCard&&<div className="contactCardLayer" role="presentation" onClick={event=>{if(event.target===event.currentTarget)setContactCard(false)}}>
      <section className="contactCard" role="dialog" aria-modal="true" aria-labelledby="contact-card-title">
        <button className="contactCardClose" onClick={()=>setContactCard(false)} aria-label="关闭联系方式">×</button>
        <div className="contactCardCode">GJL / CONTACT</div>
        <h2 id="contact-card-title">LET'S<br/><i>CONNECT.</i></h2>
        <div className="contactCardRows">
          <a href="tel:15591786656"><span>PHONE</span><b>155 9178 6656</b><Arrow/></a>
          <a href="mailto:2735901862@qq.com"><span>EMAIL</span><b>2735901862@qq.com</b><Arrow/></a>
          <p><span>WECHAT</span><b>Gjl2735901862</b></p>
        </div>
      </section>
    </div>}

    {active&&<div className="modal" role="dialog" aria-modal="true" aria-label={`${active.name} 项目详情`}>
      <button className="modalClose" onClick={()=>setActive(null)}>CLOSE <span>×</span></button>
      <div className="modalHead shell"><div><span>{active.id} / CASE STUDY</span><h2>{active.name}</h2></div><p>{active.cn}<br/><small>{active.type} · {active.year}</small></p></div>
      <div className="modalInfo shell"><p>{active.note}</p><div>{active.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
      <div className="casePages shell">{active.pages.map((page,index)=><figure className={index===0||index%5===0?'caseWide':''} key={page}><img src={pageSrc(page)} alt={`${active.cn} - 作品集第 ${page} 页`}/><figcaption>{String(page).padStart(2,'0')} / {String(active.pages.at(-1)).padStart(2,'0')}</figcaption></figure>)}</div>
    </div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)
