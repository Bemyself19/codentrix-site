import React from 'react'
import Hero from '../components/home/Hero'
import MetricsBand from '../components/home/MetricsBand'
import CapabilityBento from '../components/home/CapabilityBento'
import CaseStudies from '../components/home/CaseStudies'
import LeadershipBand from '../components/home/LeadershipBand'

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBand />
      <CapabilityBento />
      <CaseStudies />
      <LeadershipBand />
    </>
  )
}
