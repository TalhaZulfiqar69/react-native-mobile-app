import { Button, Pressable, Text, View, StyleSheet } from "react-native";
import { Person } from "../../Model/Person";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps, ScreensList } from "../Screens";
import { useContext } from "react";
import { Context } from "../Data/Context";
import { Image } from "expo-image";

export const ContactDetails = () => {
    const route = useRoute<RouteProp<ScreensList, "Details">>();
    const {contacts, onDelete} = useContext(Context);
    const contact:Person|undefined = contacts.find(contact=>contact.id === route.params.contactId);
    const navigation = useNavigation<NavigationProps>();
    const onDeleteContact = () => {
        if (contact){
            onDelete(contact);
            navigation.navigate("ContactList");
        }
    }
    return (
        <View>
            <View>
                <Image source={contact?.image} style={{width:200, height:200, borderRadius:100, alignSelf:"center", margin:32}}></Image>
            </View>
            <View>
                <Text>{contact?.firstName}</Text>
                <Text>{contact?.lastName}</Text>
            </View>
            <View>
                <Button title="Face Detector" onPress={()=>navigation.navigate("FaceDetector", {contactID:route.params.contactId})}></Button>
                <Pressable onLongPress={()=>onDeleteContact()}
                style={({pressed}) => {
                    return [
                        {
                            backgroundColor: pressed ? 'rgb(150, 180, 255)' : 'red',
                        },
                        styles.wrapperCustom,
                    ];
                }}>
                {({pressed}) => (
                    <Text style={styles.text}>{pressed ? 'Hold For Confirmation' : 'Delete Contract'}</Text>
                 )}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10
    },
    text: {
      fontSize: 16,
      alignSelf:"center",
      color: 'white'
    },
    wrapperCustom: {
      padding: 6,
    },
    logBox: {
      padding: 20,
      margin: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#f0f0f0',
      backgroundColor: '#f9f9f9',
    },
  });