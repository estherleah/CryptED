export const selectPuzzle = (puzzleId) => {
    return {
        type: 'SELECTED_PUZZLE',
        payload: puzzleId,
    };
};

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};
