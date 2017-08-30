// Initial state
const initialState = {
    cryptoPuzzles: [],
    cyberPuzzles: [],
    logicPuzzles: [],
    newPuzzles: [],
    detailView: false,
    puzzleSelected: null,
    type: null,
    problem: '',
    solution: '',
    notes: '',
    rating: 0,
    options: {
        A: '',
        B: '',
        C: '',
        D: ''
    },
    user: null,
    topScores: [],
    scores: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'CRYPTOGRAPHY_FETCH':
            return {
                ...state,
                cryptoPuzzles: action.payload,
            };

        case 'CYBERSECURITY_FETCH':
            return {
                ...state,
                cyberPuzzles: action.payload,
            };

        case 'LOGIC_FETCH':
            return {
                ...state,
                logicPuzzles: action.payload,
            };

        case 'NEW_FETCH':
            return {
                ...state,
                newPuzzles: action.payload,
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
                puzzleSelected: action.payload.puzzle,
                type: action.payload.type
            };
            
        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                puzzleSelected: null,
                type: null,
            };

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value,
            };

        case 'OPTIONS_UPDATE':
            return {
                ...state,
                options: {
                    ...state.options,
                    [action.payload.position]: action.payload.value,
                },
            };

        case 'NEW_PUZZLE':
            return {
                ...state,
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: {
                    A: '',
                    B: '',
                    C: '',
                    D: ''
                },
            };

        case 'ADD_CYBER_PUZZLE':
            return {
                ...state,
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: {
                    A: '',
                    B: '',
                    C: '',
                    D: ''
                },
                cyberPuzzles: [
                    ...state.cyberPuzzles.slice(0),
                    action.payload,
                ],
            };

        case 'ADD_LOGIC_PUZZLE':
            return {
                ...state,
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: {
                    A: '',
                    B: '',
                    C: '',
                    D: ''
                },
                logicPuzzles: [
                    ...state.logicPuzzles.slice(0),
                    action.payload,
                ],
            };

        case 'DELETE_PUZZLE':
            return {
                ...state,
                detailView: false,
                puzzleSelected: null,
                type: null,
                newPuzzles: [
                    ...state.newPuzzles.slice(0, action.payload),
                    ...state.newPuzzles.slice(action.payload + 1),
                ],
            };

        case 'APPROVE_CYBER_PUZZLE':
            return {
                ...state,
                detailView: false,
                puzzleSelected: null,
                type: null,
                newPuzzles: [
                    ...state.newPuzzles.slice(0, action.payload.index),
                    ...state.newPuzzles.slice(action.payload.index + 1),
                ],
                cyberPuzzles: [
                    ...state.cyberPuzzles.slice(0),
                    action.payload.puzzle,
                ],
            };

        case 'APPROVE_LOGIC_PUZZLE':
            return {
                ...state,
                detailView: false,
                puzzleSelected: null,
                type: null,
                newPuzzles: [
                    ...state.newPuzzles.slice(0, action.payload.index),
                    ...state.newPuzzles.slice(action.payload.index + 1),
                ],
                logicPuzzles: [
                    ...state.logicPuzzles.slice(0),
                    action.payload.puzzle,
                ],
            };

        case 'AMEND_PUZZLE':
            return {
                ...state,
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: {
                    A: '',
                    B: '',
                    C: '',
                    D: ''
                },
                detailView: false,
                puzzleSelected: null,
                type: null,
                newPuzzles: [
                    ...state.newPuzzles.slice(0, action.payload.index),
                    action.payload.puzzle,
                    ...state.newPuzzles.slice(action.payload.index + 1),
                ],
            };

        case 'CANCEL_EDITING':
            return {
                ...state,
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: {
                    A: '',
                    B: '',
                    C: '',
                    D: ''
                },
                detailView: false,
                puzzleSelected: null,
                type: null,
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
            };

        case 'LEADERBOARD_FETCH':
            return {
                ...state,
                topScores: action.payload,
            };

        case 'UPDATE_LEADERBOARD':
            return {
                ...state,
            };

        case 'UPDATE_NAME':
            return {
                ...state,
                name: action.payload,
            };
            
        default:
            return state;
    }
}