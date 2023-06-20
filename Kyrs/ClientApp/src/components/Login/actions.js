const changeParams = (type, value) => {
    return {
        type: 'CHANGE_PARAMS',
        payload: {
            type,
            value
        }
    }
}
export { changeParams };