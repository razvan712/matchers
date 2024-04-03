import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { secondaryColor } from "../utils/colors";

const PostEditor = ({ item, onSave, onCancel }) => {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  return (
    <View style={styles.editor}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, { height: 150 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 15,
            width: 100,
            marginTop: 10,
            padding: 10,
            backgroundColor: secondaryColor,
          }}
          onPress={() => onSave(item._id, title, content)}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 15,
            width: 100,
            marginTop: 10,
            padding: 10,
            backgroundColor: "red",
          }}
          onPress={onCancel}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(PostEditor);

const styles = StyleSheet.create({
  editor: {
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
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
