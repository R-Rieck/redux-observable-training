export type CounterState = {
    counter: number;
}

const initalState: CounterState = {
    counter: 0
}

export const CounterReducer = (state: CounterState = initalState, action: any): CounterState => {
    switch (action.type) {
        case 'INCREMENT_IF_ODD':
            return { ...state, counter: state.counter += 2 }
        default:
            return state;
    }
}