import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button, Text, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {firebaseConfig} from '../../firebaseConfig'; // Make sure to import your Firebase config file
import {initializeApp} from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {useSelector} from 'react-redux';
import axios from 'axios';

const AddNotesTeacher = () => {
  const [selectedDocument, setSelectedDocument] = useState({});

  useEffect(() => {
    // Initialize Firebase app
    const firebaseApp = initializeApp(firebaseConfig);
  }, []);

  const user = useSelector(state => state.user);

  const createNotes = async (title, downloadLink) => {
    try {
      axios
        .post(`http://192.168.1.8:8080/api/notes/teacher/create`, {
          teacherId: user._id,
          title: title,
          className: user.className,
          notes: downloadLink,
        })
        .then(res => {
          Alert.alert('Success', 'Notes created successfully');
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to create notes');
    }
  };

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Allow only PDF files
      });
      handleUpload(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, do nothing
        console.log('User cancelled the picker');
      } else {
        Alert.alert('Error', 'Failed to pick document');
      }
    }
  };

  const handleUpload = async res => {
    if (!selectedDocument) {
      Alert.alert('Error', 'Please select a document');
      return;
    }
    console.log('Selected document:', res.name);

    try {
      console.log('Uploading document:', res.name);
      const storageRef = ref(getStorage(), `documents/${res.name}`);
      const uploadTask = uploadBytesResumable(storageRef, res.uri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // Track upload progress if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          // Handle unsuccessful uploads
          console.error('Upload error:', error);
          Alert.alert('Error', 'Failed to upload document');
        },
        async () => {
          // Handle successful uploads on complete
          console.log('Document uploaded successfully');
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          createNotes(res.name, downloadURL);
          console.log('Download URL:', downloadURL);
        },
      );
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload document');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload Document :</Text>
      {selectedDocument && (
        <Text style={{color: '#1e1e1e'}}>{selectedDocument.name}</Text>
      )}
      <Button title="Pick Document" onPress={handleDocumentPick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1e1e1e',
  },
});

export default AddNotesTeacher;
