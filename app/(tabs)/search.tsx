import { Text, View, StyleSheet, Image, Pressable, Dimensions,ScrollView} from "react-native";
import StrippedSearchBar from "@/components/StrippedSearchBar";
import SearchTruckCard from "@/components/SearchTruckCard"
import { CATEGORIES, FOOD_TRUCKS} from "@/constants";
import {useCallback} from 'react'
import DividerList from "@/components/DividerList";
import theme from "@/theme/theme"
import { FoodTruck } from "@/types";

const {width} = Dimensions.get("window");

export default function Search() {
   const renderItem = useCallback(
      ({ item }: { item: FoodTruck }) => <SearchTruckCard truck={item} />,
      []
    );

  return (
    <View style = {styles.wholeContainer}>
      <View style={styles.topContainer}>
        <StrippedSearchBar/>
      </View>
      <ScrollView style={styles.middleContainer}>
        <DividerList
              text="Search Categories"
              list={CATEGORIES}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                  <Pressable
                      style={styles.categoryButton}
                      onPress={null}
                  >
                      <Image source={{ uri: item.url }} style={styles.image} />
                      <Text style={styles.btnText}>{item.name}</Text>
                  </Pressable>
              )}
        />
        <DividerList
              text="Our Recommendations"
              list={FOOD_TRUCKS}
              keyExtractor={(truck) => truck.name}
              renderItem={renderItem}
        />
        <DividerList
              text="Top Rated"
              list={FOOD_TRUCKS}
              keyExtractor={(truck) => truck.name}
              renderItem={renderItem}
        />
        <DividerList
              text="On The Move"
              list={FOOD_TRUCKS}
              keyExtractor={(truck) => truck.name}
              renderItem={renderItem}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create(
  {
      wholeContainer:{
        flex: 1,
        flexDirection: "column",
        borderColor: "red",
        borderWidth: 5,

      },
      topContainer:{
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        borderColor: "green",
        borderWidth: 5,
      },

      middleContainer:{
        marginTop:150,
        gap: 10,
        padding: 10,
        flex: 1,
        borderColor: "purple",
        borderWidth: 5,
      },
      categoryButton: {
        position: "relative",
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 5,
        backgroundColor: theme.colors.primarySuperLight,

        
    },
    btnText: {
      color: theme.colors.black,
      fontSize: 10,
    },
    image: {
      width: "50%",
      height: "50%",
    },

  }
);