import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function TeacherProfile() {
  const user = useSelector(state => state.user);

  const [userDetails, setUserDetails] = useState(user);

  const [form, setForm] = useState({
    name: userDetails.name,
    email: userDetails.email,
  });

  const sheet = useRef();

  const editProfile = () => {
    sheet.current.open();
  };

  const editProfileFunction = () => {
    try {
      axios
        .put(`http://192.168.1.8:8080/api/teacher/update/${user._id}`, form)
        .then(response => {
          sheet.current.close();
          setUserDetails(response.data);
          Alert.alert('Success', 'Profile updated successfully');
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#f6f6f6', paddingHorizontal: 15}}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Image
                alt=""
                source={{
                  uri:
                    userDetails.imageTeacher ||
                    'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg',
                }}
                style={styles.avatarImg}
              />

              <View style={styles.avatarNotification} />
            </View>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>{userDetails.name}</Text>

              <Text style={styles.profileSubtitle}>{userDetails.email}</Text>
            </View>
          </View>

          <Text style={styles.profileDescription}>
            Class Name :{' '}
            <Text style={{color: '#266EF1'}}>{userDetails.className}</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            editProfile();
          }}>
          <View style={styles.profileAction}>
            <Text style={styles.profileActionText}>Edit Profile</Text>
            <FeatherIcon color="#fff" name="edit-3" size={16} />
          </View>
        </TouchableOpacity>
      </View>
      <RBSheet
        customStyles={{container: styles.sheet}}
        height={360}
        openDuration={250}
        ref={sheet}>
        <View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={name => setForm({...form, name})}
              placeholder="Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              defaultValue={userDetails.name}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => setForm({...form, email})}
              placeholder="Email"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              defaultValue={userDetails.email}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              editProfileFunction();
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    backgroundColor: '#fff',
    padding: 24,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 20,
    fontWeight: '400',
    paddingVertical: 5,
    color: '#778599',
  },
  profileDescription: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  /** Avatar */
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  sheet: {
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
