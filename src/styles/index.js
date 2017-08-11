import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    //
    // GENERAL STYLES
    //
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        height: 70,
        width: '100%',
    },
    scroll: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
    },
    body: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    button: {
        margin: 20,
    },
    list: {
        width: '100%',
        backgroundColor: '#F5FCFF',
        marginTop: 0,
    },
    listItem: {
        borderBottomColor: '#fafafa',
    },
    subtitle: {
        fontWeight: 'normal',
    },
    select: {
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: '100%' - 40,
    },
    selectOptions: {
        backgroundColor : '#F5FCFF',
        width: '90%',
        borderColor: 'lightgray',
    },
    selectBackdrop: {
        backgroundColor: 'rgba(245, 252, 255, 0.75)',
    },
    radio: {
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20,
    },

    //
    // PAGE SPECIFIC STYLES
    //

    // Login page
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    
    // Cryptography page
    more: {
        textAlign: 'center',
        marginTop: 45,
        paddingBottom: 20,
    },

    // Settings page
    badge: {
        backgroundColor: '#567FDE',
        marginRight: 7,
    },

    // Add puzzle page
    errorList: {
        color: 'red',
        textAlign: 'center',
    },

    // Leaderboard page
    scores: {
        backgroundColor: '#567FDE',
        color: 'white',
        borderRadius: 30,
        width: 30,
        height: 30,
        textAlign: 'center',
        marginRight: 5,
        paddingTop: 5,
    },
    numbering: {
        padding: 5,
        paddingRight: 5,
        fontSize: 16,
        color: 'black',
    },
});