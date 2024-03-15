import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Create Accounts</Text>
          </View>

          <View style={styles.listContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateFoodShop')
              }}>
              <View style={[styles.card, {backgroundColor: '#B2DCC4'}]}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.freepik.com/512/9620/9620771.png',
                  }}
                  style={styles.cardImg}
                />
                <Text style={styles.cardLabel}>Create Cafe</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateStationeryShop')
              }}>
              <View style={[styles.card, {backgroundColor: '#F7C5BA'}]}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3238/3238057.png',
                  }}
                  style={styles.cardImg}
                />
                <Text style={styles.cardLabel}>Create Shop</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.listContent}>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateTeacher')
              }}>
              <View style={[styles.card, {backgroundColor: '#F7EDD0'}]}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/8065/8065183.png',
                  }}
                  style={styles.cardImg}
                />
                <Text style={styles.cardLabel}>Create Teacher</Text>
              </View>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** List */
  list: {
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: '#323142',
  },
  listAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listActionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#706f7b',
    marginRight: 2,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent : 'space-between',
  },
  /** Card */
  card: {
    width: 150,
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cardImg: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  cardLabel: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
    color: '#252117',
  },
});

export default AdminDashboard;
