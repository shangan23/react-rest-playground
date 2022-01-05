import React, { useState } from 'react'
import Endpoint from '@/blocks/Endpoint'
import InputParams from '@/blocks/InputParams'
import Result from '@/blocks/Result'
import { useForm } from 'react-hook-form'
import useFetchApi from '@/hooks/useFetchApi'
import convertParams from '@/utils/convert-params'
import { defaultInitialValues, defaultLabels } from '@/utils/default-params'
import { FlexColumn, FlexRow } from '@/styled/general'

const noop = () => { }

function ReactRestPlayground({ initialValues = {
  parameters: {}
}, labels = {}, onSend = noop }) {
  const endpoint = {
    ...defaultInitialValues.endpoint,
    ...initialValues.endpoint,
  }
  const parameters = {
    headers: initialValues?.parameters?.headers || [],
    query: initialValues?.parameters?.query || [],
    body: initialValues?.parameters?.body || [],
  }
  const endpointLabels = {
    ...defaultLabels.endpoint,
    ...labels.endpoint, 
  }
  const parametersLabels = {
    query: {
      ...defaultLabels.parameters.query,
      ...labels.endpoint?.query || {},
    },
    headers: {
      ...defaultLabels.parameters.headers,
      ...labels.endpoint?.headers || {},
    },
    body: {
      ...defaultLabels.parameters.body,
      ...labels.endpoint?.body || {},
    }
  }
  const resultLabels = {
    ...defaultLabels.result,
    ...labels.result,
  }

  // States.
  const [requestData, setRequestData] = useState({})
  const [responseData, setResponseData] = useState({})
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      method: endpoint.method,
      url: endpoint.apiUrl,
      queryParams: parameters.query,
      headerParams: parameters.headers,
      bodyParams: parameters.body,
    },
  })

  // Api call
  // store the data in a response state
  useFetchApi(requestData, (response) => {
    setResponseData(response)
  })

  // pass it to the response component as props
  const onSubmit = (request) => {
    request['queryParams'] = convertParams(request.queryParams)
    request['headerParams'] = convertParams(request.headerParams)
    request['bodyParams'] = convertParams(request.bodyParams)
    onSend(request)
    setRequestData(request)
  }

  return (
    <>
      <FlexColumn>
        <FlexRow justify="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Endpoint
              data-test-id="Endpoint"
              register={register}
              labels={endpointLabels}
            />
            <InputParams
              data-test-id="InputParams"
              register={register}
              control={control}
              labels={parametersLabels}
            />
          </form>
        </FlexRow>
        <FlexRow justify="center">
          <Result
            data-test-id="Result"
            response={responseData}
            labels={resultLabels}
          />
        </FlexRow>
      </FlexColumn>
    </>
  )
}

export default ReactRestPlayground
