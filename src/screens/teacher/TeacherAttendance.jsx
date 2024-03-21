import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const TeacherAttendance = () => {
  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    try {
      axios.get(`https://busy-ruby-snail-boot.cyclic.app/api/attendance/class/it`).then(res => {
        // console.log(res.data);
        setStudentsList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {studentsList.map((singleStudent, index) => {
        return (
          <View key={index} style={styles.card}>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{singleStudent.user.name}</Text>

              <Text style={styles.cardCategory}>
                {singleStudent.user.registerNumber}
              </Text>
              <Text style={styles.cardCategory}>{singleStudent.user.email}</Text>
            </View>

            {/* <Text style={styles.cardPrice}>{singleStudent.user.className}</Text> */}
            <Text style={styles.cardPrice}>{singleStudent.calculatedStatus}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default TeacherAttendance;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // shadow
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 12,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#131313',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f7f7f',
  },
  cardPrice: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: '700',
    color: '#2c9d3b',
  },
});
