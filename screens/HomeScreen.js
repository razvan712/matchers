import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native'
import React ,{useState} from 'react'
import { useAuth } from '../context/AuthContext'
import EventCategories from '../components/EventCategories'
import EventsHub from '../components/EventsHub'
import { Modal, Portal, Provider } from 'react-native-paper';
import { primaryColor, secondaryColor } from '../utils/colors';


const HomeScreen = () => {
const {setIsAuthenticated, isAuthenticated} = useAuth()
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedPost, setSelectedPost] = useState(null);
const [visible, setVisible] =useState(false);
const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
const containerStyle = {backgroundColor: 'white', padding: 20};




const goingUsers =selectedPost && selectedPost.going
   
console.log(goingUsers, 'goingUsers')

console.log(isAuthenticated, 'isAuthenticated')

  return (
    <View>
     <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
     
          <Text style={styles.postTitle}>{selectedPost && selectedPost.title}</Text>
          <View >
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 10,
          color: secondaryColor,

        
        }}>Going Users:</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,

        } }>
        {/* {
          goingUsers && goingUsers.map((user, index) => (
            <Text style={{
              fontSize: 12,
            }} key={index}>{user}</Text>
          ))
        } */}
        <View style={{
          borderWidth: 2,
            borderColor: secondaryColor,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#e9ecef',
        }}>
        <FlatList
          data={goingUsers}
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
        </View>
        
        </View>
        </View>
          <Text style={styles.postContent}>{selectedPost && selectedPost.content}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={hideModal} >
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <EventCategories setSelectedCategory={setSelectedCategory} />
      <EventsHub category={selectedCategory} setSelectedPost={setSelectedPost} setVisible={setVisible} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

 postTitle: {
   fontSize: 20,
   fontWeight: 'bold',
 },
  postContent: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  postDate: {
    fontSize: 14,
    marginTop: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  closeBtn:  {
    marginTop: 20,
    width: '30%',
    backgroundColor: secondaryColor,
    borderRadius: 10,
    alignSelf: 'center',
  } ,
  closeBtnText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  
  }

})