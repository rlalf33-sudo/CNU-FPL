import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function ImageLightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setCurrentIndex((index) => (index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') setCurrentIndex((index) => (index + 1) % images.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [images.length, onClose])

  if (typeof document === 'undefined' || images.length === 0) return null

  const showPrevious = () => setCurrentIndex((index) => (index - 1 + images.length) % images.length)
  const showNext = () => setCurrentIndex((index) => (index + 1) % images.length)

  return createPortal(
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="News image gallery" onClick={onClose}>
      <div className="image-lightbox-dialog" onClick={(event) => event.stopPropagation()}>
        <button className="image-lightbox-close" type="button" aria-label="Close image gallery" onClick={onClose} autoFocus>
          <span aria-hidden="true">×</span>
        </button>
        <img src={images[currentIndex]} alt={`News gallery image ${currentIndex + 1} of ${images.length}`} />
        {images.length > 1 && (
          <>
            <button className="image-lightbox-control is-previous" type="button" aria-label="Previous image" onClick={showPrevious}>
              <span aria-hidden="true">←</span>
            </button>
            <button className="image-lightbox-control is-next" type="button" aria-label="Next image" onClick={showNext}>
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}
        <p className="image-lightbox-count" aria-live="polite">{currentIndex + 1} / {images.length}</p>
      </div>
    </div>,
    document.body,
  )
}

export default ImageLightbox
