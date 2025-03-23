# Best Practices for React Native Styling

This document outlines best practices for styling in React Native, focusing on efficient workflows, leveraging Flexbox for layout, component styling, debugging techniques, and handling sizing. It also provides recommendations for using `react-native-size-matters` and the built-in `Dimensions` API.

**Every tsx snippet here can be tested in the TEST.TSX PAGE within our app**

# Table of Contents

1.  [Styling Base Setup](#styling-base-setup)

    -   [Define a ScaledSheet StyleSheet](#define-a-stylesheet-with-react-native-size-matters)
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

4.  [Standard Workflow](#standard-workflow)

    -   [Step 1: Define the Component and Stylesheet](#step-1-define-functional-component-and-scaledsheet)
    -   [Step 2: Add SafeArea and Define Root Styling](#step-2-add-the-safeareaview-and-define-styling-for-the-root-containers)
    -   [Step 3: Analyze Design and Create Blocks](#step-3-analyze-figma-design-and-determine-page-blocks)
    -   [Step 4: Work Top Down, Create Header](#step-4-work-top-down-create-header)
    -   [Step 5: Create the Body](#step-5-create-the-body)
    -   [Step 6: Create the truck card](#step-6-create-the-truck-card)
    -   [Step 7: Integrate truck card](#step-7-integrate-the-truck-card-into-the-flatlist)

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

Maintain and use our centralized theme file for colors, font size, and padding to ensure consistency. DO NOT hard code colors, font size, or padding into your stylesheet. The only exception to this is Linear Gradient color styling. Linear Gradients will be done with in-line styling for now. To use our themes import the following:

```tsx
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

export default function Test() {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={{ flex: 1 }}>
                    {Object.entries(theme.colors).map(([key, value]) => (
                        <View
                            key={key}
                            style={{
                                flex: 1,
                                backgroundColor: value,
                            }}
                        >
                            <Text
                                style={{
                                    color: key != "black" ? "black" : "white",
                                }}
                            >
                                {key}
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={{ flex: 1 }}>
                    {Object.entries(theme.padding).map(([key, value]) => (
                        <View
                            key={key}
                            style={{
                                flex: 1,
                                padding: value,
                                borderColor: "purple",
                                borderWidth: 1,
                            }}
                        >
                            <Text>Pd-{key}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ flex: 1 }}>
                    {Object.entries(theme.fontSize).map(([key, value]) => (
                        <View
                            key={key}
                            style={{
                                borderColor: "purple",
                            }}
                        >
                            <Text style={{ fontSize: value }}>Fs-{key}</Text>
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
});
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

Now that you are familiar with the major basic concepts of styling in React Native for mobile apps with stylesheets, I will guide you through the workflow of creating and styling a page plus its components. For this lesson we will be creating and styling our **Search Page** found in `search.tsx`.

For reference, the page should look like this design from Figma:

![Search Page](/assets/images/examples/image.png)

## Step 1: Define Functional Component and ScaledSheet

[Back to table of contents](#table-of-contents)

The first step in creating any page or component is defining the main functional component that is to be exported as well as its ScaledSheet. Make sure to name the file accordingly to its purpose. Other developers should be able to read the name of a file or component and know exactly what it is or what it does. Do not name it arbitrarily or something similar to what it is. Name it exactly what it is.

```tsx
import { View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

// This is named Search since it is the main search page
export default function Search() {
    return (
        <View>
            <Text>search</Text>
        </View>
    );
}

// Make sure to use ScaledSheet from react-native-size-matters
const styles = ScaledSheet.create({});
```

## Step 2: Add the SafeAreaView and define styling for the root containers.

[Back to table of contents](#table-of-contents)

The root container of a PAGE should always take up the entire screen.

Since the root container of a page will take up the entire screen, it will also be in the way of the status bar on the top of a phone.

To avoid this, we will use the `SafeAreaView` from `react-native-safe-area-context` to make sure our content does not collide with the status bar.

We will apply `flex: 1` to both our root container and our safe area view so that they take up the entire screen while avoiding the status bar for the rest of the children components.

To test that the styling is correct and there are no bugs, we must use borders that stand out. The `Text` component in the following step is to ensure that our root container and safe area view is working properly. It will be removed right after.

```tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <Text style={styles.testText}>Search Page</Text>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        borderColor: "red",
        borderWidth: 5,
    },
    safeAreaView: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 5,
    },
    testText: {
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
        height: "100%",
        borderColor: "green",
        borderWidth: 5,
    },
});
```

## Step 3: Analyze figma design and determine page blocks

[Back to table of contents](#table-of-contents)

After setting up the previous base, you must create the general page blocks based off the design.

In our figma, we can clearly see two major blocks. The first is the header/top container which includes the gradient and the search bar. The second block is the list of suggestion cards. Our roots are automatically flex column and align stretch so that our children will be stacked on top of each other and take up the full width. Let's create our blocks to visualize further.

```tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.header}>
                    <Text style={styles.testText}>Header</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.testText}>
                        {`Body \n\n`}
                        {`Red: rootContainer View \n\n`}
                        {`Blue: SafeAreaView \n\n`}
                        {`Yellow: Header View \n\n`}
                        {`Orange: Body View \n\n`}
                        {`Black: Text View \n\n`}
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        borderColor: "red",
        borderWidth: 15,
    },
    safeAreaView: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 10,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
    },
    header: {
        // Temporary height, the actual
        // height will be auto/not set
        height: "100@s",
        borderColor: "yellow",
        borderWidth: 5,
    },
    body: {
        flex: 1,
        borderColor: "orange",
        borderWidth: 5,
    },
});
```

## Step 4: Work Top Down, Create Header

[Back to table of contents](#table-of-contents)

Now that we have our two major page blocks that take up the screen, we can start working top down and styling our first major component. This will be our header component which includes a simple search bar and a linear gradient.

1. Our first step will be to remove distracting borders and focus only on the header. You must also create a split in your scaledsheet to keep the chronological order of your styles.

```tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.header}>
                    <Text style={styles.testText}>Header</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.testText}>Body</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        height: "100@s",
        borderColor: "red",
        borderWidth: 5,
    },
    body: {
        flex: 1,
        borderWidth: 5,
    },
});
```

2. Now we will add our linear gradient

```tsx
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 132, 0, 0)",
                        ]}
                        locations={[0.1, 1]}
                    />
                    <Text style={styles.testText}>Header</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.testText}>Body</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        height: "100@s",
        borderColor: "red",
        borderWidth: 5,
    },
    gradient: {
        // This is a special style from the native
        // StyleSheet that will make the LinearGradient
        // fill the entire parent container through
        // absolute positioning.
        ...StyleSheet.absoluteFillObject,
    },
    //------------------------------
    /*
      This split is necessary as we work on
      our header to keep the order of styles
      */
    //------------------------------
    body: {
        flex: 1,
        borderWidth: 5,
    },
});
```

3. If you noticed, the status bar is still white and the linear gradient does not affect it. To make it smoothly blend, we will make the overall background our primary color. We will then have the gradient go from our primary color to white, and the body container will also be white.

```tsx
import theme from "@/assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 1]}
                    />
                    <Text style={styles.testText}>Header</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.testText}>Body</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        height: "100@s",
        borderColor: "red",
        borderWidth: 5,
    },
    gradient: {
        // This is a special style from the native
        // StyleSheet that will make the LinearGradient
        // fill the entire parent container through
        // absolute positioning.
        ...StyleSheet.absoluteFillObject,
    },
    //------------------------------
    /*
      This split is necessary as we work on
      our header to keep the order of styles
      */
    //------------------------------
    body: {
        flex: 1,
        backgroundColor: theme.colors.white,
        borderWidth: 5,
    },
});
```

4. Perfect! Now we're halfway done with our header. We got the linear gradient down and now we just need the search bar. If we look at our figma we can see some clear styling which is
    - the searchbar is centered vertically in the header
    - the searchbar takes up the entire width
    - the header has horizontal padding
    - the search bar has a white background and the corners are rounded
    - the search bar itself also has padding to create space around the text
    - we will also remove the preset header's height with vertical padding instead so it only takes up the height that's necessary

```tsx
import theme from "@/assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 1]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.testText}>Body</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    body: {
        flex: 1,
        backgroundColor: theme.colors.white,
        borderWidth: 5,
    },
});
```

And just like that we've finished the header in four small steps!

## Step 5: Create the body

[Back to table of contents](#table-of-contents)

Now we need to create the body which is a little more intricate due to the nested lists and components. Luckily, we already have all of the necessary components except one from previous sections of our apps. Our menu modal from the index page is essentially the same as this except we're rendering category and truck cards instead of food items. We will split the body into two views, the first will handle only the categories and the second will handle the different lists of recommended trucks.

```tsx
import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import { CATEGORIES, FOOD_TRUCKS, SEARCH_SECTIONS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 1]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>

                {/* Individual Search Categories Card */}
                <View style={styles.cardContainer}>
                    <FlatListCard title="Search Categories">
                        <FlatList
                            contentContainerStyle={{ gap: 10 }}
                            horizontal={true}
                            data={CATEGORIES}
                            keyExtractor={(item, index) => item.name + index}
                            renderItem={({ item }) => <Text>{item.name}</Text>}
                        />
                    </FlatListCard>
                </View>

                {/* List of Section Cards */}
                <FlatList
                    data={SEARCH_SECTIONS}
                    style={{
                        backgroundColor: theme.colors.white,
                    }}
                    keyExtractor={(section) => section.name}
                    renderItem={({ item: section }) => (
                        <View style={styles.cardContainer}>
                            <FlatListCard title={section.name}>
                                <FlatList
                                    contentContainerStyle={{ gap: 10 }}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={section.trucks}
                                    keyExtractor={(truckId) =>
                                        truckId.toString()
                                    }
                                    renderItem={({ item: truckId }) => {
                                        const truck =
                                            FOOD_TRUCKS.find(
                                                (truck) =>
                                                    truck.id ==
                                                    truckId.toString()
                                            ) ?? null;

                                        return truck ? (
                                            <Text>{truck.name}</Text>
                                        ) : null;
                                    }}
                                />
                            </FlatListCard>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
});
```

Explanation: This code was a bigger jump forward than what we did with the header. But if we break it apart it's really simple.

1. The first thing we did was remove the singular view with the body style. Since we're splitting into two smaller section, we don't need an overarching body view wrapping the two new sections.

    So from

    ```
    <View style={styles.header}></View>

    <View style={styles.body}></View>
    ```

    We go to

    ```
    <View style={styles.header}></View>

    <View style={styles.cardContainer}></View>
    <FlatList ...props />
    ```

2. Since all we need to do is render the same card over and over, we will have one cardContainer style for all of them. Remember that the root container has an orange bg so we need to make the bg of these cards white. All this card does is give padding and space between the cards so that the shadow is properly visible and so
    ```
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
    ```
3. The first view contains just one flatlistcard. The second view is a flatlist itself that will take up the rest of the space available on the screen. It will render out however many recommendation sections we have. The background color of this must also be white to cover any leftover orange at the bottom.
4. Our flatlists here must be `horizontal={true}` so that we scroll horizontally as shown in the figma.
5. In flatlists, don't confuse `style` with `contentContainerStyle`. They target two different things. `style` targets the outer overall View of the flatlist. `contentContainerStyle` targets the inner contents. This is why the gap is set within the `contentContainerStyle`
6. The `data` prop of a flatlist is exactly what it sounds like. It should be the array of data that will be mapped through. You can check out the type definitions I created in the constants file of each data set so you can understand it better. It should be self explanatory since it's just data manipulation with arrays.
7. The `keyExtractor` prop is another necessary prop which will give each rendered element a unique key. You can usually set this key with the id of the data itself or a mixture of one of the data's attributes plus the index of the data item.
8. The `renderItem` item will do just that. It will determine how each item from the data set is rendered. This is also where you can nest lists as we are doing for the list of section cards.

## Step 6: Create the truck card

[Back to table of contents](#table-of-contents)

Now that we have all of our section cards active with the truck names rendering correctly, we can replace the truck name text with the actual truck cards needed. Since this can be reused in many places, we will not create it directly in the page.

It will have its own tsx file and we will place it in the correct components folder bin. Since it's a card, we will place it inside `/components/cards/`.

Use the `test.tsx` page to style and test out your new component.

**test.tsx**:

```tsx
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import TruckCard from "@/components/cards/TruckCard";

