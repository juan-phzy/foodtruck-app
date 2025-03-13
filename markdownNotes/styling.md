# Best Practices for React Native Styling

This document outlines best practices for styling in React Native, focusing on efficient workflows, leveraging Flexbox for layout, component styling, debugging techniques, and handling sizing. It also provides recommendations for using `react-native-size-matters` and the built-in `Dimensions` API.

---

## Table of Contents

-   [Workflow & Organization](#workflow--organization)
-   [Flexbox Layout](#flexbox-layout)
-   [Component Creation](#component-creation)
-   [Debugging Styles](#debugging-styles)
-   [Sizing Techniques](#sizing-techniques)
-   [Using react-native-size-matters](#using-react-native-size-matters)
-   [Using Dimensions API](#using-dimensions-api)
-   [Additional Tips & Resources](#additional-tips--resources)

---

## Workflow & Organization

-   **Define a StyleSheet w/ react-native-size-matters:**  
    DO NOT utilize in-line styling. Use `ScaledSheet.create({})` to define styles **outside** of your render methods. This approach enhances performance and maintainability while automatically scaling by using @ms, @s, @vs, etc. from react-native-size-matters. Each tsx page must have its own `ScaledSheet` stylesheet.

    ```tsx
    // ScaledSheet Import
    import { ScaledSheet } from "react-native-size-matters";
    import { View, Text } from "react-native";

    // Functional Component
    export default function Test() {
        return (
            <View style={styles.container}>
                <Text style={styles.textScaled}>Scaled Text</Text>
                <Text style={styles.text}>Regular Text</Text>
            </View>
        );
    }

    // Scaled StyleSheet
    const styles = ScaledSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        textScaled: {
            fontSize: "20@ms", // Scaled Syntax
        },
        text: {
            fontSize: 20, // Regular Unscaled Syntax
        },
    });
    ```

-   **Style Organization:**  
    Organize styles in chronological order as they appear top-down within your tsx. Always start by defining the outermost container and working your way in. Focus on one section at a time. Apply highly visible borders to all Views you create to ensure correct sizing and layout.

    ```tsx
    import { ScaledSheet } from "react-native-size-matters";
    import { View } from "react-native";

    export default function Test() {
        return (
            // Goes from firstStyle to thirdStyle top-down
            <View style={styles.firstStyle}>
                <View style={styles.secondStyle}></View>
                <View style={styles.thirdStyle}></View>
            </View>
        );
    }

    const styles = ScaledSheet.create({
        // Also goes from firstStyle to thirdStyle top-down
        firstStyle: {
            flex: 1,
            borderColor: "red",
            borderWidth: 10,
        },
        secondStyle: {
            flex: 1,
            backgroundColor: "orange",
            borderColor: "yellow",
            borderWidth: 5,
        },
        thirdStyle: {
            flex: 1,
            backgroundColor: "green",
            borderColor: "blue",
            borderWidth: 5,
        },
    });
    ```

-   **Naming Conventions:**  
    Adopt clear and consistent naming for style objects (e.g., `container`, `header`, `buttonPrimary`).
-   **Theme Management:**  
    Maintain and use our centralized theme file for colors to ensure consistency. DO NOT hard code colors into your stylesheet. The only exception to this is Linear Gradient color styling. Linear Gradients will be done with in-line styling for now. To use our themes import the following:
    ```tsx
    import theme from "@/theme/theme";
    .
    .
    .
    const styles = ScaledSheet.create({
      randomStyle: {
        backgroundColor: theme.colors.primary,
      }
    })
    ```

---

## Flexbox Layout

-   **Embrace Flexbox:**  
    React Native uses Flexbox by default. Familiarize yourself with properties like `flexDirection`, `justifyContent`, `alignItems`, and `flex`.
-   **Default Flex Direction:**  
    Remember that the default flex direction is `column`, which is different from web development. This means that views will be stacked on top of each other. **You must still include the flex-direction attribute** even if you're keeping it as column. This is for others to easily debug your layout.
-   **Conditional Styling:**
    The only exception to the no in-line styling rule is when writing conditionals within the styling to toggle different styles.

    ```tsx
    // Example showing flexDirection & conditional styling
    import { ScaledSheet } from "react-native-size-matters";
    import { Text, TouchableOpacity, View } from "react-native";
    import { useState } from "react";
    import theme from "@/theme/theme";

    export default function Test() {
        const [direction, setDirection] = useState<boolean>(true);

        return (
            <View
                style={[
                    styles.mainContainer,
                    { flexDirection: direction ? "column" : "row" },
                ]}
            >
                <View style={styles.topSection}></View>
                <View style={styles.middleSection}>
                    <Text style={styles.textStyle}>
                        This is flexDirection: {direction ? "column" : "row"}
                    </Text>
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity onPress={() => setDirection(!direction)}>
                        <Text style={styles.textStyle}>
                            Click To Change Direction
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const styles = ScaledSheet.create({
		// The main container will switch from column to row
        mainContainer: {
            flex: 1,
            borderColor: "red",
            borderWidth: 10,
        },
		// Below are all the children views of the main container
        topSection: {
            flex: 1,
            backgroundColor: "orange",
            borderColor: "yellow",
            borderWidth: 5,
        },
        middleSection: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            borderColor: "blue",
            borderWidth: 5,
        },
        textStyle: {
            fontSize: "15@ms", // using moderate scale for text
            color: theme.colors.white, // using theme for color
            fontWeight: "bold",
        },
        bottomSection: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "purple",
            borderColor: "black",
            borderWidth: 5,
        },
    });
    ```
-   **Responsive Layouts:**  
    Utilize flex values or percentages to create layouts that adapt to different screen sizes.
-   **Minimize Nesting:**  
    Avoid excessive nested Views to simplify layout structures and improve performance.

---

## Component Creation

-   **Reusable Components:**  
    Build self-contained components with their own styles to promote reusability and easier testing.
-   **Separation of Concerns:**  
    Separate presentation from business logic by importing shared style objects or passing styles as props.
-   **Dynamic Styling:**  
    Merge styles conditionally using an array syntax:

    ```jsx
    <View style={[styles.container, isActive && styles.activeContainer]}>
        {/* Content goes here */}
    </View>
    ```

-   **Platform-Specific Styles:**  
    Use the `Platform` API to apply conditional styles for iOS and Android:

    ```jsx
    import { Platform, StyleSheet } from "react-native";

    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            ...Platform.select({
                ios: { fontFamily: "Avenir" },
                android: { fontFamily: "Roboto" },
            }),
        },
    });
    ```

---

## Debugging Styles

-   **React Native Debugger & Flipper:**  
    Leverage these tools to inspect element styles and view the component hierarchy.
-   **Remote JS Debugging:**  
    Use remote debugging to identify performance issues or unexpected style behaviors.
-   **Hot Reloading:**  
    Utilize hot reloading to see live changes as you modify style files.
-   **Built-In Inspector:**  
    Access the inspector (via a device shake or development menu) to verify layout boundaries and applied style properties.
-   **Logging Styles:**  
    Temporarily log style objects to troubleshoot and identify the source of styling issues.

---

## Sizing Techniques

### Using react-native-size-matters

-   **Purpose:**  
    This library simplifies scaling sizes, margins, paddings, and fonts based on device dimensions.
-   **Key Functions:**
    -   `scale(size)`: Scales size horizontally.
    -   `verticalScale(size)`: Scales size vertically.
    -   `moderateScale(size, factor?)`: Applies moderate scaling, reducing drastic changes.
-   **Example Usage:**

    ```jsx
    import {
        scale,
        verticalScale,
        moderateScale,
    } from "react-native-size-matters";
    import { StyleSheet } from "react-native";

    const styles = StyleSheet.create({
        container: {
            padding: moderateScale(10),
        },
        text: {
            fontSize: scale(16),
        },
        image: {
            width: scale(100),
            height: verticalScale(100),
        },
    });
    ```

-   **Best Practice:**  
    Use these scaling functions for any UI element sizes to maintain a consistent look across various devices.

### Using Dimensions API

-   **Purpose:**  
    The Dimensions API provides the device window's dimensions, helping you create responsive designs.
-   **Usage Example:**

    ```jsx
    import { Dimensions, StyleSheet } from "react-native";

    const { width, height } = Dimensions.get("window");

    const styles = StyleSheet.create({
        container: {
            width: width * 0.9, // 90% of screen width
            height: height * 0.1, // 10% of screen height
        },
    });
    ```

-   **Best Practices:**

    -   **Avoid Hard-Coding:**  
        Use calculated values from `Dimensions` or percentages rather than fixed values.
    -   **Orientation Changes:**  
        Listen for dimension changes to update your styles if your app supports different orientations:

        ```jsx
        Dimensions.addEventListener(
            "change",
            ({ window: { width, height } }) => {
                // Update your state or re-calculate styles as needed
            }
        );
        ```

---

## Additional Tips & Resources

-   **Test Across Devices:**  
    Regularly test on multiple devices and screen sizes to ensure consistent styling.
-   **Design Systems:**  
    Consider implementing a design system or using a UI library for consistent styling.
-   **Stay Updated:**  
    Keep up with React Native's official documentation and community best practices.

---

This guide serves as a solid foundation for effective and responsive styling in React Native. Adapt these practices to suit your project’s needs and evolve them as the ecosystem grows.
