export default function SectionHead({ index, title, titleEn, intro }) {
  return (
    <header className="secHead">
      <div className="secHead__meta">
        <span className="mono secHead__index">{index}</span>
        <span className="secHead__rule" aria-hidden="true" />
        <span className="mono secHead__en">{titleEn}</span>
      </div>
      <div className="secHead__row">
        {/* 标题拆成单字，配合外层遮罩做逐字推入的进场 */}
        <h2 className="secHead__title">
          {title.split('').map((char, i) => (
            <span className="secHead__char" key={`${char}-${i}`}>
              {char}
            </span>
          ))}
        </h2>
        {intro ? <p className="secHead__intro">{intro}</p> : null}
      </div>
    </header>
  )
}
