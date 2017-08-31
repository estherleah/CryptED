import firebase from 'firebase';

// ----------------------------------------------------------------------------------- //
// ---------------------------------- data fetching ---------------------------------- //

// Load the user data.
export const loadUser = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/`)
        // set to listen to any events => will update the user in state
        .on('value', snapshot => {
            uid = currentUser.uid;
            user = {...snapshot.val(), uid}
            dispatch({ type: 'USER_FETCH', payload: user });
        });
    };
};

// Load the cryptography puzzles from the database.
export const loadCryptographyPuzzles = () => {
    let cryptoPuzzles = [];
    return (dispatch) => {
        firebase.database().ref(`/puzzles/cryptography`).orderByChild('rating')
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                cryptoPuzzles.push(child.val())
            })
            dispatch({ type: 'CRYPTOGRAPHY_FETCH', payload: cryptoPuzzles });
        });
    };
};

// Load the cybersecurity puzzles from the database.
export const loadCyberSecurityPuzzles = () => {
    let cyberPuzzles = [];
    return (dispatch) => {
        firebase.database().ref(`/puzzles/cybersecurity`).orderByChild('rating')
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                cyberPuzzles.push(child.val())
            })
            dispatch({ type: 'CYBERSECURITY_FETCH', payload: cyberPuzzles });
        });
    };
};

// Load the logic puzzles from the database.
export const loadLogicPuzzles = () => {
    let logicPuzzles = [];
    return (dispatch) => {
        firebase.database().ref(`/puzzles/logic`).orderByChild('rating')
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                logicPuzzles.push(child.val())
            })
            dispatch({ type: 'LOGIC_FETCH', payload: logicPuzzles });
        });
    };
};

// Load all puzzles from the database
export const loadNewPuzzles = () => {
    let newPuzzles = [];
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new`).orderByChild('rating')
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                newPuzzles.push(child.val())
            })
            dispatch({ type: 'NEW_FETCH', payload: newPuzzles });
        });
    };
};

// Load the top scores for the leaderboard.
export const loadTopScores = () => {
    let topScores = [];
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/scores/`)
        // listen to any changes in top scores so no mistakes are made
        .on('value', snapshot => {
            snapshot.forEach((child) => {
                deletionKey = child.key;
                name = child.val().name;
                score = child.val().score
                topScores.push({deletionKey, name, score})
            })
            topScores.sort((a, b) => {
                return b.score - a.score;
            });
            dispatch({ type: 'LEADERBOARD_FETCH', payload: topScores });
        });
    };
}

// Load the user scores from the database.
// NB: This is only done if the user is an admin.
export const loadScores = () => {
    // initial array of scores
    let userScores = [];
    // only listen once as updates every time reload the page
    return (dispatch) => {
        firebase.database().ref(`/users`)
        .once('value', snapshot => {
            // find each user's name and score
            snapshot.forEach(data => {
                uid = data.key;
                // get user's name
                firebase.database().ref(`users/${uid}/name`)
                .once('value', snapshot => {
                    user = snapshot.val()
                });
                // get user's score
                firebase.database().ref(`/users/${uid}/score`)
                .once('value', snapshot => {
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

// ------------------------------- end of data fetching ------------------------------ //
// ----------------------------------------------------------------------------------- //




// ----------------------------------------------------------------------------------- //
// ------------------------ selecting and deselecting a puzzle ----------------------- //

// A puzzle is selected.
export const selectPuzzle = (puzzleId, type) => {
    return {
        type: 'SELECTED_PUZZLE',
        payload: {puzzle: puzzleId, type},
    };
};

// No specific puzzle is selected.
export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};

// -------------------- end of selecting and deselecting a puzzle -------------------- //
// ----------------------------------------------------------------------------------- //




// ----------------------------------------------------------------------------------- //
// --------------------------------- solving a puzzle -------------------------------- //

// Write to the database when a puzzle is solved.
export const puzzleSolved = (id) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/solved/${id}`)
        .set(true)
        .then(() => {
            dispatch({ type: 'PUZZLE_SOLVED', payload: id });
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

// Update user's score if user already on leaderboard.
export const updateUserOnLeaderboard = (score) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/scores/${currentUser.uid}/score`)
        .set(score)
        .then(() => {
            dispatch({ type: 'UPDATE_LEADERBOARD' });
        });
    };
};

// Add user to leaderboard if score becomes one of the top 10.
export const addUserToLeaderboard = (toRemove, name, score) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/scores/${toRemove}`).remove()
        firebase.database().ref(`/scores/${currentUser.uid}`)
        .set({name, score})
        .then(() => {
            dispatch({ type: 'UPDATE_LEADERBOARD' });
        });
    };
}

