import React, { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SurfaceCard from '../ui/SurfaceCard'
import Icon from '../ui/Icon'
import { collapse } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './leader-card.css'

/**
 * Leadership profile with a disclosed biography.
 *
 * Replaces the previous click-to-flip card, which was implemented twice as an
 * inline IIFE and exposed a `role="button"` div with no accessible name. Here
 * the toggle is a real button with `aria-expanded`/`aria-controls`, so mouse,
 * touch and keyboard all behave identically.
 *
 * @param {object} props
 * @param {string} props.id i18n key under `about.leaders`
 * @param {string} props.name
 * @param {string} props.role
 * @param {string} props.image
 */
export default function LeaderCard({ id, name, role, image }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  const panelId = useId()

  return (
    <SurfaceCard as="article" className="leader-card" interactive={false}>
      <div className="leader-head">
        {/*
          Source photos range from 149px to 976px wide, so they are displayed
          at avatar scale — anything larger and the smallest one falls apart.
        */}
        <img
          src={image}
          alt=""
          className="leader-photo"
          width="112"
          height="112"
          loading="lazy"
          decoding="async"
        />
        <div className="leader-identity">
          <h3 className="leader-name">{name}</h3>
          <p className="leader-role mono">{role}</p>
        </div>
      </div>

      <p className="muted leader-lead">{t(`about.leaders.${id}.lead`)}</p>

      <button
        type="button"
        className="leader-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open
          ? t('about.leaders.less', { defaultValue: 'Less' })
          : t('about.leaders.more', { defaultValue: 'Full profile' })}
        <Icon name={open ? 'minus' : 'plus'} size={16} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="leader-bio"
            variants={collapse}
            initial={prefersReduced ? false : 'hidden'}
            animate="visible"
            exit={prefersReduced ? undefined : 'exit'}
          >
            <p className="small muted leader-bio-text">{t(`about.leaders.${id}.back`)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </SurfaceCard>
  )
}
