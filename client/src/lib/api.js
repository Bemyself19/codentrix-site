/*
 * Thin fetch wrappers for the two form endpoints.
 *
 * Replaces axios, which cost ~14 kB gzipped for two POST calls. The endpoints,
 * paths and field names are unchanged — the server contract is identical.
 */

/** @typedef {{ ok: true, data: unknown } | { ok: false, error: string }} ApiResult */

const GENERIC_ERROR = 'request-failed'

/**
 * @param {Response} response
 * @returns {Promise<ApiResult>}
 */
async function toResult(response) {
  let data = null

  try {
    data = await response.json()
  } catch {
    // A non-JSON body (an HTML error page from the host, for instance) is
    // still a failure we need to surface rather than swallow.
    if (!response.ok) return { ok: false, error: GENERIC_ERROR }
  }

  if (!response.ok) {
    return { ok: false, error: data?.error || GENERIC_ERROR }
  }

  if (data && data.status && data.status !== 'ok') {
    return { ok: false, error: data.error || GENERIC_ERROR }
  }

  return { ok: true, data }
}

/**
 * POST a JSON body.
 *
 * @param {string} url
 * @param {Record<string, unknown>} body
 * @returns {Promise<ApiResult>}
 */
export async function postJson(url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return await toResult(response)
  } catch {
    return { ok: false, error: 'network' }
  }
}

/**
 * POST multipart form data.
 *
 * Deliberately does not set `Content-Type` — the browser has to add the
 * multipart boundary itself, and setting the header manually breaks it.
 *
 * @param {string} url
 * @param {FormData} formData
 * @returns {Promise<ApiResult>}
 */
export async function postFormData(url, formData) {
  try {
    const response = await fetch(url, { method: 'POST', body: formData })
    return await toResult(response)
  } catch {
    return { ok: false, error: 'network' }
  }
}
