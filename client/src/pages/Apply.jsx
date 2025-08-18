import React, { useState } from 'react'
import axios from 'axios'

export default function Apply(){
  const [form, setForm] = useState({name:'', email:'', phone:'', education:'', experience:''})
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const submit = async (e) => {
    e.preventDefault()
    if(!file){ setStatus('error-file'); return }
    setLoading(true)
    try{
      const fd = new FormData()
      Object.entries(form).forEach(([k,v])=>fd.append(k,v))
      fd.append('cv', file)
      const res = await axios.post('/api/careers/apply', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      if(res.data && res.data.status === 'ok') setStatus('sent')
      else setStatus('error')
    }catch(err){
      setStatus('error')
    }
    setLoading(false)
  }

  return (
  <section className="container">
      <h2>Apply — Send your CV</h2>
      <p className="lead">Fill the form and attach your CV. We'll review and contact you for next steps.</p>

      {!showForm && (
        <div className="card" style={{padding:'1.25rem'}}>
          <p>Click the button below to open the application form.</p>
          <button className="btn primary" onClick={()=>setShowForm(true)}>Open application form</button>
        </div>
      )}

      {showForm && (
        <form onSubmit={submit} className="card contact-form" encType="multipart/form-data">
          <label>Name<input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} /></label>
          <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} /></label>
          <label>Phone<input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} /></label>
          <label>Education<textarea value={form.education} onChange={e=>setForm({...form, education: e.target.value})} /></label>
          <label>Experience summary<textarea value={form.experience} onChange={e=>setForm({...form, experience: e.target.value})} /></label>

          <label>Attach CV (PDF preferred)
            <input type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e=>setFile(e.target.files[0])} />
          </label>

          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Submit application'}</button>
          {status === 'sent' && <p className="notice">Application sent — thank you.</p>}
          {status === 'error' && <p className="error">There was an error sending your application.</p>}
          {status === 'error-file' && <p className="error">Please attach your CV.</p>}
        </form>
      )}
    </section>
  )
}
            