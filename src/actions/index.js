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
export const createNewPuzzle = ({ problem, solution, notes, rating, options, type, category, admin }) => {
    const { currentUser } = firebase.auth();
    addedBy = currentUser.uid;
    if (admin) {
        // admin user can add a puzzle directly
        return (dispatch) => {
            var id = firebase.database().ref(`/puzzles/${category}`).push().key;
            firebase.database().ref(`/puzzles/${category}/${id}`)
            .update({ problem, solution, notes, id, rating, options, type, addedBy })
            .then(() => {
                dispatch({ type: 'NEW_PUZZLE' });
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

// Load all puzzles from the database
export const loadPuzzles = () => {
    let puzzles = [];
    return (dispatch) => {
        firebase.database().ref(`/puzzles/`)
        .on('value', snapshot => {
            snapshot.forEach((child) => {
                type = child.key;
                firebase.database().ref(`/puzzles/${type}`).orderByChild('rating')
                .on('value', snapshot => {
                    snapshot.forEach((puzzle) => {
                        puzzles.push({data: puzzle.val(), type})
                    })
                })
            })
            dispatch({ type: 'PUZZLES_FETCH', payload: puzzles });
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

// Update user's score if user already on leaderboard.
export const updateUserOnLeaderboard = (score, topScores) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/scores/${currentUser.uid}/score`)
        .set(score)
        .then(() => {
            dispatch({ type: 'UPDATE_LEADERBOARD', payload: topScores });
        });
    };
};

// Add user to leaderboard if score is one of the top 10.
export const addUserToLeaderboard = (toRemove, name, score, topScores) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/scores/${toRemove}`).remove()
        firebase.database().ref(`/scores/${currentUser.uid}`)
        .set({name, score})
        .then(() => {
            dispatch({ type: 'UPDATE_LEADERBOARD', payload: topScores });
        });
    };
}

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

// Load the top scores for the leaderboard.
export const loadTopScores = () => {
    let topScores = [];
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/scores/`)
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

// Delete an added puzzle.
export const deletePuzzle = (pid) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new/${pid}`).remove()
        .then(() => {
            dispatch({ type: 'NONE_SELECTED' });
        });
    };
};

// Approve an added puzzle.
export const addPuzzle = (pid, puzzle, category) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new/${pid}`).remove();
        firebase.database().ref(`/puzzles/${category}/${pid}`)
        .set(puzzle)
        .then(() => {
            dispatch({ type: 'NONE_SELECTED' });
        });
    };
};

// Amend an added and change it in the database.
export const amendPuzzle = (pid, problem, solution, notes, rating, options) => {
    const { currentUser } = firebase.auth();
    changedBy = currentUser.uid;
    return (dispatch) => {
        firebase.database().ref(`/puzzles/new/${pid}`)
        .update({ problem, solution, notes, rating, options, changedBy })
        .then(() => {
            dispatch({ type: 'NEW_PUZZLE' });
        });
    };
};

// Cancel amending an added puzzle.
export const cancelEditing = () => {
    return {
        type: 'NEW_PUZZLE',
    };
};