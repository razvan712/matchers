import React, { useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { GetPosts, updatePostTitleAndContent } from "../utils/posts";
import EditCard from "./EditCard";
import PostEditor from "./PostEditor"; // Ensure this is correctly imported

const EditableEventsHub = () => {
  const [editingItem, setEditingItem] = useState(null);
  const queryClient = useQueryClient();

  const { data: events, isLoading, error } = useQuery("events", () => GetPosts(""), {
    onSuccess: (events) => console.log("Events fetched successfully"),
  });

 


  const updateMutation = useMutation(updatePostTitleAndContent, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries("events");
  
      // Snapshot the previous value
      const previousEvents = queryClient.getQueryData("events");
  
      // Optimistically update to the new value
      queryClient.setQueryData("events", (oldEvents) => 
        oldEvents.map((event) => 
          event._id === newData.postId
            ? { ...event, title: newData.title, content: newData.content }
            : event
        )
      );
  
      return { previousEvents };
    },
    onError: (err, newTodo, context) => {
      // Roll back on error
      queryClient.setQueryData("events", context.previousEvents);
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("events");
      setEditingItem(null); // Hide the editor
    },
  });
  

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
  }, [setEditingItem]); // Dependency array
  

  const handleSave = (id, title, content) => {
    // Execute the mutation
    console.log(id, title, content,'iiiiiii');
    updateMutation.mutate({ postId: id, title, content });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  if (isLoading) return <ActivityIndicator size="large" color="#00f" />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          {editingItem && editingItem._id === item._id ? (
            <PostEditor item={editingItem} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <EditCard item={item} onEdit={() => handleEdit(item)} />
          )}
        </View>
      )}
    />
  );
};

export default EditableEventsHub;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
});
