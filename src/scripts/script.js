const startDtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')
let time = 0
let score = 0

startDtn.addEventListener('click', e => {
	e.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', e => {
	if (e.target.classList.contains('circle')) {
		score++
		e.target.remove()
		createRandomCircle()
	}
})

const startGame = () => {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

const decreaseTime = () => {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

const setTime = value => {
	timeEl.innerHTML = `00:${value}`
}

const finishGame = () => {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
}

const createRandomCircle = () => {
	const circle = document.createElement('div')
	const size = getRandomNumbers(6, 60)
	const { width, height } = board.getBoundingClientRect()
	const x = getRandomNumbers(0, width - size)
	const y = getRandomNumbers(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	board.append(circle)
}

const getRandomNumbers = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}
