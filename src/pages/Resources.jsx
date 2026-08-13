import PageHeader from '../components/PageHeader.jsx'
import { capabilities, instruments, methods } from '../data/resources.js'

function CapabilityVisual({ capability, number }) {
  if (capability.image) {
    return <img className="capability-image" src={capability.image} alt={capability.title} />
  }

  return (
    <div className="capability-placeholder" aria-label={`Reserved image area for ${capability.title}`}>
      <span>{number}</span>
      <i aria-hidden="true" />
      <p>Capability image placeholder</p>
    </div>
  )
}

function CapabilitySection() {
  return (
    <section className="resources-section capabilities-section" aria-labelledby="capabilities-title">
      <div className="section-shell">
        <div className="resources-section-heading">
          <p>01</p>
          <div><span>Laboratory Scope</span><h2 id="capabilities-title">Research Capabilities</h2></div>
        </div>
        <div className="capability-list">
          {capabilities.map((capability, index) => {
            const number = String(index + 1).padStart(2, '0')
            return (
              <article className="capability-entry" key={capability.title}>
                <div className="capability-copy">
                  <span className="capability-number">{number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  {(capability.methods.length > 0 || capability.relatedInstruments.length > 0) && (
                    <dl className="capability-related">
                      {capability.methods.length > 0 && <div><dt>Related Methods</dt><dd>{capability.methods.join(', ')}</dd></div>}
                      {capability.relatedInstruments.length > 0 && <div><dt>Related Instruments</dt><dd>{capability.relatedInstruments.join(', ')}</dd></div>}
                    </dl>
                  )}
                </div>
                <CapabilityVisual capability={capability} number={number} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function InstrumentCard({ instrument }) {
  return (
    <article className="instrument-card">
      {instrument.image ? <img src={instrument.image} alt={instrument.name} /> : <div className="instrument-image-placeholder"><span aria-hidden="true" /><p>Instrument image placeholder</p></div>}
      <div className="instrument-copy">
        {instrument.category && <p className="instrument-category">{instrument.category}</p>}
        <h3>{instrument.name}</h3>
        {(instrument.model || instrument.manufacturer) && <p className="instrument-metadata">{[instrument.manufacturer, instrument.model].filter(Boolean).join(' · ')}</p>}
        {instrument.description && <p className="instrument-description">{instrument.description}</p>}
        {instrument.keyApplications?.length > 0 && <div className="instrument-applications"><span>Key Applications</span><p>{instrument.keyApplications.join(' · ')}</p></div>}
      </div>
    </article>
  )
}

function InstrumentsSection() {
  return (
    <section className="resources-section instruments-section" aria-labelledby="instruments-title">
      <div className="section-shell">
        <div className="resources-section-heading"><p>02</p><div><span>Equipment</span><h2 id="instruments-title">Major Instruments</h2></div></div>
        {instruments.length > 0 ? (
          <div className="instrument-grid">{instruments.map((instrument) => <InstrumentCard key={instrument.name} instrument={instrument} />)}</div>
        ) : (
          <div className="resources-empty-state"><span aria-hidden="true" /><div><h3>Instrument information is being prepared.</h3><p>Verified equipment details and images will appear here when available.</p></div></div>
        )}
      </div>
    </section>
  )
}

function MethodsSection() {
  return (
    <section className="resources-section methods-section" aria-labelledby="methods-title">
      <div className="section-shell">
        <div className="resources-section-heading"><p>03</p><div><span>Approaches</span><h2 id="methods-title">Analytical Methods</h2></div></div>
        <div className="methods-grid">
          {methods.map((method, index) => (
            <article className="method-entry" key={method.name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{method.name}</h3>
              {method.description && <p>{method.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resources() {
  return (
    <main className="resources-page" id="top">
      <PageHeader title="Resources" />
      <CapabilitySection />
      <InstrumentsSection />
      <MethodsSection />
    </main>
  )
}

export default Resources
