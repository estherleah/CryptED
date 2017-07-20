import firebase from 'firebase';

// A puzzle is selected.
export const selectPuzzle = (puzzleId) => {
    return {
        type: 'SELECTED_PUZZLE',
        payload: puzzleId,
    };
};

// No specific puzzle is selected.
export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};

// Updating the add puzzle form.
export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
};

// Creating a new puzzle and adding it to the database.
export const createNewPuzzle = ({ problem, solution, notes }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/logic`)
        .push({ problem, solution, notes })
        .then(() => {
            dispatch({ type: 'NEW_PUZZLE' });
        });
    };
};

// Load the puzzles from the database.
export const loadInitialPuzzles = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/logic`)
        .on('value', snapshot => {
            dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() });
        });
    };
};