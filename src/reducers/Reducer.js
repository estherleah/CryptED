// Initial state
const initialState = {
    cryptoPuzzles: [],
    logicPuzzles: [],
    detailView: false,
    puzzleSelected: null,
    problem: '',
    solution: '',
    notes: '',
    loadingPuzzles: false,
    user: null,
    score: 0,
    uid: '',
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIC_FETCH':
            return {
                ...state,
                logicPuzzles: action.payload,
            };

        case 'CRYPTOGRAPHY_FETCH':
            return {
                ...state,
                cryptoPuzzles: action.payload,
            };

        case 'USERID_FETCH':
            return {
                ...state,
                uid: action.payload,
            };

        case 'USER_FETCH':
            return {
                ...state,
                user: action.payload,
            };

        case 'SCORE_FETCH':
            return {
                ...state,
                score: action.payload,
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

        case 'PUZZLE_SOLVED':
            return {
                ...state,
            };

        case 'UPDATE_SCORE':
            return {
                ...state,
                score: action.payload,
            };
            
        default:
            return state;
    }
}