import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './utils/AuthContext';
import PinsHeader from './PinsHeader'; 


const PinScreen = () => {
    const [hostedPins, setHostedPins] = useState([]);
    const [activeTab, setActiveTab] = useState('Current');
    const { isLoggedIn, userData, userId } = useContext(AuthContext);


    if (!isLoggedIn) {
        return (
            <View style={pinsStyles.container}>
                <View style={pinsStyles.noPinsContainer}>
                    <Text style={pinsStyles.noPinsText}>You are not logged in. Please log in to view your pins.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={pinsStyles.container}>
            <PinsHeader /> 
            <View style={pinsStyles.navigationContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Current')}>
                    <Text style={[pinsStyles.navigationText, activeTab === 'Current' && pinsStyles.activeNavigationText]}>Current</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Hosting')}>
                    <Text style={[pinsStyles.navigationText, activeTab === 'Hosting' && pinsStyles.activeNavigationText]}>Hosting</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Joined')}>
                    <Text style={[pinsStyles.navigationText, activeTab === 'Joined' && pinsStyles.activeNavigationText]}>Joined</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Requested')}>
                    <Text style={[pinsStyles.navigationText, activeTab === 'Requested' && pinsStyles.activeNavigationText]}>Requested</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Previous')}>
                    <Text style={[pinsStyles.navigationText, activeTab === 'Previous' && pinsStyles.activeNavigationText]}>Previous</Text>
                </TouchableOpacity>
            </View>
            {hostedPins.length === 0 ? (
                <View style={pinsStyles.noPinsContainer}>
                    <Text style={pinsStyles.noPinsText}>You are currently not hosting any pins. Create a pin by tapping on the plus sign on the top right.</Text>
                </View>
            ) : (
                <Text>My pins</Text>
            )}
        </View>
    );
};
const pinsStyles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        paddingHorizontal: 20, // Add horizontal padding
        width: '100%'
    },
    navigationText: {
        fontSize: 16,
        color: 'gray',
        paddingBottom: 2, // Add some padding to make space for the border
        borderBottomWidth: 1, // Add bottom border
        borderBottomColor: 'transparent', // Initially transparent
    },
    activeNavigationText: {
        color: 'green', // Set color to green for active tab
        borderBottomColor: 'green', // Set bottom border color to green for active tab
        fontSize: 18
    },
    hrLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    noPinsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPinsText: {
        textAlign: 'center',
        fontSize: 20,
    },
    navigationContainer: {
        marginTop: 10,
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'space-between', // Space items evenly along the main axis
        paddingHorizontal: 20, // Add horizontal padding
    },
});

export default PinScreen;
