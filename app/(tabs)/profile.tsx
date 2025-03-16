// app/(tabs)/profile.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';


// DO NOT USE RELATIVE IMPORTS ALWAYS USE @

const achievements = [
  { id: '1', title: 'The Start of Your Journey!', description: 'Visited your first truck', progress: 90.0 },
  { id: '2', title: 'Explorer', description: 'Visited 5 food trucks', progress: 55.0 },
  { id: '3', title: 'Newbie', description: 'Visited 10 food trucks', progress: 70.0 },
];

const Profile = () => {
  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>Profile Page</Text>*/}
      <View style={{height:50}}></View>

      <ProfileHeader 
        name='Juan'
        level={1}
        phoneNumber='123-456-7890'
        email='juan@gmail.com'
        progress={0.75}
      />

      {/* <View style={styles.krinalcontainer}>
        <View style={styles.categoryContainer}>
          <View style={styles.rowContainer}>
            <CategoryListContainer
              title="Favorites"
              icon="bookmark-outline"
              onPress={() => console.log('Favorites pressed')}
            />
            <CategoryListContainer
              title="Recently Viewed"
              icon="time-outline"
              onPress={() => console.log('Recently Viewed pressed')}
            />
          </View>
          <View style={styles.rowContainer}>
            <CategoryListContainer
              title="Your Ratings"
              icon="star-outline"
              onPress={() => console.log('Your Ratings pressed')}
            />
            <CategoryListContainer
              title="Favorite Categories"
              icon="restaurant-outline"
              onPress={() => console.log('Favorite Categories pressed')}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <FlatList
            //style={styles.list}
            data={achievements}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FoodTruckContainer title={item.title} description={item.description} progress={item.progress} />
            )}
          />
        </View> 
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 0,
    backgroundColor: '#FFFFFF',
  },
  krinalcontainer: {
    flexDirection: 'column',
    paddingTop: 200,
    paddingRight: 10,
    paddingLeft: 10,
    //paddingBottom: 20,
    flex: 1,
    width: 393,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    gap: 10,
    borderColor: 'red',
    borderWidth: 5,
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', 
    alignItems: 'flex-start',
    //flex: 1,
    height: 230,
    width: 373,
    //paddingBottom: 90,
    //flex: 1,
    //opacity: 1,
    gap: 10,
    //flexBasis: 100,
    //alignItems: 'baseline',
    //paddingRight: 20,
    //paddingLeft: 10,
    //gap: 1,
    //backgroundColor: '#FF8400',
    //margin: 30,
    borderColor: 'blue',
    borderWidth: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    //flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 373,
    height: 110,
    //padding: 10,
    //backgroundColor: '#FF8400',
    //paddingRight: 10,
    //paddingLeft: 10,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    flexDirection: 'column',
    //marginTop: 20,
    //backgroundColor: '#FF8400',
    width: '100%',
    height: 277,
    justifyContent: 'center',
    gap: 5,
    //alignItems: 'flex-end',
    //height: 100,
    //padding: 10,
    flexWrap: 'wrap',
    borderColor: 'green',
    borderWidth: 5,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    height: 34,
    fontWeight: 'bold',
    padding: 5,
    //marginVertical: 20,
    //backgroundColor: "#FF8400",
  },
  list:{
    //backgroundColor: '#FF8400',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex:1,
  },
  divider: {
    height: 1,
    width: 373,
    flexDirection: 'row',
    //flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    //width: "100%",
    //paddingVertical: 2,
    //padding: 1,
    //marginLeft: 5,
    //marginRight: 10,
    //backgroundColor: '#FF8400',
    //marginVertical: 5,
  },
});

export default Profile;