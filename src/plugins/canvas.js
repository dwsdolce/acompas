import * as types from '@store/mutation-types'
import { forEachValue, deepCopy } from '../assets/utils'

const PI2 = 2 * Math.PI
let canvasEl,
    ctx,
    coord = {
        offsetX: null,
        offsetY: null,
        initOffsetX: null,
        baseRadius: null
    },
    beatDots = {},
    metronomeEvent = null

const requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame ||
                              window.oRequestAnimationFrame

const getBeatNb = (beatNb, palo) => {
    switch (palo.value) {
        case 'buleria-12':
        case 'buleria-12-variation':
        case 'fandangos':
        case 'alegria':
        case 'siguiriya':
            return (beatNb === 0) ? 12 : beatNb
        case 'buleria-6':
            return beatNb === 0 ? 6 : beatNb
        default:
            return beatNb + 1
    }
}

class BeatDot {
    constructor (beatNb, palo) {
        this.beatNb = getBeatNb(beatNb, palo)
        this.x = coord.offsetX * beatNb + coord.initOffsetX
        this.y = coord.offsetY
        this.radius = coord.baseRadius
        this.color = palo.accents.includes(beatNb) ? '178, 34, 34' : '255, 99, 71'
        this.textColor = '255, 255, 255, '
        this.alpha = 0.5
        this.speed = 0.2
        this.triggered = false
        this.done = true
    }
    draw (beatNb) {
        if (parseInt(beatNb) === metronomeEvent && !this.triggered) {
            this.triggered = true
            this.done = false
            this.radius = coord.baseRadius * 2
            this.alpha = 1
        }

        if (this.alpha <= 0.5) this.alpha = 0.5

        if (this.triggered && this.radius <= coord.baseRadius) {
            this.triggered = false
            this.radius = coord.baseRadius
            this.done = true
            metronomeEvent = null
        }

        if (this.triggered && !this.done) {
            this.alpha -= this.speed / 10
            this.radius -= this.speed
        }
        ctx.beginPath()
        ctx.fillStyle = 'rgb(' + this.color + ')'
        ctx.arc(this.x, this.y, this.radius, 0, PI2)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'rgba(' + this.textColor + this.alpha + ')'
        ctx.font = (canvasEl.height / 5) + 'px Roboto'
        ctx.fillText(this.beatNb, this.x, this.y * 2.25)
        ctx.textAlign = 'center'
        ctx.closePath()
    }
}

const animateCanvas = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    forEachValue(beatDots, (beatDot, beatNb) => {
        beatDot.draw(beatNb)
    })
    requestAnimationFrame(animateCanvas)
}

export const initCanvas = state => {
    canvasEl.width = state.visualizationSize.width
    canvasEl.height = state.visualizationSize.width / 10 > 75 ? state.visualizationSize.width / 10 : 75
    coord.offsetX = canvasEl.width / (state.selectedPalo.nbBeatsInPattern / 2)
    coord.offsetY = canvasEl.height / 2.5
    coord.initOffsetX = coord.offsetX / 2
    coord.baseRadius = canvasEl.height / 7.5
    ctx = canvasEl.getContext('2d')
    beatDots = {}
    for (let i = 0; i < (state.selectedPalo.nbBeatsInPattern / 2); i++) {
        beatDots[i] = new BeatDot(i, state.selectedPalo)
    }
    animateCanvas()
}

const canvas = store => {
    store.subscribe((mutation, state) => {
        let nextState = deepCopy(state)
        switch (mutation.type) {
            case types.GET_CANVAS_EL:
                canvasEl = mutation.payload || 300
                initCanvas(nextState)
                break
            case types.GET_VISUALIZATION_SIZE:
            case types.SELECT_VISUALIZATION_MODE:
            case types.SELECT_PALO:
                initCanvas(nextState)
                break
            case types.PLAY_STOP:
                if (!nextState.isPlaying) metronomeEvent = null
                break
            case types.TRIGGER_EVENT:
                metronomeEvent = nextState.metronomeEvent
                break
        }
    })
}

export default canvas
