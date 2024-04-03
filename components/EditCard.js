import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from "react-native";
import { useMutation } from "react-query";
import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "react-query";
import { GoingEvent } from "../utils/posts";
import { primaryColor, secondaryColor } from "../utils/colors";

const EditCard = ({ item, onEdit }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isGoing, setIsGoing] = useState(
    item.going.includes(user.user?.username)
  );
  const [isFetching, setIsFetching] = useState(false);

  const mutation = useMutation(
    () => GoingEvent({ username: user.user?.username, postId: item._id }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["events"]);

        const previousEvents = queryClient.getQueryData(["events"]);

        queryClient.setQueryData(["events"], (oldEvents) =>
          oldEvents.map((ev) =>
            ev._id === item._id
              ? {
                  ...ev,
                  going: isGoing
                    ? ev.going.filter((u) => u !== user.user?.username)
                    : [...ev.going, user.user?.username],
                }
              : ev
          )
        );

        return { previousEvents };
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(["events"], context.previousEvents);
        setIsGoing(!isGoing);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["events"]);
        setIsFetching(false);
      },
    }
  );

  const handleGoing = () => {
    setIsGoing(!isGoing);
    setIsFetching(true);
    mutation.mutate();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      {user.user?.role !== "admin" ? <View style={{
          borderWidth: 2,
            borderColor: secondaryColor,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#e9ecef',
        }}>
        <FlatList
          data={item.going}
          keyExtractor={(item, index) => index.toString()}
          gap={10}
          renderItem={({item}) => (
            <Text style={{
              fontSize: 14,
              marginHorizontal: 5,
              fontWeight: 'bold',
            }}>{item}</Text>
          )}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        </View>: null}
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        {/* Conditional rendering based on the user role */}
        {user.user?.role === "admin" ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: primaryColor }]}
            onPress={() => onEdit(item)}
          >
            <Text style={[styles.buttonText,{color: secondaryColor}]}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isGoing ? "red" : "green" }]}
            disabled={isFetching}
            onPress={handleGoing}
          >
            <Text style={styles.buttonText}>
              {isGoing ? "Not Going" : "Going"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(EditCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    marginVertical: 10,
    maxHeight: 200,
  },
  button: {
    borderRadius: 15,
    width: 100,
    marginTop: 10,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
