import { StyleSheet, View, Text, FlatList } from "react-native";
import React from 'react';
import theme from "@/theme/theme";



interface DividerListProps<T> {
    text: string;
    list: T[];
    renderItem: ({ item }: { item: T }) => React.JSX.Element;
    keyExtractor: (item: T, index: number) => string;
}

const DividerList = <T,>({ text, list, renderItem, keyExtractor}: DividerListProps<T>) => {


    return (
        <View style={styles.wholeContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={list}
                    keyExtractor={keyExtractor} 
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    horizontal={true}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wholeContainer: {
        gap: 10,
        paddingVertical:20,
        paddingHorizontal:20,
        alignItems: "flex-start",

        borderRadius:10,

        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.25,  
        shadowRadius: 20, 

        backgroundColor: "white",
        elevation: 5,

        marginBottom:20
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    textStyle: {
        color: theme.colors.primary,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
        width: "100%"
    },
    listContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-start",
    },
    list:{
        flexGrow: 1,
        flexDirection:"row",   
    },
    separator:{
        marginRight: 20
    }
});

export default DividerList;