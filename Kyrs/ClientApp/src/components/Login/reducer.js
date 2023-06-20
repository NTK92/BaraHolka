const initialState = {
    id : 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PARAMS': {
            return {
                ...state,
                [action.payload.type]: action.payload.value
            }
        }
    }
}