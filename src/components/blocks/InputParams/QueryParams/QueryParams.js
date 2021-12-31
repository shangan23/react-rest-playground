import React from 'react'
import PairFieldList from '@/ui/common/PairFieldList'

function QueryParams(props) {
  const { control, register } = props

  return (
    <>
      <PairFieldList
        data-test-id="PairFieldList"
        name={'queryParams'}
        type={'query'}
        register={register}
        control={control}
      />
    </>
  )
}

export default QueryParams
