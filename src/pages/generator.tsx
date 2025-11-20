import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '../components/generator/Form'
import { Header } from '../components/generator/Header'
import { Sidebar } from '../components/generator/Sidebar'
import { FormValues } from '../types'

const Preview = dynamic(
  async () => (await import('../components/generator/Preview')).Preview,
  { ssr: false }
)

const Main = styled.main`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header header'
    'sidebar form preview';
  height: 100vh;
`

const initialFormValues: FormValues = {
  headings: {},
  sections: ['profile', 'education', 'work', 'skills', 'projects', 'awards'],
  selectedTemplate: 1
}

export default function GeneratorPage() {
  const formContext = useForm<FormValues>({ defaultValues: initialFormValues })

  return (
    <FormProvider {...formContext}>
      <Main>
        <Header />
        <Sidebar />
        <Form />
        <Preview />
      </Main>
    </FormProvider>
  )
}
