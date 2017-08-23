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

// Updating the add puzzle solution options.
export const optionsUpdate = ({ position, value }) => {
    return {
        type: 'OPTIONS_UPDATE',
        payload: { position, value },
    };
};

// Creating a new puzzle and adding it to the database.
export const createNewPuzzle = ({ problem, solution, notes, rating, options, type, category }) => {
    const { currentUser } = firebase.auth();
    addedBy = currentUser.uid;
    return (dispatch) => {
        var id = firebase.database().ref(`/puzzles/${category}`).push().key;
        firebase.database().ref(`/puzzles/${category}/${id}`)
        .update({ problem, solution, notes, id, rating, options, type, addedBy })
        .then(() => {
            dispatch({ type: 'NEW_PUZZLE' });
        });
    };
};

// Load the logic puzzles from the database.
export const loadLogicPuzzles = () => {
    return (dispatch) => {
        firebase.database().ref(`/puzzles/logic`)
        .on('value', snapshot => {
            dispatch({ type: 'LOGIC_FETCH', payload: snapshot.val() });
        });
    };
};

// Load the cryptography puzzles from the database.
export const loadCryptographyPuzzles = () => {
    return (dispatch) => {
        firebase.database().ref(`/puzzles/cryptography`)
        .on('value', snapshot => {
            dispatch({ type: 'CRYPTOGRAPHY_FETCH', payload: snapshot.val() });
        });
    };
};

// Load the cybersecurity puzzles from the database.
export const loadCyberSecurityPuzzles = () => {
    return (dispatch) => {
        firebase.database().ref(`/puzzles/cybersecurity`)
        .on('value', snapshot => {
            dispatch({ type: 'CYBERSECURITY_FETCH', payload: snapshot.val() });
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

// Write to the database when a puzzle is solved.
export const puzzleSolved = (id) => {
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
export const loadScores = () => {
    // initial array of scores
    let userScores = [];
    return (dispatch) => {
        firebase.database().ref(`/users`)
        .on('value', snapshot => {
            // find each user's name and score
            snapshot.forEach(data => {
                uid = data.key;
                // get user's name
                firebase.database().ref(`users/${uid}/name`)
                .on('value', snapshot => {
                    user = snapshot.val()
                });
                // get user's score
                firebase.database().ref(`/users/${uid}/score`)
                .on('value', snapshot => {
                    // add user's name and score to the array
                    userScores.push({ name: user, score: snapshot.val() })
                });
            });
            // sort the scores
            userScores.sort((a, b) => {
                return b.score - a.score;
            });
            // return scores
            dispatch({ type: 'SCORES_FETCH', payload: userScores });
        });
    };
};

// A new user is created.
export const createNewUser = () => {
    return {
        type: 'NEW_USER',
    };
};

// The new user has been created and the details have been added to the database.
// TODO: if refresh before info is saved => error
export const userCreated = (name, date) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/score`).set(0)
        firebase.database().ref(`/users/${currentUser.uid}/admin`).set(false)
        firebase.database().ref(`/users/${currentUser.uid}/solved`).set('')
        firebase.database().ref(`/users/${currentUser.uid}/name`).set(name)
        firebase.database().ref(`/users/${currentUser.uid}/dob`).set(date)
        .then(() => {
            dispatch({ type: 'USER_CREATED' });
        });
    };
};

// Change the user's name.
export const changeName = (name) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/name`)
        .set(name)
        .then(() => {
            dispatch({ type: 'UPDATE_NAME', payload: name});
        });
    };
};