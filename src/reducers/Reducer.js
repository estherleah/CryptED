// Initial state
const initialState = {
    puzzles: [],
    logicpuzzles: [],
    detailView: false,
    puzzleSelected: null,
    problem: '',
    solution: '',
    notes: '',
    loadingPuzzles: false,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIC_FETCH':
            return {
                ...state,
                logicpuzzles: action.payload,
            };

        case 'CRYPTOGRAPHY_FETCH':
            return {
                ...state,
                puzzles: action.payload,
            };

        case 'SELECTED_PUZZLE':
            return {
                ...state,
                detailView: true,
                puzzleSelected: action.payload,
            };
            
        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                puzzleSelected: null,
            };

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value,
            };

        case 'NEW_PUZZLE':
            return {
                ...state,
                problem: '',
                solution: '',
                notes: '',
            };

        case 'ADD_PUZZLE':
            return {
                ...state,
                ...action.newPuzzle,
            };
            
        default:
            return state;
    }
}