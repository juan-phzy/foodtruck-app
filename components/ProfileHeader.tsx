import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileHeaderProps {
    name: string;
    level: number;
    phoneNumber: string;
    email: string;
    progress: number;
}

const ProfileHeader = ({ name, level, phoneNumber, email, progress = 0.75 }: ProfileHeaderProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress, // Animate to current progress
      duration: 500, // Smooth transition
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const borderWidth = 5;
  const size = 60;
  const halfSize = size / 2;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileInfo}>
        <View style={styles.identityContainer}>
        {/* Circular Progress Indicator using border manipulation */}
        <View style={[styles.iconContainer, { width: size, height: size }]}>
          <Animated.View
            style={[
              styles.progressCircle,
              {
                borderWidth,
                width: size,
                height: size,
                borderRadius: halfSize,
                borderColor: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['lightgray', 'orange'],
                }),
              },
            ]}
          />
         

          {/* Profile Picture */}
          <View style={[styles.iconContainer, { width: size - borderWidth * 2, height: size - borderWidth * 2 }]}>
            <Text style={styles.iconLetter}>{name[0]}</Text>
          </View>
        </View>

        {/* Name and Level*/}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.levelText}>Munch Level: {level}</Text>
        </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
            <Text style={styles.settingsText}>Settings</Text>
        <Pressable>
          <Ionicons name="settings" size={24} color="orange" />
        </Pressable>
        </View>
        </View>

      {/* Contact Info */}
      <View style={styles.contactContainer}>
        <Text style={styles.labelText}>Phone Number</Text>
        <Text style={styles.infoText}>{phoneNumber}</Text>
        </View>
      <View style={styles.contactContainer}>
        <Text style={styles.labelText}>Email</Text>
        <Text style={styles.infoText}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({  
  headerContainer: { 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 373,
    height: 130,
    borderColor: "red",
    borderWidth: 1,
},

//Row 1
  profileInfo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    gap:"auto",
     paddingVertical: 10,
     borderColor: "blue",
     borderWidth: 1,
},
  identityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:10,
    width: 199,
    height: 60,
    borderColor: "yellow",
    borderWidth: 1,
  },

  //Icons
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor:"#944C00",
    borderColor: "green",
    borderWidth: 1,
  },
  iconLetter: { 
    fontSize: 32, 
    color: '#FFFFFF' },

    progressCircle: {
        position: 'absolute',
        borderRadius: 50,
        borderColor: '#FF8400',
      },
    

//Names
  nameContainer: {
    justifyContent:"flex-start",
    alignItems:"flex-start",
    width:129,
    height:34,
    borderColor: "purple",
    borderWidth: 1,
  },
  nameText: { 
    fontSize: 16, 
    color: '#000000',
    fontWeight: 'bold'
 },

 levelText:{
    fontSize: 12,
    color: '#000000',
  },

  //Settings
  settingsContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:5,
    borderColor: "orange",
    borderWidth: 1,
  },
  settingsText:{
    width:64, 
    height:19,
    fontSize: 16,
    color: '#FF8400',
  },
//Row 2 and Row 3
contactContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:375,
    height:25,
},

//Phone and Email Labels
labelContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:10,
    width:87,
    height:25,
    paddingVertical: 5,
},

labelText: { 
    fontWeight: 'bold',
    fontSize:12,
 },

//Phone and Email Texts
infoContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:10,
    width:92,
    height:25,
    paddingVertical: 5,
},
infoText: {
     fontSize: 12, 
     color: '#000000'
},
});

export default ProfileHeader;