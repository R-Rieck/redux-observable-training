export type CounterState = {
    counter: number;
}

const initalState: CounterState = {
    counter: 0
}

export const CounterReducer = (state: CounterState = initalState, action: any): CounterState => {
    console.log(action)
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return { ...state, counter: state.counter += 1 }
        case 'INCREMENT_BY':
            return { ...state, counter: state.counter += action.payload.payload }
        default:
            return state;
    }
}