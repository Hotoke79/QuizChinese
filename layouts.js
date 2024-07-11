const containerGame = document.querySelector('.containerGame')

//create Main menu
const mainMenu = document.createElement('div')
mainMenu.setAttribute('class', 'mainMenu')

const learnBtn = document.createElement('div')
learnBtn.setAttribute('class', 'learn')
learnBtn.setAttribute('id', 'pwa-install')
learnBtn.innerText ="Install app"

const btnContainer = document.createElement('div')
btnContainer.setAttribute('id', 'btnContainer')

var myHtml = '<div class="cont">' +
  '                <div class="boxx">' +
  '                    <span style="--i:2;" >成语师傅</span>' +
  '                    <span style="--i:4;" >成语师傅</span>' +
  '                    <span style="--i:6;" >成语师傅</span>' +
  '                    <span style="--i:8;" >成语师傅</span>' +
  '                    <span style="--i:10;">成语师傅</span>' +
  '                    <span style="--i:12;">成语师傅</span>' +
  '                    <span style="--i:14;">成语师傅</span>' +
  '                    <span style="--i:16;">成语师傅</span>' +
  '                </div>' +
  '            </div>';
const selectMode = "Select mode"
const catList = document.createElement('div')
catList.setAttribute("id", "catList")
catList.innerHTML=`${selectMode}${myHtml}`

const btnOverlay1 = document.createElement('div')
btnOverlay1.innerHTML = "Test 1 <br> 25 sec"
btnOverlay1.setAttribute('class', 'menuOpts')
const btnOverlay2 = document.createElement('div')
btnOverlay2.innerHTML = "Test 2 <br> 20 sec"
btnOverlay2.setAttribute('class', 'menuOpts')
const btnOverlay3 = document.createElement('div')
btnOverlay3.innerHTML = `Test 3 <br> 15 sec`
btnOverlay3.setAttribute('class', 'menuOpts')
const btnOverlay4 = document.createElement('div')
btnOverlay4.innerHTML = "Test 4 <br> 10 sec"
btnOverlay4.setAttribute('class', 'menuOpts')

const timerLess = document.createElement('div')
timerLess.setAttribute('class', 'learn')
timerLess.innerText ="Without timer"

const sourse = document.createElement('div')
sourse.setAttribute('class', 'sourse')
sourse.innerText ="loading..."

const btns = [learnBtn,btnOverlay1, btnOverlay2, btnOverlay3, btnOverlay4, timerLess]

btnContainer.append(btnOverlay1, btnOverlay2, btnOverlay3, btnOverlay4)

mainMenu.append(sourse,learnBtn, btnContainer, timerLess, catList)

//create header
const menuBtn = document.createElement('div')
menuBtn.setAttribute("class", "menuBtn")
menuBtn.innerText = "MENU"

menuBtn.addEventListener('click', function () {
  window.location.reload()
})

const about = document.createElement('div')
about.setAttribute("class", "titleAbout")

const level = document.createElement('div')
level.setAttribute("class", "levelDiv")

const timerDiv = document.createElement('div')
timerDiv.setAttribute("id", "timerDiv")
timerDiv.innerText = "00"

const header = document.createElement('div')
header.setAttribute("class", "header")
header.append(menuBtn, about, timerDiv)

const desc_cont = document.createElement('div')
desc_cont.setAttribute("class", "desript-container")
const descr = document.createElement('div')
descr.setAttribute("class", "descr")
const reveal = document.createElement('div')
reveal.setAttribute("class", "reveal")
desc_cont.append(descr, reveal)

const rWr = document.createElement('div')
rWr.setAttribute("class", "rightWrong")

const notGsd = document.createElement('div')
notGsd.setAttribute("id", "notGuessed")
notGsd.innerHTML = "Wrong"
const spanW = document.createElement('span')
spanW.setAttribute("id", "scoreWrong")
spanW.innerHTML = 0
notGsd.appendChild(spanW)
rWr.appendChild(notGsd)

const prg_out = document.createElement('div')
prg_out.setAttribute("id", "progress-outer")
const bar = document.createElement('div')
bar.setAttribute("id", "bar")
const prgrss = document.createElement('div')
prgrss.setAttribute("id", "progress")
const perc = document.createElement('div')
perc.setAttribute("id", "perc")
prgrss.appendChild(bar)
prg_out.append(perc, prgrss)
rWr.appendChild(prg_out)

const gsd = document.createElement('div')
gsd.setAttribute("id", "guessed")
gsd.innerHTML = "Right"
const spanR = document.createElement('span')
spanR.setAttribute("id", "scoreRight")
spanR.innerHTML = 0
gsd.appendChild(spanR)
rWr.appendChild(gsd)

const rightWrong2 = document.createElement('div')
rightWrong2.setAttribute("id", "rightWrong2")
const wrng = document.createElement('div')
wrng.setAttribute("id", "wrong")
const rgt = document.createElement('div')
rgt.setAttribute("id", "right")
rightWrong2.appendChild(wrng)
rightWrong2.appendChild(rgt)

const wsl = document.createElement('div')
wsl.setAttribute("id", "wordSpotLight")
const kbd = document.createElement('div')
kbd.setAttribute("id", "keyboard")
containerGame.append(header, level, desc_cont, rWr, rightWrong2, wsl, kbd)
containerGame.style.display = 'none'

//learn page
const wrap = document.createElement('div')
wrap.setAttribute("class", "wrapper")
wrap.style.display="none"

const head = document.createElement('div')
head.setAttribute("class", "header")

const mB = document.createElement('div')
mB.setAttribute("class", "menuBtn")
mB.innerText="МЕНЮ"

const catWrap = document.createElement('div')
catWrap.setAttribute("class", "menuBtn")

const cat = document.createElement('div')
cat.setAttribute("class", "titleAbout")

catWrap.append(cat)
head.append(mB, catWrap)

const stDsc = document.createElement('div')
stDsc.setAttribute("class", "desript-container")

const dir = document.createElement('div')
dir.setAttribute("class", "direction")

const prev = document.createElement('div')
prev.setAttribute("class", "menuOpts")
prev.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-9 0 45 25"><title>Artboard-35</title><g id="Left-2" data-name="Left"><polygon points="24 12.001 2.914 12.001 8.208 6.706 7.501 5.999 1 12.501 7.5 19.001 8.207 18.294 2.914 13.001 24 13.001 24 12.001" style="fill:#232326"/></g></svg>`
const nxt = document.createElement('div')
nxt.setAttribute("class", "menuOpts")
nxt.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 0 45 25"><title>Artboard-34</title><g id="Right-2" data-name="Right"><polygon points="17.5 5.999 16.793 6.706 22.086 11.999 1 11.999 1 12.999 22.086 12.999 16.792 18.294 17.499 19.001 24 12.499 17.5 5.999" style="fill:#232326"/></g></svg>`

dir.append(prev, nxt)

wrap.append(head, stDsc, dir)


mB.onclick = ()=>{
  window.location.reload()
}

document.body.append(mainMenu, wrap, containerGame)