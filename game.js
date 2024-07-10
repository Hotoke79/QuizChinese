let answer = ''
const maxWrong = 3
let mistakes = 0
let clicked = []
let wordStatus

let right = []
let wrong = []
let current = 0
let sw = 0
let sr = 0
let itr
let lvl

function shuffle(obj1, obj2) {
  var index = obj1.length
  var rnd, tmp1, tmp2

  while (index) {
    rnd = Math.floor(Math.random() * index)
    index -= 1
    tmp1 = obj1[index]
    tmp2 = obj2[index]
    obj1[index] = obj1[rnd]
    obj2[index] = obj2[rnd]
    obj1[rnd] = tmp1
    obj2[rnd] = tmp2
  }
  return obj1, obj2
}

const extract = (origArr) => {
  let newArr = []
  origArr.map(el => {
    newArr.push(el.slice(0, 4))
  })
  return newArr
}

function period(e, elName, sec, lvl, l, t) {

  if (l) {
    mainMenu.style.display = "none"
    containerGame.style.display = "none"
    wrap.style.display = "flex"
    stDsc.innerHTML = e['descriptio'][current] + '<br>' + e['reveal'][current]
    cat.innerText = elName

    nxt.onclick = () => {
      if (current >= e['reveal'].length - 1) {
        current = 0
        stDsc.innerHTML = e['descriptio'][current] + '<br>' + e['reveal'][current]
      } else
        current++
      stDsc.innerHTML = e['descriptio'][current] + '<br>' + e['reveal'][current]
    }
    prev.onclick = () => {
      if (current <= 0) {
        current = e['reveal'].length - 1
        stDsc.innerHTML = e['descriptio'][current] + '<br>' + e['reveal'][current]
      } else
        current--
      stDsc.innerHTML = e['descriptio'][current] + '<br>' + e['reveal'][current]
    }

  } else if (t) {
    counter = null
  }
  else
    startTimer(sec)
  about.innerHTML = elName
  !t ? level.innerHTML = `Тест ${lvl}` : level.innerHTML = ``

  var totalIdioms = extract(e['reveal']).length
  var fraction = 1 / totalIdioms * 100;
  var percents = Math.round(current * fraction) + "%"

  descr.innerHTML = e['descriptio'][current]
  t ? reveal.innerHTML = 'В режиме "Без таймера" подсказки отключены' : reveal.innerHTML = e['reveal'][current]

  function generateAnswer() {
    answer = extract(e['reveal'])[current]
  }
  function reloadButt() {
    var btnReload = `<h3 style="color: green;">Ваш результат</h3>`;
    descr.innerHTML = btnReload;
  }

  var chnCount = 0

  function generateButtons() {
    var newAr = extract(e['reveal']);
    const chunk = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
    var chnk = chunk(newAr, 4)

    function incChunk() {
      if (current >= 4 && current % 4 === 0) {
        return chnCount++
      }
    }

    incChunk()
    function equalizer(arr) {
      let lst = new Set()
      for (i = 0; i < arr.length; i++) {
        lst.add(arr[i])
      }
      return Array.from(lst)
    }

    var a = chnk[chnCount].join('')
    var buttonHTML = equalizer(a.split('')).sort(() => Math.random() - 0.5).map(L =>
      `<div class="btnp" id='` + L + `'onClick="handleGuess('` + L + `')">` + L + `</div>`).join('')
    kbd.innerHTML = buttonHTML;
  }

  handleGuess = (L) => {
    clicked.indexOf(L) === -1 ? clicked.push(L) : null;
    if (answer.indexOf(L) >= 0) {
      document.getElementById(L).style.background = 'green'
      document.getElementById(L).style.color = 'white'
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(L) === -1) {
      mistakes++;
      document.getElementById(L).onclick = false
      document.getElementById(L).style.color = 'white'
      document.getElementById(L).style.background = 'red'
      checkIfGameLost();
    }
  }
  function checkIfGameWon() {
    if (wordStatus === answer) {
      spanR.innerHTML = ++sr;
      right.unshift(answer);
      rgt.innerHTML = `${right.join('<br>')}`
      ++current;
      percents = Math.round(current * fraction) + "%"
      bar.style.height = percents
      perc.innerHTML = percents
      if (current === totalIdioms) {
        clearAll();
        reloadButt();
        return clearInterval(counter)
      }
      clearInterval(counter)
      setTimeout(function () {
        next();
        if (!t) {
          startTimer(sec)
        }
      }, 1000);
    }
  }

  function lost() {
    spanW.innerHTML = ++sw;
    wrong.unshift(answer);
    wrng.innerHTML = `${wrong.join('<br>')} `
    ++current;
    percents = Math.round(current * fraction) + "%"
    bar.style.height = percents
    perc.innerHTML = percents
  }

  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      lost()
      clearInterval(counter)
      if (!t) {
        startTimer(sec)
      }
      setTimeout(function () {
        next();
      }, 1000);
    }
  }


  function clearAll() {
    mistakes = 0
    clicked = []
    wsl.innerHTML = ""
    reveal.innerHTML = ""
    kbd.innerHTML = ""
    descr.innerHTML = ""
    rgt.style.display = 'flex'
    wrng.style.display = 'flex'
    rightWrong2.style.display = 'flex'
    rightWrong2.style.justifyContent = 'space-between'
    rightWrong2.style.height = '5vh'
    rightWrong2.style.width = '95%'
  }
  function guessedWord() {
    wordStatus = answer.split('').map(L => (clicked.indexOf(L) >= 0 ? L : " * ")).join('');
    wsl.innerHTML = wordStatus;
  }

  function next() {
    if (current <= totalIdioms - 1) {
      mistakes = 0;
      clicked = [];
      wsl.innerHTML = "* * * *"
      descr.innerHTML = e['descriptio'][current];
      t ? reveal.innerHTML = 'В режиме "Без таймера" подсказки отключены' : reveal.innerHTML = e['reveal'][current]
      generateAnswer();
      generateButtons();
    } else {
      clearAll();
      reloadButt();
    }
  }

  function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
      timerDiv.textContent = time;
      time--;
      if (time < 0) {
        lost()
        next()
        if (current === totalIdioms) {
          return clearInterval(counter)
        } else {
          clearInterval(counter)
          startTimer(sec)
        }
      }
    }
  }

  guessedWord()
  generateButtons()
  generateAnswer()
}

