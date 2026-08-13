function MemberPortrait({ image, name, prominent = false }) {
  if (image) {
    return (
      <img
        className={`member-portrait-image is-protected${prominent ? ' is-prominent' : ''}`}
        src={image}
        alt={`${name} portrait`}
        draggable="false"
        onContextMenu={(event) => event.preventDefault()}
      />
    )
  }

  return (
    <div className={`member-portrait-placeholder${prominent ? ' is-prominent' : ''}`} aria-label="Portrait placeholder">
      <span aria-hidden="true" />
      <p>Portrait placeholder</p>
    </div>
  )
}

export default MemberPortrait
