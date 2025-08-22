const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

// Multer for multipart/form-data (file uploads)
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

// Create Nodemailer transporter from environment variables
// Required env vars (see .env.example): SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
let transporter = null
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

// Contact endpoint: validates input and sends email when SMTP is configured
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if(!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

  const payload = { name, email, message }

  // If transporter is configured, send email
  if (transporter) {
    const mailOptions = {
  from: process.env.CONTACT_FROM || `"Codentrix Website" <${process.env.SMTP_USER || 'contact@codentrix.io'}>`,
  replyTo: email,
      to: process.env.CONTACT_TO || process.env.SMTP_USER || 'contact@codentrix.io',
      subject: `New contact from website: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Contact email sent', { name, email })
      return res.json({ status: 'ok' })
    } catch (err) {
      console.error('Error sending contact email', err)
      return res.status(500).json({ error: 'Failed to send email' })
    }
  }

  // Fallback: log submission and return success (no SMTP configured)
  console.log('Contact form submission (no SMTP):', payload)
  return res.json({ status: 'ok', note: 'no-smtp' })
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`Codentrix server listening on ${port}`))

// Careers application endpoint — accepts form fields + CV attachment
app.post('/api/careers/apply', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, phone, education, experience } = req.body || {}
    if(!name || !email) return res.status(400).json({ error: 'Name and email are required' })

    // Build email
    const mailOptions = {
  from: process.env.CONTACT_FROM || `"Codentrix Careers" <${process.env.SMTP_USER || 'career@codentrix.io'}>`,
  replyTo: email,
  to: process.env.CAREERS_TO || 'career@codentrix.io',
      subject: `New career application: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\n\nEducation:\n${education || ''}\n\nExperience:\n${experience || ''}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || ''}</p>
             <h4>Education</h4><p>${(education || '').replace(/\n/g,'<br/>')}</p>
             <h4>Experience</h4><p>${(experience || '').replace(/\n/g,'<br/>')}</p>`
    }

    // If a file was uploaded attach it
    if(req.file){
      mailOptions.attachments = [{
        filename: req.file.originalname || 'cv.pdf',
        content: req.file.buffer
      }]
    }

    if (transporter) {
      await transporter.sendMail(mailOptions)
      console.log('Career application email sent', { name, email })
      return res.json({ status: 'ok' })
    }

    console.log('Career application (no SMTP):', { name, email, phone, education, experience, file: req.file && req.file.originalname })
    return res.json({ status: 'ok', note: 'no-smtp' })
  } catch (err) {
    console.error('Error processing career application', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
