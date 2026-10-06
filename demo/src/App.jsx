import { useState } from 'react'
import { marked } from 'marked'

// Vite raw imports - read at build time, no duplication
import specRaw from '../../SPEC.md?raw'
import readmeRaw from '../../README.md?raw'
import questionsRaw from '../../QUESTIONS.md?raw'
import simpleExample from '../../examples/simple-example.json'
import familialExample from '../../examples/familial-example.json'
import richeExample from '../../examples/riche-example.json'
import examplesReadme from '../../examples/README.md?raw'
import schemaRaw from '../../schema/datawill-0.1.schema.json?raw'

const examples = {
  simple: { data: simpleExample, label: 'Simple (Alex)' },
  familial: { data: familialExample, label: 'Familial (Karim)' },
  riche: { data: richeExample, label: 'Riche (Sophie)' }
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderBottom: active ? '2px solid #0e7490' : '2px solid transparent',
        background: 'transparent',
        fontWeight: active ? 600 : 400,
        color: active ? '#0e7490' : '#52525b'
      }}
    >
      {children}
    </button>
  )
}

export default function App() {
  const [tab, setTab] = useState('overview')
  const [exampleKey, setExampleKey] = useState('simple')
  const currentExample = examples[exampleKey]

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '24px 20px' }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid #e4e4e7', paddingBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>DataWill</h1>
            <p style={{ margin: '4px 0 0', color: '#71717a' }}>Open format for digital wills and posthumous access declarations</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://github.com/maigus223/data-will" style={{ border: '1px solid #e4e4e7', background: 'white', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>GitHub</a>
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>Experimental draft v0.1</span>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 4, marginTop: 16, overflowX: 'auto' }}>
          <TabButton active={tab==='overview'} onClick={()=>setTab('overview')}>Overview</TabButton>
          <TabButton active={tab==='spec'} onClick={()=>setTab('spec')}>Specification</TabButton>
          <TabButton active={tab==='examples'} onClick={()=>setTab('examples')}>Examples (3)</TabButton>
          <TabButton active={tab==='questions'} onClick={()=>setTab('questions')}>Open Questions</TabButton>
          <TabButton active={tab==='schema'} onClick={()=>setTab('schema')}>Schema</TabButton>
        </nav>
      </header>

      {tab==='overview' && <div dangerouslySetInnerHTML={{ __html: marked.parse(readmeRaw) }} />}
      {tab==='spec' && <div dangerouslySetInnerHTML={{ __html: marked.parse(specRaw) }} />}
      {tab==='examples' && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(examplesReadme) }} />
          <div style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
            {Object.entries(examples).map(([key, ex]) => (
              <button key={key} onClick={()=>setExampleKey(key)} style={{ padding: '6px 12px', border: exampleKey===key ? '1px solid #0e7490' : '1px solid #e4e4e7', background: exampleKey===key ? '#ecfeff' : 'white', borderRadius: 6, fontSize: 13 }}>{ex.label}</button>
            ))}
          </div>
          <h3>{currentExample.label} - {currentExample.data.id}</h3>
          <pre>{JSON.stringify(currentExample.data, null, 2)}</pre>
        </div>
      )}
      {tab==='questions' && <div dangerouslySetInnerHTML={{ __html: marked.parse(questionsRaw) }} />}
      {tab==='schema' && <pre>{schemaRaw}</pre>}

      <footer style={{ marginTop: 48, paddingTop: 16, borderTop: '1px solid #e4e4e7', fontSize: 12, color: '#71717a' }}>
        <p>Spec: CC-BY 4.0 | Code & demo: MIT | Author: Mahamadou Issiaka MAIGA (MAIGUS) | Independent project</p>
        <p>Build reads SPEC.md and examples/*.json at build time - no duplication. No external fonts.</p>
      </footer>
    </div>
  )
}
