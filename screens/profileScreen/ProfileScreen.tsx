import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import ArrowIcon from '../../assets/icon/ArrowIcon';
import axios from 'axios';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from "react-native-paper";
import { useQueryClient } from '@tanstack/react-query';

// import { launchImageLibrary } from 'react-native-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
const ProfileScreen = ({ navigation,route }) => {
    const [data, setData] = useState();
    const [coverPhoto, setCoverPhoto] = useState(require("../../assets/profileTest/wall3.jpg"));
    const [phoneNumber, setPhoneNumber] = useState('0929635572');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState();
    const [thumbnailAvatar, setThumbnailAvatar] = useState('');
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [showMoreInfor, setMoreInfor] = useState(false);
    const [showInformation, setInformation] = useState(false);
    const [editInformation, setEditInformation] = useState(false);
    const [canEditInformation, setCanEditInformation] = useState(false);
    const [click, setClick] = useState(false)
    const defaultAvatar = require('../../assets/profileTest/defaultAVT.jpg')
    const [coverImg, setCoverImg] = useState();
    const [profileData, setProfileData] = useState(null);
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
    // const clickMouse = () => {
    //     if (click === false) setClick(true);
    //     else setShowAvatarOptions(false)
    // };
    
    useEffect(() => {
        getUserProfile();
    }, [profileData]);

    useEffect(() => {
        if (route.params && route.params.updatedData) {
          setProfileData(route.params.updatedData);
        }
      }, [route.params]);
      const getUserProfile =  () => {
        

        try {
             axios.get('http://172.20.10.3:8080/api/v1/users/profile',{headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }})
             
             
             .then((res) => {
                const data = res.data;
                console.log('Thông tin người dùng:', data);
                setData(data);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setThumbnailAvatar(data.thumbnailAvatar);
                setBirthday(data.birthday);
                setGender(data.gender);
            }).catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    // const selectImage = async () => {
    //     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    //     if (permissionResult.granted === false) {
    //       alert('Permission to access camera roll is required!');
    //       return;
    //     }

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });

    //     if (!result.cancelled) {
    //         setThumbnailAvatar(result.uri);
    //     //   uploadImage(result.uri);
    //     }
    //   };

    // const uploadImage = async () => {
    //     try {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [1, 1],
    //             quality: 1,
    //         });

    //         // Kiểm tra xem người dùng đã chọn hình ảnh chưa
    //         if (!result.cancelled) {
    //             // Tạo FormData để chứa hình ảnh
    //             const formData = new FormData();
    //             formData.append('avatar', {
    //                 uri: result.uri,
    //                 name: 'avatar.jpg',
    //                 type: 'image/jpg',
    //             });

    //             // Gửi yêu cầu tải lên hình ảnh
    //             const response = await axios.post(
    //                 'http://192.168.1.9:8080/api/v1/user/profile/upload-avatar',
    //                 formData,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                     },
    //                 }
    //             );

    //             console.log('Upload avatar response:', response.data);
    //             setThumbnailAvatar(result.uri);
    //         } else {
    //             console.log('User cancelled image selection');
    //         }

    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }
    // };


    const handleViewAvatar = () => {
        setShowAvatarOptions(false);
    };

    const getGenderString = () => {
        return gender ? 'Nam' : 'Nữ';
    }
    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
            <Image
                source={coverPhoto}
                style={styles.coverPhoto}
            />

            {/* <TouchableOpacity style={styles.Button}>
                <ArrowIcon width={30} height={30} color="#1a1a1a" />
            </TouchableOpacity> */}

            <TouchableOpacity style={[styles.Button, styles.SecondRightButton]} onPress={() => setMoreInfor(true)}>
                <Image
                    source={require('../../assets/icon/horiz.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <View style={styles.middleContent}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={() => setShowAvatarOptions(true)}>
                        <Avatar
                            size={100}
                            rounded={true}
                            source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.username}>{firstName} {lastName}</Text>
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
            <View style={{ alignItems: 'center' }} >
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.TextButton}>Đăng lên nhật ký</Text>
                </TouchableOpacity>
            </View>

            {/* Modal hoặc component hiển thị tab nhỏ */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAvatarOptions}
                onRequestClose={() => setShowAvatarOptions(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleViewAvatar}>
                            <Text style={styles.optionText}>Xem ảnh đại diện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} >
                            <Text style={styles.optionText}>Đổi ảnh đại diện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => setShowAvatarOptions(false)}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'red',
                            }}>Hủy thao tác</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showMoreInfor}
                onRequestClose={() => setMoreInfor(false)}
            >
                <View style={styles.modalContainer2}>

                    <View style={styles.optionContainer2}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -25, marginTop: -5, paddingBottom: 20, color: '#1c70be' }}>{firstName} {lastName}</Text>
                        <TouchableOpacity style={styles.optionButton} onPress={() => {
                            setInformation(true)
                        } } >
                            <Text style={styles.optionText}>Thông tin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={()=>{
                            console.log(showInformation)
                        }}>
                            <Text style={styles.optionText}>Đổi ảnh đại diện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} >
                            <Text style={styles.optionText}>Đổi ảnh nền</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} >
                            <Text style={styles.optionText}>Cập nhật giới thiệu bản thân</Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: -25, marginTop: 5, paddingBottom: 20, color: "#1c70be" }}>Cài đặt</Text>
                        </View>
                        <TouchableOpacity style={styles.optionButton} >
                            <Text style={styles.optionText}>Quyền riêng tư</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>Quản lý tài khoản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} >
                            <Text style={styles.optionText}>Cài đặt chung</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => setMoreInfor(false)}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'red',
                            }}>Quay về trang cá nhân</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* MODAL THÔNG TIN */}
            <Modal
                visible={showInformation}
                animationType="slide"
                onRequestClose={() => setInformation(false)}>
                <View style={{flex:1, marginTop:20}}>
                    <View style={{}}>
                        <Image
                            source={coverPhoto}
                            style={styles.coverPhoto}
                        />
                        <TouchableOpacity style={[styles.Button, styles.FisrtRightButton]} onPress={() => setInformation(false)}>
                            <ArrowIcon width={30} height={30} color="#1a1a1a" />
                        </TouchableOpacity>
                        <View style={styles.avatarContainer2}>
                            <Avatar
                                size={70}
                                rounded={true}
                                source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                            />
                            <Text style={{ alignSelf: 'center', marginLeft: 15, fontSize: 20, fontWeight: 'bold', color:'white' }}>{firstName} {lastName}</Text>
                        </View>
                    </View>

                    <View style={styles.profileContainer}>
                        <Text style={{ fontSize: 16 }}>Thông tin cá nhân</Text>
                        <Text style={styles.profileText}>Giới tính:               {getGenderString()}</Text>
                        <Text style={styles.profileText}>Ngày sinh:            {birthday}</Text>
                        <View>
                            <Text style={styles.profileText}>Điện thoại:           {phoneNumber}</Text>
                        </View>
                        <TouchableOpacity style={{
                            width: 300,
                            height: 30,
                            borderRadius: 20,
                            backgroundColor: '#009bf8',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginLeft: -15
                        }} onPress={() => { navigation.navigate('DetailProfile', { data: data }), setMoreInfor(false), setInformation(false) }}>
                            <Text style={{ alignSelf: 'center', fontSize: 16 }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        
        </View>
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
        right: 10,
        zIndex: 1,
    },

    FisrtRightButton: {
        left: 10,
    },
    SecondRightButton: {
        right: 10,
        top: 20
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
    avatarContainer2: {
        marginTop: -80,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'flex-start',
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
        width:140,
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'gray',
        borderWidth: 1,
        justifyContent:'center'
    },
    buttonText: {
        marginLeft: 2,
        marginTop: 5,
        color: 'black',
        fontSize: 14,
    },
    wallContainer: {
        padding: 20,
    },
    wallText: {
        fontSize: 14,
        marginTop: -10,
        marginLeft:10
    },
    icon: {
        width: 30,
        height: 30,
    },
    postButton: {
        width: 200,
        height: 45,
        borderRadius: 20,
        backgroundColor: '#009bf8',
        paddingVertical: 15,
    },
    TextButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -5
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        height: '33%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContainer2: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        justifyContent: 'center',
    },
    optionContainer: {
        backgroundColor: '#fff',
        width: '98%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    optionContainer2: {
        backgroundColor: '#fff',
        width: '98%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: 4
    },
    optionButton: {
        backgroundColor: '#eee',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderBlockColor: 'black',
        borderWidth: 0.5
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    profileContainer: {
        marginTop: 20,
        marginLeft: 20
    },
    profileText: {
        fontSize: 15,
        paddingTop: 20,
        marginLeft: 10
    }
});

export default ProfileScreen;