import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

const TeacherClass = () => {
  const user = useSelector(state => state.user);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://busy-ruby-snail-boot.cyclic.app/api/teacher/students/${user._id}`);
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <View style={styles.container}>
      {students.length === 0 && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: "#1e1e1e" }}>No students found</Text>
        </View>
      )}
      {students.map(student => (
        <TouchableOpacity
          key={student._id}
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
              <Text style={styles.cardSubtitle}>{student.registerNumber}</Text>
              <Text style={styles.cardSubtitle}>{student.email}</Text>
            </View>
            <View style={styles.cardAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon color="#6A6D70" name="more-vertical" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
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

export default TeacherClass;
