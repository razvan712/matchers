import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Buffer } from "buffer";
import placeholderImage from "../assets/carddefault.png";

export const EventCard = ({ item, setSelectedPost, setVisible }) => {
  let imageSource;
  if (item.image && item.image.data && item.image.data.length > 0) {
    const imageBase64 = Buffer.from(item.image.data).toString("base64");
    imageSource = { uri: `data:image/jpeg;base64,${imageBase64}` };
  } else {
    imageSource = placeholderImage;
  }

  // console.log('imageSource',imageSource);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setSelectedPost(item);
        setVisible(true);
      }}
    >
      <Card style={styles.eventItem}>
        <Card.Cover source={placeholderImage} style={styles.eventImage} />
        <Card.Content>
          <Card.Title title={item.title} titleStyle={styles.eventTitle} />
          <Card.Content style={styles.eventContent}>
            <Card.Content style={styles.eventDate}>
              <Text>{item.content}</Text>
            </Card.Content>
          </Card.Content>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  eventItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    elevation: 10,
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventContent: {
    fontSize: 14,
    marginTop: 5,
    maxHeight: 90,
  },
  eventDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});
