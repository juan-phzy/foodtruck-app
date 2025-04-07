import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScaledSheet } from "react-native-size-matters"
import { Ionicons } from '@expo/vector-icons'
import theme from "@/assets/theme";


interface SmallIconButtonProps{
    iconName: keyof typeof Ionicons.glyphMap,
    text: string,
    fontSize: number
}
export default function SmallIconButton({iconName,text,fontSize} : SmallIconButtonProps) {
  return (
    <TouchableOpacity style = {styles.container}>
      <Ionicons name = {iconName} size = {fontSize} color = {theme.colors.primary}/>
      <Text style = {styles.text}> {text}</Text>
    </TouchableOpacity>
  )
}


const styles = ScaledSheet.create({
    container:{
        
        flexDirection: "row",
        gap: "5@ms",
        paddingHorizontal: "10@ms",
        paddingVertical: "5@ms",
        justifyContent: "center",
        
        width: "130@ms",
        height: "35@ms",
        borderRadius: "5@ms",
        borderWidth: "2@ms",
        borderColor: theme.colors.primary,
        
    },
    text:{
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary
    }
})