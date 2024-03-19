import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const TeacherNotes = () => {
  const user = useSelector(state => state.user);

  const [notes, setNotes] = useState([]);

  const navigation = useNavigation();

  const deleteButton = id => {
    Alert.alert(
      'Delete Food',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteNote(id),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteNote = async notesId => {
    try {
      axios.delete(`https://busy-ruby-snail-boot.cyclic.app/api/notes/teacher/${notesId}`);
      console.log('Note deleted', notesId);
      const updatedNotes = notes.filter(note => note._id !== notesId);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (!user) {
    //   navigation.navigate('LoginScreen');
    // }
    try {
      axios
        .get(
          `https://busy-ruby-snail-boot.cyclic.app/api/notes/teacher/${user._id}`,
        )
        .then(res => {
          setNotes(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {notes.map(note => (
        <TouchableOpacity
          key={note._id}
          style={styles.cardMain}
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.card}>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{note.title}</Text>
              <Text style={styles.cardSubtitle}>{note.className}</Text>
            </View>
            <View style={styles.cardAction}>
              <TouchableOpacity
                onPress={() => {
                  deleteButton(note._id);
                }}>
                <FeatherIcon color="#6A6D70" name="more-vertical" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddNotesTeacher')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeacherNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  cardMain: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 10,
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
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