const reset = () => {
  mistakes = 0
  clicked = []
  current = 0
  sw = 0
  sr = 0
  wrong = []
  wrng.innerHTML = ""
  right = []
  rgt.innerHTML = ""
  percents = 0
  spanR.innerHTML = "0"
  spanW.innerHTML = "0"
  bar.style.height = 0
  perc.innerHTML = "0%"
  rgt.style.display = 'none'
  wrng.style.display = 'none'
  containerGame.style.display = 'flex'
  mainMenu.style.display = "none"
}

let idioma = "а"
let idioms = "ы"
function returnIdiom(arr) {
  if (arr === 1) { return idioma } else if (arr === 0 || arr >= 5) { return "" } else if (arr === 2 || 3 || 4) { return idioms }
}

const url = "https://chandao.ru/idioms/"

fetch(url).then(
  (res) => res.json()).then(function (data) {
    rounds = data;
    const st = "Online"
    onOffLine(rounds, st)

  }).catch((e) => {
    console.log(e)
    itr = iterable()
    const st = "Offline или неполадки с сервером"
    onOffLine(itr, st)
  })

function onOffLine(itr, stat) {
  let levels = function (sec, bt, lvl) {
    btns.forEach(btn => {
      btn.style.background = "rgb(190, 240, 241)" ? btn.style.background = "#eef2f3" : btn.style.background = "rgb(190, 240, 241)"
    })
    catList.innerHTML = ""
    bt.style.background = "rgb(190, 240, 241)"

    // if (bt === learnBtn) {
    //   let learn = true

    //   itr.forEach(function (el, inx, arr) {
    //     shuffle(itr[inx]['reveal'], itr[inx]['descriptio'])
    //     let l = document.createElement('li')

    //     l.innerHTML = `${el['name']} <div style="color: black; font-size: calc(10px + 15 * (100vw/1600));">${el["descriptio"].length} Идиом${returnIdiom(el["descriptio"].length)}</div>`
    //     l.style.listStyleType = "none"
    //     catList.appendChild(l)
    //     l.addEventListener('click', function () {
    //       reset()
    //       period(el, el['name'], null, null, learn, null)
    //     })
    //   })
    // } else
     if (bt === timerLess) {
      let tmr = true
      itr.forEach(function (el, inx, arr) {
        shuffle(itr[inx]['reveal'], itr[inx]['descriptio'])
        let l = document.createElement('li')
        l.innerHTML = `${el['name']} <div style="color: black; font-size: calc(10px + 15 * (100vw/1600));">${el["descriptio"].length} Идиом${returnIdiom(el["descriptio"].length)}</div>`
        l.style.listStyleType = "none"
        catList.appendChild(l)
        l.addEventListener('click', function () {
          reset()
          period(el, el['name'], null, null, null, tmr)
        })
      })
    }
    else
      itr.forEach(function (el, inx, arr) {
        shuffle(itr[inx]['reveal'], itr[inx]['descriptio'])
        let l = document.createElement('li')
        l.innerHTML = `${el['name']} <div style="color: black; font-size: calc(10px + 15 * (100vw/1600));">${el["descriptio"].length} Идиом${returnIdiom(el["descriptio"].length)}</div>`
        l.style.listStyleType = "none"
        catList.appendChild(l)
        l.addEventListener('click', function () {
          reset()
          period(el, el['name'], sec, lvl)
        })
      })
  }
  // learnBtn.onclick = () => {
  //   levels(null, learnBtn, null)
  // }

  btnOverlay1.onclick = () => {
    levels(25, btnOverlay1, 1)
  }

  btnOverlay2.onclick = () => {
    levels(20, btnOverlay2, 2)
  }

  btnOverlay3.onclick = () => {
    levels(15, btnOverlay3, 3)
  }

  btnOverlay4.onclick = () => {
    levels(10, btnOverlay4, 4)
  }

  timerLess.onclick = () => {
    levels(null, timerLess, null)
  }
  stat==="Online"
  ?sourse.innerHTML = `<div style="color: green;">${stat}</div>`
  :sourse.innerHTML = `<div style="color: red;">${stat}</div>`
}

let defaultInstallEvent = null
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  defaultInstallEvent = event
})
learnBtn.addEventListener('click', (event) => {
  defaultInstallEvent.prompt()
})
console.log(learnBtn);