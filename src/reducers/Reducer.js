import puzzles from './puzzles.json';

// Initial state
const initialState = {
    puzzles,
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}