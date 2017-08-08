// Initial state
const initialState = {
    cryptoPuzzles: [],
    logicPuzzles: [],
    detailView: false,
    puzzleSelected: null,
    problem: '',
    solution: '',
    notes: '',
    rating: 0,
    loadingPuzzles: false,
    user: null,
    scores: [],
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

        case 'USER_FETCH':
            return {
                ...state,
                user: action.payload,
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
                rating: 0,
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

        case 'CHANGE_ADMIN':
            return {
                ...state,
                admin: action.payload,
            };

        case 'SCORES_FETCH':
            return {
                ...state,
                scores: action.payload,
            }
            
        default:
            return state;
    }
}