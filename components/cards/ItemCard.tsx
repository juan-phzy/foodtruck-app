import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

const { width } = Dimensions.get("window");

interface ItemCardProps {
    readonly item: {
        name: string;
        price: number;
        description?: string | undefined;
        imageUrl?: string | undefined;
    };
}

export default function ItemCard({ item }: ItemCardProps) {
    return (
        <View style={styles.rootContainer}>
            <View
                style={styles.textContainer}
            >
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flexDirection: "row",
        gap: "20@ms",
    },
    textContainer: {
        flex: 1,
        gap: "3@ms",
    },
    title: {
        fontSize: theme.fontSize.sm,
    },
    price: {
        fontSize: theme.fontSize.xs,
        fontWeight: "thin",
    },
    description: {
        fontSize: theme.fontSize.xxs,
    },
    image: {
        width: width * 0.3,
        height: "auto",
        resizeMode: "cover",
        borderTopRightRadius: "10@ms",
        borderBottomRightRadius: "10@ms",
    }

});
