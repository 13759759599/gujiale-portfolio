import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const projects = [
  { id:'01', name:'KS EVO', cn:'璧涜溅妯℃嫙鍣ㄦ蹇佃璁?, type:'SIM RACING / HMI', year:'2026', image:asset('/visual/project-ks-evo.png'), pages:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], color:'#ff5435', note:'灏嗚Е鎺с€佹樉绀轰笌浜烘満宸ュ鎺у埗鍖烘暣鍚堣繘涓撲笟璧涜溅鏂瑰悜鐩橈紝鍦ㄩ珮閫熺姸鎬佷笅淇濇寔淇℃伅涓庢搷浣滅殑缁濆娓呮櫚銆?, tags:['RESEARCH','ERGONOMICS','CMF'] },
  { id:'02', name:'ASAR', cn:'闃叉檿 AR 鐪奸暅', type:'WEARABLE / HEALTH', year:'2025', image:asset('/visual/asar-original.jpg'), pages:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34], color:'#98a99f', note:'浠ヨ瑙夎ˉ鍋裤€佸墠搴皟鑺備笌鍡呰骞查寤虹珛澶氭劅瀹樺崗鍚屼綋楠岋紝璁╅珮棰戝嚭琛屽洖褰掕垝閫傘€?, tags:['INSIGHT','WEARABLE','TECH'] },
  { id:'03', name:'VCRE', cn:'鑴婃煴鐭搴峰澶栭楠?, type:'MEDICAL / EXOSKELETON', year:'2025', image:asset('/visual/project-vcre.png'), pages:[35,36,37,38,39,40,41,42], color:'#5b6b78', note:'鍦ㄥ尰鐤楃骇鐭涓庢棩甯稿寲搴峰涔嬮棿瀵绘壘骞宠　锛岀敤妯″潡鍖栨敮鎾戝洖搴旂湡瀹炵殑绌挎埓涓庡悍澶嶅満鏅€?, tags:['MEDICAL','MODULAR','HUMAN FACTOR'] },
  { id:'04', name:'ALECS', cn:'鏃犱汉鏈堣〃鍕樻帰閲囬泦杞?, type:'MOBILITY / SPACE', year:'2025', image:asset('/visual/project-alecs.png'), pages:[43,44,45,46,47,48,49,50,51,52], color:'#b9b9b2', note:'闈㈠悜鏈堣〃璧勬簮鎺㈡祴涓庨噰鏍蜂换鍔★紝鐢ㄩ珮鏈哄姩鎮灦銆佹劅鐭ュ崟鍏冨拰鏈烘鑷傛瀯鎴愬畬鏁翠换鍔￠棴鐜€?, tags:['MOBILITY','SYSTEM','SPACE'] }
]

const pageSrc = number => asset(`/portfolio/pages/p-${String(number).padStart(2,'0')}.jpg`)
const archivePages = [54,55,56,57,58,59,60]
const archiveLabels = ['褰曞彇閫氱煡涔﹁璁?,'鍝佺墝鏍囧織璁捐','骞垮憡瑙嗚璁捐','鏈烘鑷傞€犲瀷璁捐','浜у搧娓叉煋缁冧範','姒傚康杞﹁璁?,'鎵嬬粯缁冧範']
const stripPages = Array.from({length:61},(_,index)=>index+1)
const indexProjects = [
  ...projects.map((project,index)=>({...project,indexImage:['/visual/index-ks.png','/visual/index-asar.png','/visual/index-vcre.png','/visual/index-alecs.png'].map(asset)[index],target:`#case-${project.id}`})),
  {id:'05',name:'GRAPHIC & ARCHIVE',cn:'骞抽潰璁捐 & 浣滃搧鍚堣緫',type:'VISUAL / ARCHIVE',indexImage:asset('/visual/index-archive.png'),target:'#archive'}
]
const awardItems = [
  '鍏ュ洿 2026 寰峰浗 iF 璁捐濂?,'缇庡浗 MUSE 璁捐濂栭摱濂?脳2','缇庡浗濂借璁￠摐濂?,'鏃烘椇鏃舵姤閲戠妸濂?路 MSI 寰槦绉戞妧鍒涗綔澶ц禌浼樼濂?,'鍏ュ洿 QQ 闊充箰杞﹁浇闊充箰鎺т欢澶ц禌','绗?9灞婁腑鍥藉ソ鍒涙剰鏆ㄥ叏鍥芥暟瀛楄壓鏈璁″ぇ璧涳細鐪佷竴绛夊 脳1 / 鐪佷簩绛夊 脳2','绗?3灞婃湭鏉ヨ璁″笀鏆ㄥ叏鍥介珮鏍℃暟瀛楄壓鏈璁″ぇ璧涳細鐪佷簩绛夊 脳1 / 涓夌瓑濂?脳3','绗竷灞婂叏鍥藉ぇ瀛︾敓宸ヤ笟璁捐澶ц禌鐪佷笁绛夊','绗叓灞婂叏鍥藉ぇ瀛︾敓宸ヤ笟璁捐澶ц禌锛氱渷浜岀瓑濂?脳2 / 鐪佷笁绛夊 脳3','绗叓灞婁笂娴峰箍鍗?CMBA 绁炵瑪濂栭摐濂?,'绗崄灞婁袱宀告柊閿愯璁＄珵璧浡峰崕鐏垮鐪佷竴绛夊','鍗庡濂栨枃鍖栬壓鏈璁″ぇ璧涳細閲戝 脳1 / 閾跺 脳3 / 閾滃 脳2','绗叚灞?SGADC 鏂板姞鍧￠噾娌欒壓鏈璁″ぇ璧涢摐濂?脳2','澶у鐢熻瑙夎壓鏈璁″ぇ璧涳細鍥戒簩绛夊 脳1 / 鐪佷簩绛夊 脳2','瑗垮畨宸ヤ笟澶у褰曞彇閫氱煡涔﹁璁″ぇ璧涗竴绛夊'
]
const toolItems = [
  {name:'Photoshop',icon:asset('/tools/photoshop.svg')},{name:'Illustrator',icon:asset('/tools/illustrator.svg')},{name:'KeyShot',icon:asset('/tools/keyshot.png')},
  {name:'Rhino',icon:asset('/tools/rhino.svg')},{name:'SD ComfyUI',icon:asset('/tools/comfyui.svg')},{name:'Premiere Pro',icon:asset('/tools/premiere.svg')},
  {name:'After Effects',icon:asset('/tools/after-effects.svg')},{name:'SolidWorks',icon:asset('/tools/solidworks.png')},{name:'Figma',icon:asset('/tools/figma.svg')}
]

const Arrow = () => <span className="arrow" aria-hidden="true">鈫?/span>

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

  return <section className="folioStrip" aria-label="浣滃搧闆嗘í鍚戞祻瑙?>
    <div className="folioStripHead shell" data-reveal>
      <div><span>03.5 / PORTFOLIO FILMSTRIP</span><b>AUTO SCROLL 路 HOVER TO SLOW</b></div>
      <output>01 / 61</output>
    </div>
    <div className="folioViewport" data-reveal onPointerEnter={()=>{targetSpeed.current=.075}} onPointerLeave={()=>{targetSpeed.current=window.matchMedia('(max-width: 720px)').matches?.14:.34}}>
      <div className="folioTrack" ref={trackRef}>
        {[...stripPages,...stripPages].map((page,index)=><figure key={`${page}-${index}`} aria-hidden={index>=stripPages.length}>
          <img src={pageSrc(page)} loading="lazy" alt={index<stripPages.length?`浣滃搧闆嗙 ${page} 椤礰:''}/><figcaption>{String(page).padStart(2,'0')}</figcaption>
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
        <span>FORM 路 FUNCTION 路 EXPERIENCE</span>
      </div>
    </div>
    <button className={showTop?'floatingTop isVisible':'floatingTop'} onClick={()=>go('#top')} aria-label="杩斿洖椤堕儴"><span>鈫?/span><small>TOP</small></button>
    <header className="topbar shell">
      <button className="logo" onClick={()=>setContactCard(true)} aria-label="鏌ョ湅璋峰槈涔愮殑鑱旂郴鏂瑰紡"><b>GJL</b><span>璋峰槈涔?br/>INDUSTRIAL DESIGNER</span></button>
      <nav className={menu?'nav open':'nav'}>
        <button onClick={()=>go('#work')}><span>WORK</span><small>浣滃搧</small></button>
        <button onClick={()=>go('#about')}><span>ABOUT</span><small>鍏充簬</small></button>
        <button onClick={()=>go('#contact')}><span>CONTACT</span><small>鑱旂郴</small></button>
      </nav>
      <div className="navSide"><span><i/> AVAILABLE 路 2026</span><a className="visualSwitch" href="https://www.gujiale.cn" target="_blank" rel="noreferrer">切换视觉设计作品集</a><button className="menu" onClick={()=>setMenu(!menu)}>{menu?'CLOSE':'MENU'}</button></div>
    </header>

    <section className="hero" id="top">
      <div className="heroNoise" aria-hidden="true"/>
      <div className="heroAura" aria-hidden="true"/>
      <div className="coverFrame" aria-hidden="true">
        <img src={asset('/visual/cover-original.jpg')} alt=""/>
        <div className="lightSweep"/>
      </div>
      <div className="heroMeta shell"><span>PORTFOLIO / 2026<small>璋峰槈涔愮殑涓汉璁捐灏忕珯</small></span><span>PRODUCT 路 FORM 路 EXPERIENCE</span></div>
      <div className="heroTitle shell">
        <p>浜у搧璁捐涓嶆槸鎻忔懝鏈潵锛?br/>鑰屾槸璁╂湭鐭ユ嫢鏈夊舰鐘躲€?/p>
        <h1><span>DESIGNING</span><strong>THE UNSEEN<em>.</em></strong></h1>
      </div>
      <div className="heroFoot shell"><span>GU JIALE / 璋峰槈涔?/span><button onClick={()=>go('#statement')}>SCROLL TO EXPLORE <b>鈫?/b></button><span>XI'AN 路 CN</span></div>
    </section>

    <section className="statement" id="statement">
      <div className="statementSticky shell">
        <div className="sectionCode"><span>01</span> / APPROACH</div>
        <p data-reveal>BETWEEN <i>HUMAN</i><br/>AND <i>TECHNOLOGY,</i><br/>I DESIGN THE<br/><strong>INTERACTION.</strong></p>
        <div className="statementCopy" data-reveal><span>鎴戠殑璁捐鏂规硶</span><p>浠庝汉鐨勭湡瀹炶涓哄嚭鍙戯紝鎶婃妧鏈€佸伐绋嬩笌鎯呯华浠峰€煎帇缂╄繘涓€涓厠鍒惰€屽噯纭殑浜у搧褰㈡€併€?/p></div>
      </div>
    </section>

    <section className="about shell" id="about">
      <div className="sectionCode" data-reveal><span>02</span> / PROFILE</div>
      <div className="aboutGrid">
        <div className="aboutImage" data-reveal>
          <img src={asset('/portfolio/portrait-20260703.png')} alt="璋峰槈涔愪釜浜鸿倴鍍?/>
          <div className="portraitType" aria-hidden="true">
            <span className="portraitMark">GJL / ID DESIGNER</span>
            <span className="portraitPlace">XI'AN 路 CN</span>
            <span className="portraitYear">2026</span>
          </div>
        </div>
        <div className="aboutBody" data-reveal>
          <p className="micro">PRODUCT ID DESIGNER 路 XI'AN</p>
          <h2>璁╀骇鍝佷笉浠?br/>琚湅瑙侊紝鏇磋<strong>鎰熺煡銆?/strong></h2>
          <p className="aboutIntro">瑗垮畨宸ヤ笟澶у浜у搧璁捐涓撲笟銆傚叧娉ㄦ櫤鑳界‖浠躲€佹湭鏉ュ嚭琛屼笌鍖荤枟鍋ュ悍锛屾搮闀夸粠鍦烘櫙娲炲療銆侀€犲瀷鎺ㄥ鍒板缓妯℃覆鏌撶殑瀹屾暣璁捐琛ㄨ揪銆?/p>
          <div className="career">
            <div className="careerItem" tabIndex="0"><time>2026</time><p>鍖椾含娲涘彲鍙鎶€鏈夐檺鍏徃<span>ID 璁捐 / 寤烘ā娓叉煋</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 椤圭洰缁忓巻</small><ul><li>灏氬畯浠〃鏅鸿兘鍙屾ā姘磋〃鍒涙柊璁捐</li><li>绫冲ゥ鍏呯數鏈哄櫒浜哄瑙傝璁?/li><li>鑱斿疇 C09 / C10 鏅鸿兘鐚爞鐩嗗瑙傚強鏈烘瀯鎺ㄥ</li><li>娌愬矚棣欒柊浜у搧璁捐</li><li>SAZA 鐢峰＋棣欐皼鍏ㄦ璁捐涓庤惤鍦?/li><li>纰ф按婧愭櫤鑳芥ā鍧楀寲姘村巶璁捐</li></ul></aside></div>
            <div className="careerItem" tabIndex="0"><time>2025</time><p>寰愬窞婊ㄥ嘲鐙綉缁滆璁″叕鍙?span>ID 璁捐 / 寤烘ā娓叉煋</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 椤圭洰缁忓巻</small><ul><li>ORAELE 鍑哄彛棣欐按澶栧寘瑁呰璁?/li><li>CLNMOORE 绁炵湼鎽勫儚澶磋鎯呴〉瀹ｅ彂璁捐</li><li>浜у搧寤烘ā銆佹潗璐ㄤ笌鏁堟灉鍥炬覆鏌?/li></ul></aside></div>
            <div className="careerItem" tabIndex="0"><time>2024鈥?/time><p>瑗垮畨宸ヤ笟澶у鍏靛櫒瑁呭宸ヤ笟璁捐涓績<span>椤圭洰璁捐鎴愬憳</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 椤圭洰缁忓巻</small><ul><li>鏂扮枂鏂囧垱 LOGO 鍏ㄦ璁捐</li><li>XX 鍨嬭繙绋嬪绠＄伀绠偖璁捐</li><li>XX 鍨嬫寚鎸ヨ溅璁捐</li><li>姘㈡哀鐒扮儳铓€骞冲彴鍚堜綔椤圭洰</li><li>瑗垮畨宸ヤ笟澶у褰曞彇閫氱煡涔﹁璁′笌钀藉湴</li></ul></aside></div>
          </div>
        </div>
      </div>
      <div className="numbers" data-reveal>
        <div className={activeStat==='awards'?'statCard statAwards isOpen':'statCard statAwards'} data-stat="awards" tabIndex="0" onPointerEnter={()=>setActiveStat('awards')} onPointerLeave={()=>setActiveStat(null)} onFocus={()=>setActiveStat('awards')} onBlur={()=>setActiveStat(null)}><b>20<sup>+</sup></b><span className="statLabel"><strong>璁捐濂栭」</strong><small>DESIGN AWARDS</small></span><i className="statHint">鐐瑰嚮鏌ョ湅 <em>鈫?/em></i>
          <aside className="statPopover awardsPopover"><header><small>AWARD EXPERIENCE / 鑾峰缁忓巻</small><strong>鎵€鑾峰椤?/strong></header><ol>{awardItems.map((award,index)=><li key={award}><em>{String(index+1).padStart(2,'0')}</em><span>{award}</span></li>)}</ol></aside>
        </div>
        <div className={activeStat==='projects'?'statCard statProjects isOpen':'statCard statProjects'} data-stat="projects" tabIndex="0" onPointerEnter={()=>setActiveStat('projects')} onPointerLeave={()=>setActiveStat(null)} onFocus={()=>setActiveStat('projects')} onBlur={()=>setActiveStat(null)}><b>04</b><span className="statLabel"><strong>鏍稿績椤圭洰</strong><small>CORE PROJECTS</small></span><i className="statHint">鐐瑰嚮鏌ョ湅 <em>鈫?/em></i>
          <aside className="statPopover projectsPopover"><header><small>SELECTED PROJECTS / 绮鹃€夐」鐩?/small><strong>鏍稿績椤圭洰 路 04</strong></header><div className="statProjectList">{projects.map(project=><button key={project.id} onClick={()=>go(`#case-${project.id}`)}><em>{project.id}</em><span><b>{project.name}</b><small>{project.cn}</small></span><Arrow/></button>)}</div></aside>
        </div>
        <div className={activeStat==='tools'?'statCard statTools isOpen':'statCard statTools'} data-stat="tools" tabIndex="0" onPointerEnter={()=>setActiveStat('tools')} onPointerLeave={()=>setActiveStat(null)} onFocus={()=>setActiveStat('tools')} onBlur={()=>setActiveStat(null)}><b>09<sup>+</sup></b><span className="statLabel"><strong>璁捐宸ュ叿</strong><small>DESIGN TOOLS</small></span><i className="statHint">鐐瑰嚮鏌ョ湅 <em>鈫?/em></i>
          <aside className="statPopover toolsPopover"><header><small>DESIGN WORKFLOW / 璁捐娴佺▼</small><strong>宸ュ叿鐭╅樀 路 09</strong></header><div className="toolGrid">{toolItems.map(tool=><div key={tool.name}><span className="toolIcon"><img src={tool.icon} alt={`${tool.name} 杞欢鍥炬爣`}/></span><b>{tool.name}</b></div>)}</div></aside>
        </div>
      </div>
    </section>

    <section className="portfolioIndex shell" id="index">
      <div className="indexTop" data-reveal><div className="sectionCode"><span>03</span> / CONTENTS</div><p>PORTFOLIO INDEX<br/>浣滃搧鐩綍</p></div>
      <div className="indexVisual" data-reveal>
        <div className="indexGallery">
          {indexProjects.map(project=><button className="indexCard" key={project.id} onClick={()=>go(project.target)} onPointerMove={event=>{
            const rect=event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--index-x',`${event.clientX-rect.left}px`)
            event.currentTarget.style.setProperty('--index-y',`${event.clientY-rect.top}px`)
          }} aria-label={`鍓嶅線 ${project.name} 椤圭洰`}>
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

    <div className="ticker tickerReverse" aria-hidden="true"><div>RESEARCH 路 IDEATION 路 FORM 路 PROTOTYPE 路 CMF 路 EXPERIENCE 路 RESEARCH 路 IDEATION 路 FORM 路 PROTOTYPE 路 CMF 路 EXPERIENCE 路</div></div>

    <section className="work" id="work">
      <div className="workHead shell" data-reveal>
        <div className="sectionCode"><span>04</span> / SELECTED WORK</div>
        <h2>SELECTED<br/><i>OBJECTS</i><sup>04</sup></h2>
        <p>2024鈥?026<br/>PRODUCT / ID / CONCEPT</p>
      </div>
      <div className="projects">
        {projects.map(project=><article className={`project project--${project.id}`} id={`case-${project.id}`} key={project.id} style={{'--accent':project.color}} data-reveal>
          <button className="projectMedia" onPointerMove={event=>{
            const rect = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--card-x',`${event.clientX-rect.left}px`)
            event.currentTarget.style.setProperty('--card-y',`${event.clientY-rect.top}px`)
          }} onClick={()=>setActive(project)} aria-label={`鏌ョ湅 ${project.name} 椤圭洰`}>
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
      <div className="archiveHead" data-reveal><div className="sectionCode"><span>05</span> / EXTENDED PRACTICE</div><h2>MORE<br/><i>WORKS</i></h2><p>鍖呰 / 瑙嗚 / 鏍囧織<br/>寤烘ā / 娓叉煋 / 鎵嬬粯</p></div>
      <div className="archiveGrid">
        {archivePages.map((page,index)=><figure key={page} data-reveal><img src={pageSrc(page)} alt={`鎵╁睍浣滃搧闆嗙 ${page} 椤礰}/><figcaption><span>{String(index+1).padStart(2,'0')}</span><b>{archiveLabels[index]}</b></figcaption></figure>)}
      </div>
    </section>

    <div className="ticker" aria-hidden="true"><div>INDUSTRIAL DESIGN 路 HUMAN EXPERIENCE 路 FUTURE OBJECTS 路 INDUSTRIAL DESIGN 路 HUMAN EXPERIENCE 路 FUTURE OBJECTS 路</div></div>

    <section className="contact" id="contact">
      <div className="contactLight"/>
      <div className="shell contactInner" data-reveal>
        <div className="sectionCode"><span>06</span> / CONTACT</div>
        <p>HAVE AN IDEA?</p>
        <h2>LET'S MAKE IT<br/><i>VISIBLE.</i></h2>
        <a href="mailto:2735901862@qq.com">START A CONVERSATION <Arrow/></a>
        <div className="contactMeta"><span>2735901862@qq.com</span><span>WECHAT / Gjl2735901862</span><span>155 9178 6656</span><button onClick={()=>go('#top')}>BACK TO TOP 鈫?/button></div>
      </div>
    </section>

    {contactCard&&<div className="contactCardLayer" role="presentation" onClick={event=>{if(event.target===event.currentTarget)setContactCard(false)}}>
      <section className="contactCard" role="dialog" aria-modal="true" aria-labelledby="contact-card-title">
        <button className="contactCardClose" onClick={()=>setContactCard(false)} aria-label="鍏抽棴鑱旂郴鏂瑰紡">脳</button>
        <div className="contactCardCode">GJL / CONTACT</div>
        <h2 id="contact-card-title">LET'S<br/><i>CONNECT.</i></h2>
        <div className="contactCardRows">
          <a href="tel:15591786656"><span>PHONE</span><b>155 9178 6656</b><Arrow/></a>
          <a href="mailto:2735901862@qq.com"><span>EMAIL</span><b>2735901862@qq.com</b><Arrow/></a>
          <p><span>WECHAT</span><b>Gjl2735901862</b></p>
        </div>
      </section>
    </div>}

    {active&&<div className="modal" role="dialog" aria-modal="true" aria-label={`${active.name} 椤圭洰璇︽儏`}>
      <button className="modalClose" onClick={()=>setActive(null)}>CLOSE <span>脳</span></button>
      <div className="modalHead shell"><div><span>{active.id} / CASE STUDY</span><h2>{active.name}</h2></div><p>{active.cn}<br/><small>{active.type} 路 {active.year}</small></p></div>
      <div className="modalInfo shell"><p>{active.note}</p><div>{active.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
      <div className="casePages shell">{active.pages.map((page,index)=><figure className={index===0||index%5===0?'caseWide':''} key={page}><img src={pageSrc(page)} alt={`${active.cn} - 浣滃搧闆嗙 ${page} 椤礰}/><figcaption>{String(page).padStart(2,'0')} / {String(active.pages.at(-1)).padStart(2,'0')}</figcaption></figure>)}</div>
    </div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)

