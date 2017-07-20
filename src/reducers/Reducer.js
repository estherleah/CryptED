import puzzles from './puzzles.json';

// Initial state
const initialState = {
    puzzles,
    detailView: false,
    puzzleSelected: null,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'SELECTED_PUZZLE':
            return {
                ...state,
                detailView: true,
                puzzleSelected: action.payload,
            }
            
        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                puzzleSelected: null,
            }
            
        default:
            return state;
    }
}