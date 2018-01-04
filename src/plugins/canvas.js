import { forEachValue } from '../assets/utils'
import * as types from '@store/mutation-types'

const PI2 = 2 * Math.PI
let canvas,
    ctx,
    palo,
    beats,
    accents,
    offsetX,
    offsetY,
    initOffsetX,
    baseRadius,
    beatDots = {},
    metronomeEvent = null

const requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame ||
                              window.oRequestAnimationFrame

const getTime = time => {
    switch (palo) {
        case 'buleria-12':
        case 'buleria-12-variation':
        case 'fandangos':
        case 'alegria':
        case 'siguiriya':
            return (time === 0) ? 12 : time
        case 'buleria-6':
            return time === 0 ? 6 : time
        default:
            return time + 1
    }
}

class BeatDot {
    constructor (time) {
        this.time = getTime(time)
        this.x = offsetX * time + initOffsetX
        this.y = offsetY
        this.radius = baseRadius
        this.color = accents.includes(time) ? '178, 34, 34' : '255, 99, 71'
        this.textColor = '255, 255, 255, '
        this.alpha = 0.5
        this.speed = 2.5
        this.triggered = false
        this.done = true
    }
    draw (time) {
        if (parseInt(time) === metronomeEvent && !this.triggered) {
            this.triggered = true
            this.done = false
            this.radius = baseRadius * 2
            this.alpha = 1
        }

        if (this.triggered && this.radius <= baseRadius) {
            this.triggered = false
            this.radius = baseRadius
            this.done = true
            metronomeEvent = null
        }

        if (this.triggered && !this.done) {
            this.alpha -= this.speed / 30
            this.radius -= this.speed
        }

        if (this.alpha <= 0.5) this.alpha = 0.5

        ctx.beginPath()
        ctx.fillStyle = 'rgb(' + this.color + ')'
        ctx.arc(this.x, this.y, this.radius, 0, PI2)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'rgba(' + this.textColor + this.alpha + ')'
        ctx.font = (canvas.height / 5) + 'px Roboto'
        ctx.fillText(this.time, this.x, this.y * 2.25)
        ctx.textAlign = 'center'
        ctx.closePath()
    }
}

// See http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
// for some info about fps and requestAnimationFrame
// Note : higher fps must be tested on a mobile device !
const maxFps = 10
const interval = 1000 / maxFps
let then = Date.now()
const animateCanvas = () => {
    const now = Date.now()
    const delta = now - then
    requestAnimationFrame(animateCanvas)
    if (delta > interval) {
        then = now - (delta % interval)
        // Draw dots
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        forEachValue(beatDots, (beatDot, time) => {
            beatDot.draw(time)
        })
    }
}

const resetCanvas = state => {
    beatDots = {}
    palo = state.selectedPalo.value
    beats = state.selectedPalo.nbBeatsInPattern / 2
    accents = state.selectedPalo.accents
    offsetX = canvas.width / beats
    offsetY = canvas.height / 2.5
    initOffsetX = offsetX / 2
    baseRadius = canvas.height / 7.5
    for (let i = 0; i < beats; i++) {
        beatDots[i] = new BeatDot(i)
    }
    animateCanvas()
}

const getCanvasDim = state => {
    canvas = state.canvasElement
    canvas.width = state.canvasElement.clientWidth
    canvas.height = state.canvasElement.clientWidth > 991 ? state.canvasElement.clientWidth / 10 : 75
    ctx = canvas.getContext('2d')
}

const initCanvas = store => {
    store.subscribe((mutation, state) => {
        switch (mutation.type) {
            case types.SELECT_PALO:
                resetCanvas(state)
                break

            case types.GET_CANVAS_EL:
                getCanvasDim(state)
                resetCanvas(state)
                break

            case types.TRIGGER_EVENT:
                metronomeEvent = state.metronomeEvent
                break
        }
    })
}

export default initCanvas
