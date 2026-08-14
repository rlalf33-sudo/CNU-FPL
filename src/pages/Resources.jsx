import PageHeader from '../components/PageHeader.jsx'
import { equipment, laboratorySpaces } from '../data/resources.js'

function ResourceSectionHeading({ number, label, title, id, introduction }) {
  return (
    <div className="resources-section-heading">
      <p>{number}</p>
      <div>
        <span>{label}</span>
        <h2 id={id}>{title}</h2>
        {introduction && <p className="resources-section-introduction">{introduction}</p>}
      </div>
    </div>
  )
}

function SpaceImage({ space }) {
  if (space.image) {
    return <img className="laboratory-space-image" src={space.image} alt={space.name} />
  }

  return (
    <div className="laboratory-space-placeholder" role="img" aria-label={`Image for ${space.name} forthcoming`}>
      <span aria-hidden="true" />
      <p>Image forthcoming</p>
    </div>
  )
}

function LaboratorySpacesSection() {
  return (
    <section className="resources-section laboratory-spaces-section" aria-labelledby="laboratory-spaces-title">
      <div className="section-shell">
        <ResourceSectionHeading number="01" label="Laboratory Spaces" title="Laboratory Spaces" id="laboratory-spaces-title" />
        <div className="laboratory-spaces-grid">
          {laboratorySpaces.map((space) => (
            <article className="laboratory-space" key={space.room}>
              <SpaceImage space={space} />
              <div className="laboratory-space-copy">
                <h3>{space.name}</h3>
                <p>{space.room}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EquipmentImage({ item }) {
  if (item.image) {
    return <img className="equipment-image" src={item.image} alt={item.name} />
  }

  return (
    <div className="equipment-image-placeholder" role="img" aria-label={`Image for ${item.name} forthcoming`}>
      <span aria-hidden="true" />
      <p>Image forthcoming</p>
    </div>
  )
}

function EquipmentItem({ item, index }) {
  return (
    <article className="equipment-entry">
      <EquipmentImage item={item} />
      <div className="equipment-copy">
        <span className="equipment-number">{String(index + 1).padStart(2, '0')}</span>
        <h3>{item.name}</h3>
        {item.model && <p className="equipment-model">{item.model}</p>}
        <dl className="equipment-details">
          {item.manufacturer && <div><dt>Manufacturer</dt><dd>{item.manufacturer}</dd></div>}
          {item.location && <div><dt>Location</dt><dd>{item.location}</dd></div>}
        </dl>
      </div>
    </article>
  )
}

function ResearchInfrastructureSection() {
  return (
    <section className="resources-section research-infrastructure-section" aria-labelledby="research-infrastructure-title">
      <div className="section-shell">
        <ResourceSectionHeading
          number="02"
          label="Research Infrastructure"
          title="Research Facilities & Equipment"
          id="research-infrastructure-title"
          introduction="Verified information about the laboratory's research equipment will be added as it becomes available."
        />
        {equipment.length > 0 ? (
          <div className="equipment-grid">
            {equipment.map((item, index) => <EquipmentItem item={item} index={index} key={item.id || item.name} />)}
          </div>
        ) : (
          <div className="resources-empty-state">
            <h3>Equipment information is being prepared.</h3>
            <p>Verified instrument details and images will appear here when available.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function Resources() {
  return (
    <main className="resources-page" id="top">
      <PageHeader title="Resources" />
      <LaboratorySpacesSection />
      <ResearchInfrastructureSection />
    </main>
  )
}

export default Resources
