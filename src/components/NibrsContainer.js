import { format } from 'd3-format'
import React from 'react'
import startCase from 'lodash.startcase'

import ErrorCard from './ErrorCard'
import Loading from './Loading'
import NibrsCard from './NibrsCard'
import parseNibrs from '../util/nibrs'

const fbiLink = 'https://ucr.fbi.gov/ucr-program-data-collections'
const formatNumber = format(',')

const NibrsContainer = ({ crime, data, error, filters, place }) => {
  const { timeFrom, timeTo } = filters
  let totalCount

  let content = <Loading />
  if (data) {
    const dataParsed = parseNibrs(data)
    totalCount = data.offenderRaceCode.reduce((a, b) => (a + b.count), 0)
    content = (
      <div className='clearfix mb8 mxn1'>
        {dataParsed.map((d, i) => (
          <div key={i} className='lg-col lg-col-6 mb2 px1'>
            <NibrsCard {...d} />
          </div>
        ))}
      </div>
    )
  } else if (error) {
    content = <ErrorCard error={error} />
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} incident details in {startCase(place)},
          <br />
          {timeFrom}–{timeTo}
        </h2>
        <p className='mt-tiny'>
          {/* eslint max-len: 0 */}
          {!error && data && `
            There were ${formatNumber(totalCount)} individual ${crime} incidents
            reported to the FBI in {startCase(place)} between ${timeFrom} and ${timeTo}. This number may differ from the totals in the previous chart because of the differences in data sources.
          `}
          Learn more about the <a className='underline' href={fbiLink}>FBI’s data collections</a>.
        </p>
      </div>
      {content}
    </div>
  )
}

export default NibrsContainer
