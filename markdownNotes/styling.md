# Best Practices for React Native Styling

This document outlines best practices for styling in React Native, focusing on efficient workflows, leveraging Flexbox for layout, component styling, debugging techniques, and handling sizing. It also provides recommendations for using `react-native-size-matters` and the built-in `Dimensions` API.

**Every tsx snippet here can be tested in the TEST.TSX PAGE within our app**

# Table of Contents

1.  [Styling Base Setup](#styling-base-setup)

    -   [Define a ScaleSheet StyleSheet](#define-a-stylesheet-with-react-native-size-matters)
    -   [Style Organization](#style-organization)
    -   [Naming Conventions](#naming-conventions)
    -   [Theme Management](#theme-management)

2.  [Flexbox Layout](#flexbox-layout)

    -   [Necessary Properties](#necessary-properties)
    -   [Default Flex Direction](#default-flex-direction)
    -   [Conditional Styling To Show Flex Direction](#conditional-styling-flex-direction-example)
    -   [Flex Alignment & Wrap](#flex-alignment--wrap)
    -   [Flex Gaps](#flex-gaps)

3.  [Sizing & Spacing](#sizing--spacing)
    -   [Width](#width)
    -   [Width Code Example](#width-code-example)
    -   [Height](#height)
    -   [Height Code Example](#height-code-example)
    -   [Padding & Margin](#padding--margin)

[Containers, Parents, & Children](#container-parents-and-children)

<br>

# Styling Base Setup

## Define a StyleSheet with react native size matters

[Back to table of contents](#table-of-contents)

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

## Style Organization

[Back to table of contents](#table-of-contents)

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

## Naming Conventions

[Back to table of contents](#table-of-contents)

Adopt clear and consistent naming for style objects (e.g., `container`, `header`, `buttonPrimary`). An example for a standard page would be:

```
// For the purpose of the naming example,
// instead of <View style={styles.mainContainer}></View>
// it will just be <mainContainer>

<mainContainer>

    <topSection>
        <headerStyle />
    </topSection>

    <middleSection>
        <bodyText />
    </middleSection>

    <bottomSection>
        <footerStyle />
    </bottomSection>

</mainContainer>
```

As seen above, ALL style names must be relevant to what they actually are. Do not name things arbitrarily.

## Theme Management

[Back to table of contents](#table-of-contents)

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

# Flexbox Layout

## Necessary Properties

[Back to table of contents](#table-of-contents)

React Native uses Flexbox by default.
You must familiarize yourself with properties like:

-   `flex`
-   `flexDirection`
-   `justifyContent`
-   `alignItems`
-   `flexWrap`
-   `alignContent`

## Default Flex Direction

[Back to table of contents](#table-of-contents)

Remember that the default flex direction is `column`, which is different from web development. This means that views will be stacked on top of each other. **You must still include the flex-direction attribute** for any view with multiple children even if you're keeping it as column. This is for others to easily debug your layout. The options for flexDirection are:

-   `"column"` (default)
-   `"column-reverse"`
-   `"row"`
-   `"row-reverse"`

To take up the entire space available along the primary axis use `flex: 1`

## Conditional Styling Flex Direction Example

[Back to table of contents](#table-of-contents)

An exception to the no in-line styling rule is when writing conditionals within the styling to toggle different styles. This example will show the difference between `flex-column` and `flex-row`.

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

## Flex Alignment & Wrap

[Back to table of contents](#table-of-contents)

You must define the alignment of your elements along their primary and cross axes when creating any layouts. These axes are perpendicular to each other forming a cross in the center of the element. If you have many elements within a container that might overflow, you can also apply a flex-wrap. Finally, if you do have many elements that are wrapped, you will then need to define an alignContent attribute which will act similar to alignItems:

<p style="display:flex">
  <img src="https://www.joshwcomeau.com/images/interactive-guide-to-flexbox/flex-column.svg" style="flex: 1; max-width: 100%;" />
  <img src="https://www.joshwcomeau.com/images/interactive-guide-to-flexbox/flex-row.svg" style="flex: 1; max-width: 100%;" />
</p>

To take up the entire space available along the primary axis use `flex: 1`

1. **justifyContent**: This will align the children of your element among the element's PRIMARY axis. For example, an element with a flex-direction of column will have a vertical PRIMARY axis starting at the top and ending at the bottom. Likewise, a flex-direction of row will result in a horizontal PRIMARY axis starting from the left and ending on the right. The options for this are:

    - `"flex-start"` (default)
    - `"flex-end"`
    - `"center"`
    - `"space-between"`
    - `"space-around"`
    - `"space-evenly"`

2. **alignItems**: This will align the children of your element among the element's CROSS axis. For example, an element with a flex-direction of column will have a horizontal CROSS axis starting at the left and ending at the right. Likewise, a flex-direction of row will result in a vertical CROSS axis starting from the top and ending on the bottom. If there are multiple primary axes such as in flex-wrap, then alignItems will still adjust each individual CROSS axis within its designated space rather than the entire group of elements. The options for this are:

    - `"stretch"` (default)
    - `"flex-start"`
    - `"flex-end"`
    - `"center"`
    - `"baseline"`

3. **flexWrap**: This will wrap elements to the next line of the primary axis. If the initial primary axis overflows, it will keep adding more primary axes until all elements fit. If flexWrap is active, alignItems WILL NOT work. You must use alignContent instead. The options for flexWrap are:

    - `"nowrap"` (default)
    - `"wrap"`
    - `"reverse-wrap"`

4. **alignContent**: This will align groups of primary axes along the CROSS AXIS of an element if it is set to wrap its children. This attribute will not work if the element is set to nowrap. You can think about this like alignItems except it's for the entire group of elements, not just one axis. It will target all primary axes and move them together.

    - `undefined` (default)
    - `"flex-start"`
    - `"center"`
    - `"flex-end"`
    - `"space-between"`
    - `"space-around"`
    - `"stretch"`
    - `"space-evenly"`

[Back to table of contents](#table-of-contents)

```tsx
// FLEX ALIGNMENT INTERACTIVE EXAMPLE

import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

// Options for flexbox properties
const flexDirections: ("column" | "row" | "column-reverse" | "row-reverse")[] =
    ["column", "column-reverse", "row", "row-reverse"];
const justifyContentOptions: (
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
)[] = ["flex-start", "center", "flex-end", "space-between", "space-around"];
const alignItemsOptions: (
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "baseline"
)[] = ["flex-start", "center", "flex-end", "stretch", "baseline"];
const flexWrapOptions: ("nowrap" | "wrap" | "wrap-reverse")[] = [
    "nowrap",
    "wrap",
    "wrap-reverse",
];
const alignContentOptions: (
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "stretch"
    | "space-evenly"
    | undefined
)[] = [
    undefined,
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "stretch",
    "space-evenly",
];

export default function Test() {
    // State indices to cycle through our options
    const [directionIndex, setDirectionIndex] = useState(0);
    const [justifyIndex, setJustifyIndex] = useState(0);
    const [alignIndex, setAlignIndex] = useState(0);
    const [wrapIndex, setWrapIndex] = useState(0);
    const [alignContentIndex, setAlignContentIndex] = useState(0);

    const toggleDirection = () =>
        setDirectionIndex((prev) => (prev + 1) % flexDirections.length);
    const toggleJustify = () =>
        setJustifyIndex((prev) => (prev + 1) % justifyContentOptions.length);
    const toggleAlign = () =>
        setAlignIndex((prev) => (prev + 1) % alignItemsOptions.length);
    const toggleWrap = () =>
        setWrapIndex((prev) => (prev + 1) % flexWrapOptions.length);
    const toggleAlignContent = () =>
        setAlignContentIndex((prev) => (prev + 1) % alignContentOptions.length);

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Top Section showing currently selected styles*/}
                <View style={styles.topSection}>
                    <Text style={styles.textStyle}>
                        flexDirection: {flexDirections[directionIndex]}
                    </Text>
                    <Text style={styles.textStyle}>
                        justifyContent(Primary Axis):{" "}
                        {justifyContentOptions[justifyIndex]}
                    </Text>
                    <Text style={styles.textStyle}>
                        alignItems(Cross Axis): {alignItemsOptions[alignIndex]}
                    </Text>
                    <Text style={styles.textStyle}>
                        flexWrap: {flexWrapOptions[wrapIndex]}
                    </Text>
                    <Text style={styles.textStyle}>
                        alignContent: {alignContentOptions[alignContentIndex]}
                    </Text>
                </View>

                {/* A container with boxes to demonstrate flexWrap */}
                <View
                    style={[
                        styles.boxContainer,
                        {
                            flexDirection: flexDirections[directionIndex],
                            justifyContent: justifyContentOptions[justifyIndex],
                            alignItems: alignItemsOptions[alignIndex],
                            flexWrap: flexWrapOptions[wrapIndex],
                            alignContent:
                                alignContentOptions[alignContentIndex],
                        },
                    ]}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <Text key={num} style={styles.box}>
                            {num}
                        </Text>
                    ))}
                </View>

                {/* Bottom section with buttons to toggle the properties */}
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        onPress={toggleDirection}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Toggle Flex Direction
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleJustify}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Toggle Justify Content
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleAlign}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Toggle Align Items
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleWrap}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Toggle Flex Wrap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleAlignContent}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Toggle Align Content
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
    },
    topSection: {
        padding: "10@s",
    },
    textStyle: {
        fontSize: "15@ms",
        fontWeight: "bold",
    },
    boxContainer: {
        flex: 1,
        borderColor: "red",
        borderWidth: 10,
        overflow: "hidden",
    },
    box: {
        padding: "15@s",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: "20@ms",
        color: theme.colors.white,
        backgroundColor: "black",
        margin: "5@s",
    },
    bottomSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "5@s",
        padding: "10@s",
    },
    button: {
        flex: 1,
        height: "100%",
        backgroundColor: "white",
        padding: "5@s",
        borderRadius: "5@s",
        borderColor: "black",
        borderWidth: "1@s",
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: "12@ms",
    },
});
```

## Flex Gaps

[Back to table of contents](#table-of-contents)

Elements usually need a little space to breathe to create a user friendly environment that's visually appealing. Instead of relying on padding or margin, you should always use gap to provide EVEN spacing BETWEEN groups of elements. If you are worried about the OUTER spacing of a GROUP of elements, then margin or padding would be more appropriate.

To create gaps between elements you can use:

-   `gap: x`
-   `rowGap: x`
-   `columnGap: x`

where x is any numerical value. Use `rowGap` and `columnGap` instead of just `gap` if you need the spacing to be different vertically and horizontally. As a reminder, make sure to use react-native-size-matters syntax for any numerical values in your styles.

For example: `gap: "10@ms"`

# Sizing & Spacing

## Width

[Back to table of contents](#table-of-contents)

The width of your Views and elements is one of the most important attributes to set correctly. In this section I will go over different scenarios and the best choice for your width in each.

1. **Main Container:**
   Within the root container for your page, the width should usually always be `"100%"`. You want to maximize the usage of the screen and then set padding so that the children don't actually touch the edges. Setting the width to `"100%"` also allows your rendering to be fluid and adjust to any device's screen size.
2. **General Width:**
   Besides the Main Container, in general, the width for most containers with multiple children should be set to `"100%"`. This creates big blocky layouts within your page or component that you can clearly see. This then allows you to use flex alignment to position the children of your container blocks anywhere within. Another reason as to why this is preferred is because the position of each child within its parent is always relative unless you specifiy it to be absolute for unique cases. So since the size of the device varies, the parent width varies too, and the children should be relative and resize to match it. This is achieved with `width: "100%"`.
3. **Let Flex Handle It**:
   Sometimes, setting the width property is not necessary. In any element, if not changed, the default `flexDirection` will be `column` and the default `alignItems` will be `stretch`. So to make the width take up the entire width of the parent, you literally need to do nothing. Flex handles it. If you switch the `flexDirection` to `row` though, you will need to set the element to `flex: 1` so that it takes up the entire available space on the horizontal primary axis. This is the one exception where the numerical value **should not** be scaled. `flex: 1` should be left as is, **it should not** be `flex: "1@s"`. You should let flex handle your width for any element, view, or component that **does not** act as a container. The small children within containers should have their width be set by flex so that it is fluid and responsive. Despite this, there will be various scenarious where these customs don't always fit in. As you gain experience, you'll gain better judgement on when to use the width property, flex properties, or combine both. If you ever have a confusion situation, just ask me and I'll show you what the correct approach would be.
4. **By Design:**
   Any other width that is not 100%, handled by `flex: 1`, or `alignItems: "stretch"` is set by design. Depending on the figma layout and how _it should_ look, that is usually what you will set the width to. This can either be a percentage such as `width: "80%"` or it can be a numerical value such as `width: "30@s"`. Remember that any numerical value must be scaled with the react-native-size-matters syntax, hence the _@s_.
5. **Using Dimensions:**
   Besides using react-native-size-matters, if you want pinpoint accurate ratios of component width to **screen size**, you should use Dimensions. Do not confuse the width of the parent to the width of the screen. The only component that has natural access to screen's width is the root view. With Dimensions, you can extract the width of the device screen before the functional component and use it anywhere within your tsx, that be your stylesheet or your inline components. For example, if you want the width to be half of the screen, you would extract the variable width, divide it by two, and set it as the width of any style you need. Likewise, you can create any ratio based off the screen width using a little bit of math and the width variable. Using dimensions is the best option when you need the size to appear exactly the same among all devices.

## Width Code Example

[Back to table of contents](#table-of-contents)

```tsx
import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const { width: screenWidth } = Dimensions.get("window");

export default function WidthExamples() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 1. Main Container: Use width "100%" to maximize screen usage */}
            <Text style={styles.heading}>Main Container (width: "100%")</Text>
            <View style={styles.mainContainer}>
                <Text style={styles.text}>
                    This container uses width: "100%" with inner padding.
                </Text>
            </View>

            {/* 2. General Width: Multiple children container with width "100%" */}
            <Text style={styles.heading}>General Width (width: "100%")</Text>
            <View style={styles.generalContainer}>
                <Text style={styles.text}>Child 1</Text>
                <Text style={styles.text}>Child 2</Text>
            </View>

            {/* 3. Let Flex Handle It: In a row, use flex: 1 to fill available space */}
            <Text style={styles.heading}>
                Let Flex Handle It (flex: 1 for row layout)
            </Text>
            <View style={styles.flexContainer}>
                <View style={styles.flexChild}>
                    <Text style={styles.text}>
                        Flex Child fills available width
                    </Text>
                </View>
            </View>

            {/* 4. By Design: Custom width values */}
            <Text style={styles.heading}>
                By Design (custom percentage or scaled width)
            </Text>
            <View style={styles.byDesignPercentage}>
                <Text style={styles.text}>80% container width</Text>
            </View>
            <View style={styles.byDesignFixed}>
                <Text style={styles.text}>Fixed scaled width (250@s)</Text>
            </View>

            {/* 5. Using Dimensions: Calculated width based on screen size */}
            <Text style={styles.heading}>
                Using Dimensions (half of screen width:{" "}
                {Math.round(screenWidth / 2)})
            </Text>
            <View style={styles.dimensionsContainer}>
                <Text style={styles.text}>
                    This container is half the screen width.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: "20@s",
    },
    heading: {
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.1)",
        textAlign: "center",
        fontSize: "15@ms",
        fontWeight: "bold",
        paddingVertical: "5@s",
        marginTop: "10@s",
    },
    mainContainer: {
        width: "100%",
        backgroundColor: "#f8c291",
        padding: "10@s",
    },
    text: {
        fontSize: "14@ms",
        textAlign: "center",
        borderColor: "red",
        borderWidth: 1,
    },
    generalContainer: {
        width: "100%",
        backgroundColor: "#82ccdd",
        padding: "10@s",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    flexContainer: {
        flexDirection: "row",
        backgroundColor: "green",
        padding: "10@s",
    },
    flexChild: {
        flex: 1,
        backgroundColor: "#f6e58d",
        padding: "10@s",
    },
    byDesignPercentage: {
        width: "80%", // Custom width by percentage
        backgroundColor: "#ffbe76",
        padding: "10@s",
    },
    byDesignFixed: {
        width: "250@s", // Custom fixed, scaled width
        backgroundColor: "#e056fd",
        padding: "10@s",
    },
    dimensionsContainer: {
        width: screenWidth / 2,
        backgroundColor: "#686de0",
        padding: "10@s",
    },
});
```

## Height

[Back to table of contents](#table-of-contents)

The height of your Views and elements is the second most important attributes to set correctly. In this section I will go over different scenarios and the best choice for your height in each.

1. **General Height:**
   When designing and building a mobile app, the height of elements is usually actually not set at all. This is due to the freedom of being able to scroll. The height always adjusts automatically to fit the contents of the container/element. So if you have a header component for example, there's no way to tell sometimes exactly how tall it's going to be due to the resizing on different phones, everything that goes into it, and any changes or updates you might make in the future. So the best option would be to leave it alone.
2. **Fixed Height with Dimensions and react-native-size-matters:**
   Most of the time, the only elements you have to set a fixed height on are images, icons, buttons, or any other small component. You also have to set a fixed height for containers that are going to be scrollable and are not supposed to take up the whole screen, for example the nearby food trucks card on our home page. This component toggles between two fixed heights to provide a collapsed and expanded view. The height of these containers is determined by the figma design and you have make it match the design.

    - **Use height from dimensions** for large containers that take up a large part of the screen
    - **Use react-native-size-matters** for smaller elements.
    - **Square elements:** When setting the height of a component that's supposed to be a square, you're actually going to use the `width` from Dimensions. Ex:

        ```tsx
        const { width } = Dimensions.get("window");

        const styles = ScaledSheeet.create({
            // creates a component that has sides which
            // are 20% the width of the device screen
            square: {
                width: width * 0.2,
                height: width * 0.2,
            },
        });
        ```

3. **Flex:**
   Once you have set your fixed widths, any space left over can be used by flex. Components that are flex column and have flex: 1 will eat up the rest of the available vertical space and fill up the height.

## Height Code Example

[Back to table of contents](#table-of-contents)

```tsx
import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default function HeightExamples() {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.topSection}>
                    {[...Array(15).keys()].map((i) => (
                        <Text style={styles.box} key={i}>
                            {i}
                        </Text>
                    ))}
                </View>
                <Text>
                    The top section will adjust its height to fit the squares
                    within it. The squares themselves have a fixed width using
                    the screen's width from dimensions which will ultimately add
                    up and set the height for the entire top container.
                </Text>
                <ScrollView
                    style={styles.bottomSection}
                    contentContainerStyle={styles.scrollViewContentStyle}
                >
                    {[...Array(30).keys()].map((i) => (
                        <Text style={styles.text} key={i}>
                            This scrollable bottom section uses Dimension to
                            take up 30% of the screen's height
                        </Text>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        /*
            Since this is automatically flex-column,
            the primary axis is vertical. So if we 
            set flex: 1, it will take up the entire
            height of the screen which is all of the 
            available space left in the primary axis.
         */
        flex: 1,
        borderColor: "red",
        borderWidth: 10,
    },
    safeAreaContainer: {
        flex: 1,
        justifyContent: "space-between",
        borderColor: "blue",
        borderWidth: 10,
    },
    topSection: {
        /* 
            height doesn't need to be set, 
            it will be determined by its children
        */
        borderColor: "green",
        borderWidth: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    box: {
        /*
            Uses the width variable from 
            Dimensions to create a square
        */
        width: width * 0.13,
        height: width * 0.13,
        backgroundColor: "red",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: "20@s",
        color: "white",
        borderColor: "black",
        borderWidth: 5,
    },
    bottomSection: {
        // This will take up 30% of the height of the screen
        maxHeight: height * 0.3,
        height: height * 0.3,
    },
    scrollViewContentStyle: {
        /*
            This will take up 100% of the height of the 
            ScrollView. Since the ScrollView is 30% of the 
            height of the screen, this will take up 100% of 
            that 30%.
        */
        justifyContent: "flex-start",
        gap: "10@s",
        backgroundColor: "yellow",
        borderColor: "purple",
        borderWidth: 10,
    },
    text: {
        paddingVertical: "5@s",
        textAlign: "center",
        backgroundColor: "gray",
        color: "white",
        fontSize: "12@s",
    },
});
```

## Padding & Margin

[Back to table of contents](#table-of-contents)

Almost all components require a bit of padding, whether that's all around or at least on just one axis. padding should be minimal but enough to give space to breath. For example, padding should be set on `<Text></Text>` components or buttons so that the borders aren't mushed up next to the text. Padding and margin is simple and usually subjective. Just try to keep consistency and match the design. Padding is for inner spacing and margin is for outer spacing. Remember to use react-native-size-matters syntax when setting padding and margin size. Examples of padding and margin can be found in the previous code examples.

# Standard Workflow

[Back to table of contents](#table-of-contents)

Now that you are familiar with the major basic concepts of styling in React Native for mobile apps with stylesheets, I will guide you through the workflow of creating and styling a page plus a component. For this lesson we will be creating and styling our **Search Page** found in `search.tsx`.

## Step 1: Define ScaleSheet
