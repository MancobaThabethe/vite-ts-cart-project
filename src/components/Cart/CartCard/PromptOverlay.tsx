import { ReactElement } from "react"

type PropsType = {
  deleted: boolean
  checkout: boolean
}

const PromptOverlay = ({deleted, checkout}: PropsType): ReactElement => {
  return (
    <div className="prompt-overlay">
      <aside className={deleted ? "prompt-delete" : checkout ? "prompt-checkout" : ''}>
        <p>{deleted ? 'Item deleted' : checkout ? 'Purchase successful!' : ''}</p>
      </aside>
    </div>
  )
}

export default PromptOverlay