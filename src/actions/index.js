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
export const createNewPuzzle = ({ problem, solution, notes, rating }) => {
    const { currentUser } = firebase.auth();
    addedBy = currentUser.uid;
    return (dispatch) => {
        var id = firebase.database().ref(`/puzzles/logic`).push().key;
        firebase.database().ref(`/puzzles/logic/${id}`)
        .update({ problem, solution, notes, id, rating, addedBy })
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

// Load the user data.
export const loadUser = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/`)
        .on('value', snapshot => {
            dispatch({ type: 'USER_FETCH', payload: snapshot.val() });
        });
    };
};

// Write to the database when cryptography puzzle is solved.
export const cryptographyPuzzleSolved = (id) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
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
        firebase.database().ref(`/users/${currentUser.uid}/solved/${id}`)
        .set(true)
        .then(() => {
            dispatch({ type: 'PUZZLE_SOLVED' });
        });
    };
};

// Update the score when a puzzle is solved.
export const updateScore = (score) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/score`)
        .set(score)
        .then(() => {
            dispatch({ type: 'UPDATE_SCORE', payload: score });
        });
    };
};

// Change the admin status of a user.
export const changeAdmin = (admin) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/admin`)
        .set(admin)
        .then(() => {
            dispatch({ type: 'CHANGE_ADMIN', payload: admin });
        });
    };
};

// Load the user scores from the database.
// TODO: change to show name of user instead of key.
export const loadScores = () => {
    // initial array of scores
    let userScores = [];
    return (dispatch) => {
        firebase.database().ref(`/users`)
        .on('value', snapshot => {
            // find each user's score
            snapshot.forEach(data => {
                user = data.key;
                firebase.database().ref(`/users/${user}/score`)
                .on('value', snapshot => {
                    // add user's score to the array
                    userScores.push({ name: user, score: snapshot.val() })
                });
            });
            // sort the scores
            userScores.sort((a, b) => {
                return b.score - a.score;
            });
            // return 10 top scores
            dispatch({ type: 'SCORES_FETCH', payload: userScores.slice(0, 10) });
        });
    };
};