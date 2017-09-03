// Initial state
const initialState = {
    user: null,
    cryptoPuzzles: [],
    cyberPuzzles: [],
    logicPuzzles: [],
    newPuzzles: [],
    detailView: false,
    puzzleSelected: null,
    type: null,
    topScores: [],
    title: '',
    problem: '',
    solution: '',
    notes: '',
    rating: 0,
    options: { A: '', B: '', C: '', D: '' },
    scores: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        // -----------------------------------------------------------------------------------

        // data fetching

        case 'USER_FETCH':
            return {
                ...state,
                user: action.payload,
            };

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

        case 'LEADERBOARD_FETCH':
            return {
                ...state,
                topScores: action.payload,
            };

        // NB: only fetch all scores if user is admin
        case 'SCORES_FETCH':
            return {
                ...state,
                scores: action.payload,
            };

        // end of data fetching

        // -----------------------------------------------------------------------------------

        // selecting and deselecting a puzzle

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

        // end of selecting and deselecting a puzzle

        // -----------------------------------------------------------------------------------

        // solving a puzzle

        case 'PUZZLE_SOLVED':
            return {
                ...state,
                user: {
                    ...state.user,
                    solved: {
                        ...state.user.solved,
                        [action.payload]: true,
                    },
                },
            };

        case 'UPDATE_SCORE':
            return {
                ...state,
                user: {
                    ...state.user,
                    score: action.payload,
                },
            };

        case 'UPDATE_LEADERBOARD':
            return {
                ...state,
            };

        // end of solving a puzzle

        // -----------------------------------------------------------------------------------

        // adding a new puzzle as non admin

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
                title: '',
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: { A: '', B: '', C: '', D: '' },
            };

        // end of adding a new puzzle as non admin

        // -----------------------------------------------------------------------------------

        // adding a new puzzle as admin

        case 'ADD_CYBER_PUZZLE':
            return {
                ...state,
                title: '',
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: { A: '', B: '', C: '', D: '' },
                cyberPuzzles: [
                    ...state.cyberPuzzles.slice(0),
                    action.payload,
                ],
            };

        case 'ADD_LOGIC_PUZZLE':
            return {
                ...state,
                title: '',
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: { A: '', B: '', C: '', D: '' },
                logicPuzzles: [
                    ...state.logicPuzzles.slice(0),
                    action.payload,
                ],
            };

        // end of adding a new puzzle as admin

        // -----------------------------------------------------------------------------------

        // admin vetting options

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
                title: '',
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: { A: '', B: '', C: '', D: '' },
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
                title: '',
                problem: '',
                solution: '',
                notes: '',
                rating: 0,
                options: { A: '', B: '', C: '', D: '' },
                detailView: false,
                puzzleSelected: null,
                type: null,
            };

        // end of admin vetting options

        // -----------------------------------------------------------------------------------

        // settings options

        case 'CHANGE_ADMIN':
            return {
                ...state,
                user: {
                    ...state.user,
                    admin: action.payload,
                },
            };

        case 'UPDATE_NAME':
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload,
                },
            };

        // end of settings options

        // -----------------------------------------------------------------------------------
            
        default:
            return state;
    }
}