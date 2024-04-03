import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { GetPosts } from "../utils/posts";
import placeholderImage from "../assets/carddefault.png";
import { Buffer } from "buffer";
import { EventCard } from "./EventCard";
import { ActivityIndicator } from "react-native-paper";

const EventsHub = ({ category, setSelectedPost, setVisible }) => {
  console.log("category", category);

  const {
    data: events,
    isLoading,
    error,
  } = useQuery(["events", category], () => GetPosts(category || ""), {
    onSuccess: (events) => console.log("Events fetched successfully"),
  });

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginVertical: 20,
        }}
        animating={true}
        color="#00f"
      />
    );
  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
      data={events}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <EventCard
          item={item}
          setSelectedPost={setSelectedPost}
          setVisible={setVisible}
        />
      )}
    />
  );
};

export default EventsHub;

const styles = StyleSheet.create({
  eventItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventContent: {
    fontSize: 14,
    marginTop: 5,
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
