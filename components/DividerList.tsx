import { StyleSheet, View, Text, FlatList } from "react-native";
import React from "react";
import theme from "@/theme/theme";

/* DividerList allows for any different components to be integrated because of 
generic type for item list */
interface DividerListProps<T> {
    text: string;
    list: T[];
    renderItem: ({ item }: { item: T }) => React.JSX.Element;
    keyExtractor: (item: T, index: number) => string;
}

const DividerList = <T,>({
    text,
    list,
    renderItem,
    keyExtractor,
}: DividerListProps<T>) => {
    return (
        <View style={styles.wholeContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
            <FlatList
                data={list}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wholeContainer: {
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "flex-start",
        borderRadius: 10,

        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,

        backgroundColor: "white",
        elevation: 5,

        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    textStyle: {
        color: theme.colors.primary,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
        width: "100%",
    },
    list: {
        flexGrow: 1,
        flexDirection: "row",
    },
    separator: {
       width: 10,
    },
});

export default DividerList;
