import React, { useRef, useState, useEffect } from 'react'
import * as Tone from 'tone'
import * as mm from '@magenta/music'

export default function Generate(){
  const [status, setStatus] = useState('idle')
  const canvasRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recordedBlobsRef = useRef([])

  useEffect(()=>{
    // Simple canvas demo driven by WebAudio analyser example placeholder
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = null
    ctx.fillStyle = '#111'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    function loop(){
      ctx.fillStyle = '#111'
      ctx.fillRect(0,0,canvas.width,canvas.height)
      const t = Date.now()/500
      ctx.fillStyle = 'hsl(' + ((t*40)%360) + ',70%,50%)'
      ctx.beginPath()
      ctx.arc(canvas.width/2 + Math.sin(t)*80, canvas.height/2 + Math.cos(t)*40, 60, 0, Math.PI*2)
      ctx.fill()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return ()=> cancelAnimationFrame(raf)
  },[])

  async function generateDemo(){
    setStatus('preparing')
    await Tone.start()
    const synth = new Tone.Synth().toDestination()
    setStatus('generating')
    // simple arpeggio demo
    const now = Tone.now()
    const notes = ['C4','E4','G4','B4']
    notes.forEach((n,i)=> synth.triggerAttackRelease(n, '8n', now + i*0.25))
    setStatus('playing')
    // stop after 2s
    setTimeout(()=> setStatus('idle'), 2000)
  }

  async function startRecording(){
    const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true})
    recordedBlobsRef.current = []
    const mr = new MediaRecorder(stream, {mimeType: 'video/webm;codecs=vp9,opus'})
    mr.ondataavailable = (e)=>{ if(e.data && e.data.size>0) recordedBlobsRef.current.push(e.data) }
    mr.onstop = ()=> setStatus('idle')
    mr.start()
    mediaRecorderRef.current = mr
    setStatus('recording')
  }

  function stopRecording(){
    const mr = mediaRecorderRef.current
    if(mr) mr.stop()
    const blob = new Blob(recordedBlobsRef.current, {type: 'video/webm'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tsondo-demo.webm'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="generate">
      <section className="controls">
        <button onClick={generateDemo}>Generate & Play (demo)</button>
        <button onClick={startRecording} disabled={status==='recording'}>Start Recording</button>
        <button onClick={stopRecording} disabled={status!=='recording'}>Stop & Download WebM</button>
        <div className="status">Status: {status}</div>
      </section>

      <section className="visual">
        <canvas ref={canvasRef} width={800} height={360} />
      </section>

      <section className="notes">
        <p>Notes: This is a lightweight demo scaffold. The full project will integrate Three.js visuals driven by WebAudio analyser, Magenta.js and Tone.js in-browser music generation, and MediaRecorder export in WebM.</p>
      </section>
    </div>
  )
}
