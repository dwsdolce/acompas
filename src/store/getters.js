const getters = {
    getInstrument: state => slug => state.instruments.find(o => o.value === slug)
}

export default getters
