/* ================================
custom select box from w3schools.com
================================ */
const x = document.getElementsByClassName("select-box")
const l = x.length
for (let i = 0; i < l; i++) {
  const selElmnt = x[i].getElementsByTagName("select")[0]
  const a = document.createElement("DIV")
  a.setAttribute("class", "select-selected")
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  x[i].appendChild(a)
  const b = document.createElement("DIV")
  b.setAttribute("class", "select-items select-hide")
  
  for (let j = 1; j < selElmnt.length; j++) {
    const c = document.createElement("DIV")
    c.innerHTML = selElmnt.options[j].innerHTML
    c.addEventListener("click", function(e) {
        const s = this.parentNode.parentNode.getElementsByTagName("select")[0]
        const h = this.parentNode.previousSibling
        
        for (let i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i
            h.innerHTML = this.innerHTML
            const y = this.parentNode.getElementsByClassName("same-as-selected")
            
            for (let k = 0; k < y.length; k++) {
              y[k].removeAttribute("class")
            }
            this.setAttribute("class", "same-as-selected")
            break
          }
        }
        h.click()
    })
    
    b.appendChild(c)
  }
  
  x[i].appendChild(b)
  a.addEventListener("click", function(e) {
      e.stopPropagation()
      closeAllSelect(this)
      this.nextSibling.classList.toggle("select-hide")
      this.classList.toggle("select-arrow-active")
    });
}

function closeAllSelect(elmnt) {
  let arrNo = []
  const x = document.getElementsByClassName("select-items")
  const y = document.getElementsByClassName("select-selected")
  
  for (let i = 0; i < y.length; i++) {
    if (elmnt === y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active")
    }
  }
  
  for (let i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide")
    }
  }
}

document.addEventListener("click", closeAllSelect)

/* ==================================
    end of custom select js code
================================== */

const colorPicker = document.getElementById('color-picker')
const colorScheme = document.getElementById('color-scheme')
const colorBox = document.getElementById('colors-el')
const colorForm = document.getElementById('color-form')

const addToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const getInnerText = (e) => {
  const text = e.target.dataset.color
  addToClipboard(text)
}

const getColorScheme = (color, scheme) => {
  colorBox.innerHTML = ''
  const selectedScheme = scheme
  const fetchUrl = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${selectedScheme}`
  fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
      for(color of data.colors){
        const parentDiv = document.createElement('div')
        parentDiv.classList.add(`color-option`)
        parentDiv.style.background = color.hex.value
        const link = document.createElement('a')
        link.classList.add('color-code')
        link.setAttribute('data-color', color.hex.value)
        link.textContent = color.hex.value
        parentDiv.append(link)
        colorBox.append(parentDiv)
      }
      
      const colorCodes = document.querySelectorAll('.color-code')
      
      for(color of colorCodes) {
        color.addEventListener('click', getInnerText)
      }
    })
}

getColorScheme(colorPicker.value.slice(1), colorScheme.selectedOptions[0].value)

colorForm.addEventListener('submit', function(e) {
  e.preventDefault()
  getColorScheme(colorPicker.value.slice(1), colorScheme.selectedOptions[0].value)
})

const roseHeader = document.querySelector('header')

const div = document.createElement('div')
const p = document.createElement('p')
p.textContent = 'We will be closing at 3pm tomorrow, September 20th, for a private event.'
p.style.color = 'white'
p.style.fontSize = '12px'
p.style.marginInline = 'auto'
div.append(p)
// div.innerHTML = `<p style="color:white;font-size:12px;margin-inline:auto;">We will be closing at 3pm tomorrow, September 20th, for a private event.</p>`
div.style.position = 'sticky'
div.style.top = '0'
div.style.width = '100%'
div.style.padding = '.5rem 1rem'
div.style.backgroundColor = 'red'
div.style.textAlign = 'center'
roseHeader.append(div)
