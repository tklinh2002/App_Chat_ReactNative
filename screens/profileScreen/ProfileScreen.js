import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>

            <Image
                source={require('../../assets/profileTest/wall2.jpg')}
                style={styles.coverPhoto}
            />


            <TouchableOpacity style={styles.Button}>
                <Image
                    source={require('../../assets/icon/back.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>


            <TouchableOpacity style={[styles.Button, styles.FisrtRightButton]}>
                <Image
                    source={require('../../assets/icon/eye.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>


            <TouchableOpacity style={[styles.Button, styles.SecondRightButton]}>
                <Image
                    source={require('../../assets/icon/horiz.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>


            <View style={styles.middleContent}>

                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/profileTest/avatar.jpg')}
                        style={styles.avatar}
                    />
                </View>


                <Text style={styles.username}>Le Quyen</Text>
                <View style={styles.ButtonContainer}>

                    <TouchableOpacity style={[styles.photoButton, { marginLeft: -10 }]}>
                        <Image
                            source={require('../../assets/icon/img.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Ảnh của tôi</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.photoButton, { marginLeft: 10 }]}>
                        <Image
                            source={require('../../assets/icon/archive.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Kho Ảnh</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.wallContainer}>
                <Text style={styles.wallText}>Đây là nhật ký của bạn!</Text>
            </View>
            <View style={{alignItems:'center'}} >
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.TextButton}>Đăng lên nhật ký</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    Button: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    FisrtRightButton: {
        left: 'auto',
        right: 50,
    },
    SecondRightButton: {
        left: 'auto',
        right: 10,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    middleContent: {
        alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -50,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    photoButton: {
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        backgroundColor: '#fff',  // Màu nền của button
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    buttonText: {
        marginLeft:2,
        marginTop: 5,
        color: 'black',
        fontSize: 14,
    },
    wallContainer: {
        padding: 20,
    },
    wallText: {
        fontSize: 14,
    },
    icon: {
        width: 30,
        height: 30,
    },
    postButton: {
        width:200,
        height:40,
        borderRadius:20,
        backgroundColor: '#009bf8',
        paddingVertical: 15, 
    },
    TextButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
        marginTop:-5
    },
});

export default ProfileScreen;
