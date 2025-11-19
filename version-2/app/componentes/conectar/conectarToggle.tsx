import "./conectar.css"

const ConectarToggle = () => {
  return (
    <div className="conectar">
      <h3 className="titulo">Conecta conmigo</h3>
      <div className="acciones">
        <div className="cell">
          <button className="circle" aria-label="GitHub" data-label="github">
            <span className="iconGit">
              <img src="/icon-github.svg" alt="GitHub" className="iconGitImg" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
            </span>
            <span className="textLabel">github</span>
          </button>
        </div>
        <div className="cell">
          <a className="circle" aria-label="LinkedIn" href="https://www.linkedin.com/in/rodrigopozosanchez/" target="_blank" rel="noopener noreferrer" data-label="linkedin">
            <span className="iconLinked">
              <img src="/icon-linkedin.svg" alt="LinkedIn" className="iconLinkedDefault" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
              <img src="/icon-linkedin-hover.svg" alt="LinkedIn Hover" className="iconLinkedHover" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
            </span>
            <span className="textLabel">linkedin</span>
          </a>
        </div>
        <div className="cell">
          <button className="circle" aria-label="Email" data-label="correo">
            <span className="iconMail">
              <img src="/icon-gmail.svg" alt="Correo" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
            </span>
            <span className="textLabel">correo</span>
          </button>
        </div>
      </div>
      <button className="cv" aria-label="Descargar CV">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M12 5v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 10l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Descargar CV</span>
      </button>
    </div>
  )
}

export default ConectarToggle