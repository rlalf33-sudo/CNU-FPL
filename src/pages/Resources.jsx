import { useRef, useState } from 'react'
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

function SpaceCarousel({ space }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const pointerStart = useRef(null)
  const images = space.images || []
  const hasMultipleImages = images.length > 1

  const showPrevious = () => setCurrentIndex((index) => (index - 1 + images.length) % images.length)
  const showNext = () => setCurrentIndex((index) => (index + 1) % images.length)

  const handlePointerDown = (event) => {
    if (!hasMultipleImages) return
    pointerStart.current = event.clientX
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (pointerStart.current === null || !hasMultipleImages) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) < 45) return
    if (distance < 0) showNext()
    else showPrevious()
  }

  return (
    <div
      className="laboratory-space-carousel"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null }}
    >
      {images.length > 0 ? (
        <img
          className="laboratory-space-image"
          src={images[currentIndex]}
          alt={`${space.name} ${currentIndex + 1} of ${images.length}`}
          draggable="false"
        />
      ) : (
        <div className="laboratory-space-placeholder" role="img" aria-label={`Image for ${space.name} forthcoming`}>
          <span aria-hidden="true" />
          <p>Image forthcoming</p>
        </div>
      )}
      {hasMultipleImages && (
        <>
          <button className="space-carousel-control is-previous" type="button" aria-label={`Previous ${space.name} image`} onClick={showPrevious}>‹</button>
          <button className="space-carousel-control is-next" type="button" aria-label={`Next ${space.name} image`} onClick={showNext}>›</button>
          <p className="space-carousel-count" aria-live="polite">{currentIndex + 1} / {images.length}</p>
        </>
      )}
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
              <SpaceCarousel space={space} />
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
    return (
      <div className="equipment-image-frame">
        <img className="equipment-image" src={item.image} alt={item.name} />
      </div>
    )
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
          introduction="Selected research facilities and equipment in the laboratory."
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
