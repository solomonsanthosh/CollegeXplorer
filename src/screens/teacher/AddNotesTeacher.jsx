import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button as PaperButton} from 'react-native-paper';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';

const AddNotesTeacher = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [notesDetails, setNotesDetails] = useState({
    teacherId: '60f3b3e3e6e4a5f8e4f3e3e3',
    title: 'title',
    className: 'IT',
    notes: '',
  });

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Allow PDF files only
      });

      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, do nothing
      } else {
        Alert.alert('Error', 'Failed to pick file');
      }
    }
  };

  const uploadToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.fileName,
      });
      formData.append('upload_preset', 'uzh1fvzq');
      formData.append('cloud_name', 'ds2mjvnjy');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/ds2mjvnjy/upload',
        formData,
      );

      if (response.data.secure_url) {
        // File uploaded successfully
        console.log('Uploaded URL:', response.data.secure_url);
      } else {
        throw new Error('Failed to upload file to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload file to Cloudinary');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.inputLabel, {textAlign: 'center'}]}>
        Add Food Product
      </Text>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Food Description</Text>
        <TextInput
          onChangeText={handleChange('productDescription')}
          placeholder="Enter Dish description"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={values.productDescription}
        />
        {touched.productDescription && errors.productDescription && (
          <Text style={styles.errorText}>{errors.productDescription}</Text>
        )}
      </View>
      <Button title="Select File" onPress={handleFilePicker} />
      {selectedFile && (
        <Text style={styles.selectedFileName}>{selectedFile.fileName}</Text>
      )}
      <PaperButton
        mode="contained"
        onPress={uploadToCloudinary}
        disabled={!selectedFile}
        style={styles.uploadButton}>
        Upload
      </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  selectedFileName: {
    fontSize: 16,
    marginVertical: 8,
  },
  uploadButton: {
    marginTop: 16,
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
});

export default AddNotesTeacher;
