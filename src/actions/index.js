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
// TODO: allow user to add rating for new puzzle
export const createNewPuzzle = ({ problem, solution, notes, rating=2 }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        var id = firebase.database().ref(`/puzzles/logic`).push().key;
        firebase.database().ref(`/puzzles/logic/${id}`)
        .update({ problem, solution, notes, id, rating })
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

// Load the userID.
export const loadUserID = () => {
    const { currentUser } = firebase.auth();
    return {
        type: 'USER_FETCH',
        payload: currentUser.uid,
    };
};

// Write to the database when cryptography puzzle is solved.
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

// Write to the database when logic puzzle is solved.
export const logicPuzzleSolved = (id) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/logic/${id}/solvedBy/${currentUser.uid}`)
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
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/score`)
        .set(score)
        .then(() => {
            dispatch({ type: 'UPDATE_SCORE', payload: score });
        });
    };
};