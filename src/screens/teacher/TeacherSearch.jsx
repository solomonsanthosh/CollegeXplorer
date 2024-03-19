import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

export default function TeacherSearch() {
  const [registerNumber, setRegisterNumber] = useState('');
  const [student, setStudent] = useState({});
  const user = useSelector(state => state.user);
  const getUserData = async id => {
    try {
      axios
        .get(
          `https://busy-ruby-snail-boot.cyclic.app/api/user/registerNumber/${registerNumber}`,
        )
        .then(response => {
          console.log(response.data, 'response');
          setStudent(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const isObjectEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const updateClassForUser = async (id, className) => {
    try {
      axios
        .put(`https://busy-ruby-snail-boot.cyclic.app/api/user/update/classname/${id}`, {
          className: className,
        })
        .then(response => {
          console.log(response.data, 'response');
          Alert.alert('Success', 'Class assigned successfully');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const assignClassToMe = async () => {
    Alert.alert('Assign Class', 'Do you want to assign this class to you?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          updateClassForUser(student._id, user.className);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FBFCFF'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSearch}>

            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Register Number"
              placeholderTextColor="#778599"
              onChangeText={text => {
                setRegisterNumber(text);
              }}
              style={styles.headerSearchInput}
            />
          </View>

          <View style={[styles.headerAction, {alignItems: 'flex-end'}]}>
            <TouchableOpacity
              onPress={() => {
                getUserData(registerNumber);
              }}>
              {/* <FeatherIcon name="more-vertical" size={24} /> */}
              <Text style={{color: '#fff'}}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {!isObjectEmpty(student) && (
            <TouchableOpacity
              style={styles.cardMain}
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.card}>
                <Image
                  alt=""
                  source={{
                    uri: student.userImage,
                  }}
                  style={styles.cardCover}
                />

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{student.name}</Text>

                  <Text style={styles.cardSubtitle}>
                    {student.registerNumber}
                  </Text>
                  <Text style={styles.cardSubtitle}>{student.email}</Text>
                </View>

                <View style={styles.cardAction}>
                  <TouchableOpacity onPress={assignClassToMe}>
                    <FeatherIcon
                      color="#6A6D70"
                      name="more-vertical"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: '#266EF1',
    color: '#fff',
    borderRadius: 10,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    color : "#000000",
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  cardMain: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cardCover: {
    width: 74,
    height: 74,
    borderRadius: 18,
    marginRight: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    fontWeight: '500',
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: 0.38,
    color: '#070b11',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#070b11',
    opacity: 0.6,
  },
  cardAction: {
    paddingHorizontal: 8,
  },
});
