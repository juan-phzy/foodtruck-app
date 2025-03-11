import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";

interface FoodTruckContainerProps {
  title: string;
  description: string;
  progress: number;
}

const FoodTruckContainer = ({ title, description, progress }: FoodTruckContainerProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Image source={require("@/assets/images/achievements.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressText}>
            <Text style={styles.progressNumber}>{progress}%</Text>
          </View>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,                  
    width: 373,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    gap: 5,
    marginBottom: 5,
    marginTop: 5,
    //elevation: 3,
    //backgroundColor: '#FF8400',
  },
  badge: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: '#FF8400',
  },
  textContainer: {
    height: 51,
    width: 308,
    flex: 1,
    //backgroundColor: '#FF8400',
  },
  title: {
    fontSize: 11,
    height: 17,
    width: 142,
    fontWeight: "bold",
    paddingVertical: 2,
    color: "black",
  },
  description: {
    height: 12,
    width: 105,
    fontSize: 10,
    color: "black",
    marginBottom: 8,
  },
  progressContainer: {
    height: 12,
    width: 308,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    //backgroundColor: '#FF8400',
  },
  progressBar: {
    height: 8,
    width: 277,
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    gap: 10,
    borderRadius: 10,
    overflow: "hidden",
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
  progress: {
    flex: 1,
    height: 4,
    borderRadius: 10,
    gap: 10,
    backgroundColor: "#FF8400",
  },
  progressText: {
    height: 14,
    width: 26,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  progressNumber:{
    paddingBottom: 2,
    fontSize: 10,
    color: "#FF8400"
  },
  divider: {
    height: 1,
    width: 373,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    //backgroundColor: '#FF8400',
    //marginVertical: 5,
  },
});

export default FoodTruckContainer;