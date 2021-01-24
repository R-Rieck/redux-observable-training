export type pingpongstate = {
  isPinging: boolean;
};

const defaultState: pingpongstate = {
  isPinging: false,
};

export const pingpongReducer = (
  state: pingpongstate = defaultState,
  action: any
): pingpongstate => {
  switch (action.type) {
    case "PING":
      return {
        ...state,
        isPinging: action.payload,
      };

    case "PONG":
      return {
        ...state,
        isPinging: action.payload,
      };
    default:
      return state;
  }
};
