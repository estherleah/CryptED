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

// Load the logic puzzles from the database.
export const loadLogicPuzzles = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/logic`)
        .on('value', snapshot => {
            dispatch({ type: 'LOGIC_FETCH', payload: snapshot.val() });
        });
    };
};

// Load the cryptography puzzles from the database.
export const loadCryptographyPuzzles = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/cryptography`)
        .on('value', snapshot => {
            dispatch({ type: 'CRYPTOGRAPHY_FETCH', payload: snapshot.val() });
        });
    };
};

// Load the user's score from the database.
export const loadScore = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/score`)
        .on('value', snapshot => {
            dispatch({ type: 'SCORE_FETCH', payload: snapshot.val() });
        });
    };
};

// Write to the database when puzzle is solved.
export const cryptographyPuzzleSolved = (id) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/cryptography/${id}/solvedBy/${currentUser.uid}`)
        .set(true)
        firebase.database().ref(`/users/${currentUser.uid}/solved/${id}`)
        .set(true)
        .then(() => {
            dispatch({ type: 'PUZZLE_SOLVED' });
        });
    };
};

// Update the score when a puzzle is solved.
export const updateScore = (score, id) => {
    const { currentUser } = firebase.auth();
    var alreadySolved;
    // check if the puzzle has already been solved
    firebase.database().ref(`/users/${currentUser.uid}/solved/${id}`)
    .once('value').then(function(snapshot) {
        alreadySolved = snapshot.hasChild(id);
    });
    // only update the score if the puzzle has not already been solved
    if (!alreadySolved) {
        return (dispatch) => {
            firebase.database().ref(`/users/${currentUser.uid}/score`)
            .set(score)
            .then(() => {
                dispatch({ type: 'UPDATE_SCORE', payload: score });
            });
        };
    };
};