// ----------------------------- end of solving a puzzle ----------------------------- //
// ----------------------------------------------------------------------------------- //




// ----------------------------------------------------------------------------------- //
// --------------------------------- adding a puzzle --------------------------------- //

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
export const createNewPuzzle = ({ problem, solution, notes, rating, options, type, category, admin }) => {
    const { currentUser } = firebase.auth();
    addedBy = currentUser.uid;
    if (admin) {
        // admin user can add a puzzle directly
        return (dispatch) => {
            var id = firebase.database().ref(`/puzzles/${category}`).push().key;
            var puzzle = { problem, solution, notes, id, rating, options, type, addedBy, category }
            firebase.database().ref(`/puzzles/${category}/${id}`)
            .update({ problem, solution, notes, id, rating, options, type, addedBy, category })
            .then(() => {
                (category == 'cybersecurity') ?
                dispatch({ type: 'ADD_CYBER_PUZZLE', payload: puzzle }) :
                dispatch({ type: 'ADD_LOGIC_PUZZLE', payload: puzzle })
            });
        };
    } else {
        // other users need to have puzzles checked by admin
        return (dispatch) => {
            var id = firebase.database().ref(`/puzzles/new`).push().key;
            firebase.database().ref(`/puzzles/new/${id}`)
            .update({ problem, solution, notes, id, rating, options, type, addedBy, category })
            .then(() => {
                dispatch({ type: 'NEW_PUZZLE' });
            });
        };
    }
};

// ------------------------------ end of adding a puzzle ----------------------------- //
// ----------------------------------------------------------------------------------- //




// ----------------------------------------------------------------------------------- //
// ------------------------------ admin vetting process ------------------------------ //

// Delete an added puzzle.
export const deletePuzzle = (pid, toDelete) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new/${pid}`).remove()
        .then(() => {
            dispatch({ type: 'DELETE_PUZZLE', payload: toDelete });
        });
    };
};

// Approve an added puzzle.
export const addPuzzle = (pid, puzzle, category, index) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new/${pid}`).remove();
        firebase.database().ref(`/puzzles/${category}/${pid}`)
        .set(puzzle)
        .then(() => {
            // currently added to the end of the list of puzzles (i.e. not in order of rating)
            (category == 'cybersecurity') ?
            dispatch({ type: 'APPROVE_CYBER_PUZZLE', payload: {puzzle, index} }) :
            dispatch({ type: 'APPROVE_LOGIC_PUZZLE', payload: {puzzle, index} })
        });
    };
};

// Amend an added and change it in the database.
export const amendPuzzle = (pid, problem, solution, notes, rating, options, index, puzzle) => {
    const { currentUser } = firebase.auth();
    changedBy = currentUser.uid;
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new/${pid}`)
        .update({ problem, solution, notes, rating, options, changedBy })
        .then(() => {
            dispatch({ type: 'AMEND_PUZZLE', payload: {puzzle, index} });
        });
    };
};

// Cancel amending an added puzzle.
export const cancelEditing = () => {
    return {
        type: 'CANCEL_EDITING',
    };
};

// --------------------------- end of admin vetting process -------------------------- //
// ----------------------------------------------------------------------------------- //




// ----------------------------------------------------------------------------------- //
// --------------------------------- settings options -------------------------------- //

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

// Change the user's name.
export const changeName = (name) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        // if on leaderboard, change user's name on leaderboard
        if(firebase.database().ref(`/scores/`).child(currentUser.uid)) {
            firebase.database().ref(`/scores/${currentUser.uid}/name`)
            .set(name)
        }
        firebase.database().ref(`/users/${currentUser.uid}/name`)
        .set(name)
        .then(() => {
            dispatch({ type: 'UPDATE_NAME', payload: name});
        });
    };
};

// ----------------------------- end of settings options ----------------------------- //
// ----------------------------------------------------------------------------------- //