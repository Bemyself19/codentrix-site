import React, { useId } from 'react'
import './forms.css'

/**
 * Labelled text input or textarea with inline validation messaging.
 *
 * The label is a real `<label for>` rather than a wrapping element, and the
 * error is tied to the control with `aria-describedby` + `aria-invalid`, so
 * screen readers announce the problem when focus lands on the field.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.error] validation message, shown when present
 * @param {boolean} [props.textarea]
 */
export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  textarea = false,
  required = false,
  type = 'text',
  rows = 5,
  ...rest
}) {
  const id = useId()
  const errorId = `${id}-error`
  const Control = textarea ? 'textarea' : 'input'

  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label className="field-label" htmlFor={id}>
        {label}
        {required && (
          <span className="field-required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <Control
        id={id}
        name={name}
        className="field-control"
        value={value}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        {...(textarea ? { rows } : { type })}
        {...rest}
      />
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}
