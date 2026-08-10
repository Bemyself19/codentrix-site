import React, { useId, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import './forms.css'

/** Matches the server's multer limit in server/index.js. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024

const ACCEPT = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
].join(',')

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Drag-and-drop CV upload with a keyboard-accessible fallback.
 *
 * The visible drop zone is a `<label>` bound to a real file input, so clicking
 * it, tabbing to it and dropping a file all work without custom key handling.
 * Oversized files are rejected here rather than being uploaded and bounced by
 * multer, which previously surfaced as a generic failure.
 *
 * @param {object} props
 * @param {File|null} props.file
 * @param {(file: File|null) => void} props.onChange
 * @param {(message: string|null) => void} props.onError
 * @param {Record<string,string>} props.labels
 */
export default function FileDrop({ file, onChange, onError, labels }) {
  const inputId = useId()
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const accept = (candidate) => {
    if (!candidate) return
    if (candidate.size > MAX_FILE_BYTES) {
      onError(labels.tooLarge)
      onChange(null)
      return
    }
    onError(null)
    onChange(candidate)
  }

  return (
    <div className="file-drop-wrap">
      <span className="field-label">{labels.label}</span>

      <label
        className={`file-drop ${dragging ? 'is-dragging' : ''} ${file ? 'has-file' : ''}`}
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          accept(event.dataTransfer.files?.[0])
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          name="cv"
          className="file-input visually-hidden"
          accept={ACCEPT}
          onChange={(event) => accept(event.target.files?.[0])}
        />

        {file ? (
          <span className="file-chosen">
            <Icon name="file" size={22} />
            <span className="file-meta">
              <span className="file-name">{file.name}</span>
              <span className="micro faint">{formatBytes(file.size)}</span>
            </span>
          </span>
        ) : (
          <span className="file-empty">
            <Icon name="upload" size={22} />
            <span>
              <span className="file-prompt">{labels.prompt}</span>
              <span className="micro faint file-hint">{labels.hint}</span>
            </span>
          </span>
        )}
      </label>

      {file && (
        <button
          type="button"
          className="file-clear"
          onClick={() => {
            onChange(null)
            onError(null)
            // The input keeps its value after a reset, so re-selecting the
            // same file would not fire another change event without this.
            if (inputRef.current) inputRef.current.value = ''
          }}
        >
          <Icon name="close" size={14} />
          {labels.remove}
        </button>
      )}
    </div>
  )
}