export default function Test() {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <TruckCard />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        padding: theme.padding.xxxl,
        justifyContent: "center",
        alignItems: "center",
    },
});
```

**TruckCard.tsx**:

```tsx
import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

export default function TruckCard() {
    return (
        <View style={styles.rootContainer}>
            <Text>TruckCard</Text>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {},
});
```

1. Now that we have our base files set up correctly, we need to import a sample data set to test our file on. We will use a singular truck object from our constants file to render our card. We can render out the name just to make sure that everything is working right. Even though we are working in our TruckCard.tsx file, the change should be updated immediately and shown on the test.tsx file.

```tsx
import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { FOOD_TRUCKS } from "@/constants";

export default function TruckCard() {
    const sampleTruck = FOOD_TRUCKS[0];

    return (
        <View style={styles.rootContainer}>
            <Text>{sampleTruck.name}</Text>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {},
});
```

2. The first main attribute that we see in the figma is that this card's width is just about half the screen's width. We also see that it's split in half where the top is the image section and the bottom is the details section. We also see that the card has a border radius. Let's start showing all these attributes first.

```tsx
import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { FOOD_TRUCKS } from "@/constants";
import theme from "@/assets/theme";

const { width } = Dimensions.get("window");

export default function TruckCard() {
    const sampleTruck = FOOD_TRUCKS[0];

    return (
        <View style={styles.rootContainer}>
            <Image
                style={styles.image}
                source={{ uri: sampleTruck.imageUrl }}
            />
            <View style={styles.textContainer}>
                <Text>Text</Text>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        width: width * 0.5,
        overflow: "hidden",
        borderRadius: "20@ms",
        borderColor: "red",
        borderWidth: 2,
    },
    image: {
        width: "100%",
        height: width * 0.25,
        resizeMode: "cover",
    },
    textContainer: {
        padding: theme.padding.xs,
    },
});
```

3. Already half way done! Now we just need to add in the rest of the text and style it correctly. The styles needed are the background color of the root container, the thin light gray border, and some space under the title text. We also have to make the open/close text conditional.

```tsx
import { View, Text, Image, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { FOOD_TRUCKS } from "@/constants";
import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function TruckCard() {
    const sampleTruck = FOOD_TRUCKS[0];

    const starIcons = useMemo(
        () =>
            Array.from({ length: 5 }, (_, index) => (
                <Ionicons
                    key={index}
                    name={
                        index < Math.floor(sampleTruck.rating)
                            ? "star"
                            : "star-outline"
                    }
                    size={ms(10)}
                    color={theme.colors.primary}
                />
            )),
        [sampleTruck.rating]
    );

    return (
        <View style={styles.rootContainer}>
            <Image
                style={styles.image}
                source={{ uri: sampleTruck.imageUrl }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {sampleTruck.name}
                    {` ⦁ `}
                    <Text
                        style={sampleTruck.isOpen ? styles.open : styles.closed}
                    >
                        {sampleTruck.isOpen ? "OPEN" : "CLOSED"}
                    </Text>
                </Text>
                <Text style={styles.text}>
                    {sampleTruck.categories.join(", ")}
                </Text>
                <Text style={styles.text}>
                    {starIcons}
                    {` ⦁ `}
                    {sampleTruck.distance.toFixed(2)} mi away
                </Text>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        width: width * 0.6,
        overflow: "hidden",
        borderRadius: "20@ms",
        backgroundColor: theme.colors.primaryLight,
        borderColor: theme.colors.grayLight,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: width * 0.3,
        resizeMode: "cover",
    },
    textContainer: {
        padding: theme.padding.xs,
    },
    title: {
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
        marginBottom: theme.padding.xxs,
    },
    open: {
        color: theme.colors.greenLight,
    },
    closed: {
        color: theme.colors.red,
    },
    text: {
        fontSize: theme.fontSize.xs,
    },
});
```

## Step 7: Integrate the truck card into the flatlist

**Now that you finished creating this new custom component, we can render it out where it's actually needed.**

```tsx
import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import TruckCard from "@/components/cards/TruckCard";
import { CATEGORIES, FOOD_TRUCKS, SEARCH_SECTIONS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 1]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>

                {/* Individual Search Categories Card */}
                <View style={styles.cardContainer}>
                    <FlatListCard title="Search Categories">
                        <FlatList
                            contentContainerStyle={styles.flatListGap}
                            horizontal={true}
                            data={CATEGORIES}
                            keyExtractor={(item, index) => item.name + index}
                            renderItem={({ item }) => <Text>{item.name}</Text>}
                        />
                    </FlatListCard>
                </View>

                {/* List of Section Cards */}
                <FlatList
                    data={SEARCH_SECTIONS}
                    style={{
                        backgroundColor: theme.colors.white,
                    }}
                    keyExtractor={(section) => section.name}
                    renderItem={({ item: section }) => (
                        <View style={styles.cardContainer}>
                            <FlatListCard title={section.name}>
                                <FlatList
                                    contentContainerStyle={styles.flatListGap}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={section.trucks}
                                    keyExtractor={(truckId) =>
                                        truckId.toString()
                                    }
                                    renderItem={({ item: truckId }) => {
                                        const truck =
                                            FOOD_TRUCKS.find(
                                                (truck) =>
                                                    truck.id ==
                                                    truckId.toString()
                                            ) ?? null;
                                        /*
                                            Rendering the truck card here now
                                            instead of just text
                                        */
                                        return truck ? <TruckCard /> : null;
                                    }}
                                />
                            </FlatListCard>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
    flatListGap: {
        gap: "10@ms",
    },
});
```

**There's still something wrong though. All the trucks being rendered are the same! That's because our truck data that we are rendering in the card is still hard-coded. We have to create an interface and pass the data through props. So let's go back into our truck card file and add this functionality.**

1. Remove the truck card from your test.tsx if it's still there. We no longer need to test it there

2. Go into your truckcard.tsx and remove the sample truck variable and the import of all the truck constants. Your truckcard.tsx should now be this:

```tsx
import { View, Text, Image, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { FoodTruck } from "@/types";

const { width } = Dimensions.get("window");

interface TruckCardProps {
    readonly truck: FoodTruck;
}

export default function TruckCard({truck}: TruckCardProps) {

    const starIcons = useMemo(
        () =>
            Array.from({ length: 5 }, (_, index) => (
                <Ionicons
                    key={index}
                    name={
                        index < Math.floor(truck.rating)
                            ? "star"
                            : "star-outline"
                    }
                    size={ms(10)}
                    color={theme.colors.primary}
                />
            )),
        [truck.rating]
    );

    return (
        <View style={styles.rootContainer}>
            <Image
                style={styles.image}
                source={{ uri: truck.imageUrl }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {truck.name}
                    {` ⦁ `}
                    <Text
                        style={truck.isOpen ? styles.open : styles.closed}
                    >
                        {truck.isOpen ? "OPEN" : "CLOSED"}
                    </Text>
                </Text>
                <Text style={styles.text}>
                    {truck.categories.join(", ")}
                </Text>
                <Text style={styles.text}>
                    {starIcons}
                    {` ⦁ `}
                    {truck.distance.toFixed(2)} mi away
                </Text>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        width: width * 0.6,
        overflow: "hidden",
        borderRadius: "20@ms",
        backgroundColor: theme.colors.primaryLight,
        borderColor: theme.colors.grayLight,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: width * 0.3,
        resizeMode: "cover",
    },
    textContainer: {
        padding: theme.padding.xs,
    },
    title: {
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
        marginBottom: theme.padding.xxs,
    },
    open: {
        color: theme.colors.greenLight,
    },
    closed: {
        color: theme.colors.red,
    },
    text: {
        fontSize: theme.fontSize.xs,
    },
});
```

**Now we can pass our truck prop into our card so the correct data is rendered into each card.**

```tsx
import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import TruckCard from "@/components/cards/TruckCard";
import { CATEGORIES, FOOD_TRUCKS, SEARCH_SECTIONS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 1]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>

                {/* Individual Search Categories Card */}
                <View style={styles.cardContainer}>
                    <FlatListCard title="Search Categories">
                        <FlatList
                            contentContainerStyle={styles.flatListGap}
                            horizontal={true}
                            data={CATEGORIES}
                            keyExtractor={(item, index) => item.name + index}
                            renderItem={({ item }) => <Text>{item.name}</Text>}
                        />
                    </FlatListCard>
                </View>

                {/* List of Section Cards */}
                <FlatList
                    data={SEARCH_SECTIONS}
                    style={{
                        backgroundColor: theme.colors.white,
                    }}
                    keyExtractor={(section) => section.name}
                    renderItem={({ item: section }) => (
                        <View style={styles.cardContainer}>
                            <FlatListCard title={section.name}>
                                <FlatList
                                    contentContainerStyle={styles.flatListGap}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={section.trucks}
                                    keyExtractor={(truckId) =>
                                        truckId.toString()
                                    }
                                    renderItem={({ item: truckId }) => {
                                        const truck =
                                            FOOD_TRUCKS.find(
                                                (truck) =>
                                                    truck.id ==
                                                    truckId.toString()
                                            ) ?? null;
                                        /*
                                            Rendering the truck card here now
                                            instead of just text

                                            Added the truck prop to the TruckCard
                                            so that all the information can be
                                            passed down to the card
                                        */
                                        return truck ? <TruckCard truck={truck} /> : null;
                                    }}
                                />
                            </FlatListCard>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
    flatListGap: {
        gap: "10@ms",
    },
});
```

## Step 8: Restructure layout

While developing, you will sometimes realize that the original structure or method you implemented doesn't do exactly what you wanted it to. For example, at this stage if you run all the code we've made, yes it renders all the truck cards, but when you scroll vertically, the search categories card is not scrolling with the rest of the page. This is because we didn't wrap body together as a scrollview. This was intentionally left out to show you how to fix an error such as this. 

So we know two things
1. We want the entire body to scroll together
2. We want to map through a list of sections that each contain their unique list of trucks

We can still do this by replacing the original FlatList with the simple `.map()` function. `.map()` works perfectly here since the list of sections is short. It's never going to be long enough where rendering it all at once will slow down the app too much. Use flatlist when you expect to render many, many elements with lazy loading so only what you see is rendered. Use .map() when it's a short list of elements that you want to be automatically rendered whether or not it's visible on screen.

So the steps will be:

1. Replace the flatlist for the sections with `SEARCH_SECTION.map()`
2. Wrap the individual search category card and the .map function with a scrollview that has flex: 1 and a white background. You will be left with this which works as it's actually intended to.

```tsx
import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import TruckCard from "@/components/cards/TruckCard";
import { CATEGORIES, FOOD_TRUCKS, SEARCH_SECTIONS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Search() {
    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, .95]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>

                <ScrollView style={styles.body}>
                    {/* Individual Search Categories Card */}
                    <View style={styles.cardContainer}>
                        <FlatListCard title="Search Categories">
                            <FlatList
                                contentContainerStyle={styles.flatListGap}
                                horizontal={true}
                                data={CATEGORIES}
                                keyExtractor={(item, index) =>
                                    item.name + index
                                }
                                renderItem={({ item }) => (
                                    <Text>{item.name}</Text>
                                )}
                            />
                        </FlatListCard>
                    </View>

                    {SEARCH_SECTIONS.map((section) => (
                        <View key={section.name} style={styles.cardContainer}>
                            <FlatListCard title={section.name}>
                                <FlatList
                                    contentContainerStyle={styles.flatListGap}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={section.trucks}
                                    keyExtractor={(truckId) =>
                                        truckId.toString()
                                    }
                                    renderItem={({ item: truckId }) => {
                                        const truck =
                                            FOOD_TRUCKS.find(
                                                (truck) =>
                                                    truck.id ==
                                                    truckId.toString()
                                            ) ?? null;
                                        /*
                                            Rendering the truck card here now
                                            instead of just text

                                            Added the truck prop to the TruckCard
                                            so that all the information can be
                                            passed down to the card
                                        */
                                        return truck ? (
                                            <TruckCard truck={truck} />
                                        ) : null;
                                    }}
                                />
                            </FlatListCard>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    body: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
    flatListGap: {
        gap: "10@ms",
    },
});
```

## Step 9: Render the category buttons

This was left for last since we already have the styling for these buttons in another file which is the category modal. So we'll just copy it over and adjust the width and height of the buttons to match our needs on this page.

```tsx
import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import TruckCard from "@/components/cards/TruckCard";
import { CATEGORIES, FOOD_TRUCKS, SEARCH_SECTIONS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export default function Search() {
    const handleCategoryPress = (category: string) => {
        console.log(`Pressed Category: ${category}`);
    };

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 0.95]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>

                <ScrollView style={styles.body}>
                    {/* Individual Search Categories Card */}
                    <View style={styles.cardContainer}>
                        <FlatListCard title="Search Categories">
                            <FlatList
                                contentContainerStyle={styles.flatListGap}
                                horizontal={true}
                                data={CATEGORIES}
                                keyExtractor={(item, index) =>
                                    item.name + index
                                }
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.categoryButton}
                                        onPress={() =>
                                            handleCategoryPress(item.name)
                                        }
                                    >
                                        <Image
                                            source={{ uri: item.url }}
                                            style={styles.image}
                                        />
                                        <Text style={styles.buttonText}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </FlatListCard>
                    </View>

                    {SEARCH_SECTIONS.map((section) => (
                        <View key={section.name} style={styles.cardContainer}>
                            <FlatListCard title={section.name}>
                                <FlatList
                                    contentContainerStyle={styles.flatListGap}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={section.trucks}
                                    keyExtractor={(truckId) =>
                                        truckId.toString()
                                    }
                                    renderItem={({ item: truckId }) => {
                                        const truck =
                                            FOOD_TRUCKS.find(
                                                (truck) =>
                                                    truck.id ==
                                                    truckId.toString()
                                            ) ?? null;
                                        /*
                                            Rendering the truck card here now
                                            instead of just text

                                            Added the truck prop to the TruckCard
                                            so that all the information can be
                                            passed down to the card
                                        */
                                        return truck ? (
                                            <TruckCard truck={truck} />
                                        ) : null;
                                    }}
                                />
                            </FlatListCard>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    body: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
    flatListGap: {
        gap: "10@ms",
    },
    categoryButton: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: "10@ms",
        justifyContent: "center",
        alignItems: "center",
        gap: "5@ms",
        backgroundColor: theme.colors.primaryLight,
    },
    image: {
        width: "50%",
        height: "50%",
    },
    buttonText: {
        fontSize: theme.fontSize.xxs,
    },
});
```

**The search page is now finalized**