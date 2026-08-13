function PageHeader({ title }) {
  return (
    <header className="page-header">
      <div className="section-shell page-header-inner">
        <h1>{title}</h1>
        <span aria-hidden="true" />
      </div>
    </header>
  )
}

export default PageHeader
