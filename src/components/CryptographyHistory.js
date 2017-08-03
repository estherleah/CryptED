import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import AppHeader from './AppHeader';
import styles from '../styles';

export default class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <View style={styles.content}>
                        <Text style={styles.title}>The history of cryptography</Text>
                        <Text>      
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Aenean in augue sed sem maximus euismod. 
                            Vivamus aliquet purus vitae consectetur vulputate. 
                            Nunc diam massa, maximus nec ornare non, aliquam in ipsum. 
                            Donec porttitor sollicitudin felis, in molestie tortor lobortis id. 
                            Sed imperdiet massa enim, ut luctus risus porta sit amet. 
                            Mauris faucibus massa sit amet sagittis dapibus. 
                            Mauris sit amet interdum justo. 
                            Aenean aliquet dui non ultrices varius. 
                            Vivamus bibendum aliquet ante, vel ultrices augue rhoncus et. 
                            Quisque at venenatis leo. 
                            Curabitur luctus leo ut elit dictum, quis interdum sem auctor. 
                            Aliquam dolor nulla, pellentesque sed rutrum quis, posuere quis arcu. 
                            Duis bibendum vel nisl at euismod.
                            {'\n'}{'\n'}
                            Sed vehicula dolor id bibendum consequat. 
                            Nunc vestibulum urna mattis, pulvinar nisl eu, sodales orci. 
                            Suspendisse sed blandit mi. 
                            Curabitur facilisis ex in sagittis sollicitudin. 
                            Nullam aliquam odio a facilisis tempus. 
                            Donec finibus vitae nibh porta vestibulum. 
                            Sed rhoncus porta ipsum et tempus. 
                            Curabitur tempus vestibulum sem sed efficitur. 
                            Nullam dapibus condimentum neque, quis viverra velit tristique at.
                            {'\n'}{'\n'}
                            In auctor, dolor sed cursus elementum, nunc nulla hendrerit metus, et posuere risus nibh sit amet elit. 
                            Nunc a eleifend dolor, at consectetur erat. 
                            Mauris auctor gravida malesuada. 
                            Maecenas blandit sit amet neque non mattis. 
                            Sed tincidunt magna et metus mollis, vel pellentesque quam posuere. 
                            Duis faucibus quam at nulla gravida tincidunt. 
                            Nullam venenatis pellentesque suscipit. 
                            Duis hendrerit dignissim erat sit amet varius.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}