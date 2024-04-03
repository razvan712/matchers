import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { CategoryIcons } from "../utils/categoryIcons";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { primaryColor } from "../utils/colors";

const EventCategories = ({ setSelectedCategory }) => {
  return (
    <View style={styles.categoriesContainer}>
      <FlatList
        horizontal
        data={CategoryIcons}
        renderItem={({ item }) => (
          <View style={styles.categoriesContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setSelectedCategory(item.value)}
            >
              <MaterialIcons name={item.icon} size={24} color={item.color} />
            </TouchableOpacity>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default EventCategories;

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingVertical: 12,
    backgroundColor: primaryColor,
  },

  circle: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginHorizontal: 10,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});
