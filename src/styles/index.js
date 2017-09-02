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
    subheading: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    badge: {
        backgroundColor: '#567FDE',
        marginRight: 7,
    },
    select: {
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: '100%' - 40,
        marginBottom: 5,
    },
    selectOptions: {
        backgroundColor : '#FFF',
        width: '90%',
        borderColor: 'white',
    },
    selectBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    radio: {
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        padding: 20,
    },
    tabs: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#567FDE',
        paddingTop: 7,
        marginTop: -0.75,
    },
    tab: {
        flex: 1,
        height: 55,
        paddingTop: 7,
        marginTop: -7,
    },
    tabText: {
        color: '#fff',
        textAlign: 'center',
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
    forgot: {
        textAlign: 'center',
        marginTop: 15,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    
    // Single puzzle page
    more: {
        textAlign: 'center',
        marginTop: 45,
        paddingBottom: 20,
    },

    // Add puzzle page
    errorList: {
        color: 'red',
        textAlign: 'center',
    },

    // Leaderboard page
    numbering: {
        padding: 5,
        paddingRight: 5,
        fontSize: 16,
        color: 'black',
    },
});