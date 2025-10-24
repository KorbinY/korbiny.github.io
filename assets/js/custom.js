(function citeblockInit () {
  const citeblockSupport = !!(navigator.clipboard && navigator.clipboard.writeText)
  document.querySelectorAll('.citeblock-card').forEach(citeblockCard => {
    const citeblockBtn = citeblockCard.querySelector('.citeblock-copy')
    const citeblockToast = citeblockCard.querySelector('.citeblock-toast')
    const citeblockCode = citeblockCard.querySelector('pre>code')
    if (!citeblockSupport) citeblockBtn.setAttribute('aria-disabled','true')
    citeblockBtn.addEventListener('click', async () => {
      const citeblockText = citeblockCode.innerText
      try {
        if (citeblockSupport) await navigator.clipboard.writeText(citeblockText)
        citeblockToast.classList.add('show')
        citeblockBtn.innerHTML = 'Copied &#10003;'
        setTimeout(()=>{
          citeblockToast.classList.remove('show')
          citeblockBtn.innerHTML = 'Copy &#10697;'
        },3000)
      } catch {}
    })
  })
})();


(function clustrmapsInit () {
  let clustrmapsLoaded = false
  const geoWrapper = document.querySelector('.geo_wrapper')
  const geoContainer = document.querySelector('.geostat-container')
  
  if (!geoWrapper || !geoContainer) return
  
  function loadClustrMaps() {
    if (clustrmapsLoaded) return
    clustrmapsLoaded = true

    geoContainer.innerHTML = '<script type="text/javascript" id="clustrmaps" src="//cdn.clustrmaps.com/map_v2.js?cl=878787&w=200&t=tt&d=AOHGQSRze7SIRR2k6C3o8lBzJFx74yZo39cfH1cDX7g&co=e8e8e8&ct=00196b"></script>'
    
    const scriptElement = geoContainer.querySelector('#clustrmaps')
    if (scriptElement) {
      const newScript = document.createElement('script')
      newScript.type = 'text/javascript'
      newScript.id = 'clustrmaps'
      newScript.src = scriptElement.src
      
      geoContainer.removeChild(scriptElement)
      geoContainer.appendChild(newScript)
    }
  }
  
  geoWrapper.addEventListener('mouseenter', loadClustrMaps)
})();