// components/CategoryListContainer.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/assets/theme';

interface CategoryListContainerProps {
  title: string;
  icon: any;
  onPress: () => void;
}

const CategoryListContainer: React.FC<CategoryListContainerProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {  
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 110,
    opacity: 0.5,
    backgroundColor: 'rgba(255, 132, 0, 0.12)',   // opacity is 0.05 but did not matched the design
    //margin: 10,
    borderRadius: 10,
    //backgroundColor: '#FF8400',
    //shadowColor: '#000',
    //shadowOpacity: 0.1,
    //shadowRadius: 5,             
    //elevation: 3,
  },
  logo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.primary,
    opacity: 1,
    //backgroundColor: '#FF8400',
  },
  title: {
    flexDirection: 'column',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8400',
    opacity: 1,
    //backgroundColor: '#FF8200',
  }
});

export default CategoryListContainer;