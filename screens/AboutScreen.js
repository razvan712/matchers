import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import EditableEventsHub from '../components/EditableEventsHub';
import PostEditor from '../components/PostEditor';





const AboutScreen = () => {
  // State to track the selected post for editing
  const [selectedPost, setSelectedPost] = useState(null);
  // State to control visibility of the editor form
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <EditableEventsHub
        category="" 
        setSelectedPost={setSelectedPost} 
        setVisible={setVisible}
      />
      {visible && selectedPost && (
        <PostEditor postId={selectedPost} setVisible={setVisible} />
      )}
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});