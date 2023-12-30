import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Person, createContact } from "../../Model/Person"
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Screens";
import { useContext } from "react";
import { Context } from "../Data/Context";

export const ContactListItem = ({contact} : {contact:Person}) => {
    const navigation = useNavigation<NavigationProps>();
    return (<View style={contactListItemStyles.item}>
        <Pressable onPress={()=>navigation.navigate("Details", {contactId:contact.id})}>
            <Text>{contact.firstName} {contact.lastName}</Text>
        </Pressable>
    </View>)
}

const contactListItemStyles = StyleSheet.create({
    item : {
        padding:4,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        marginBottom:4
    }
});

export const ContactList = () => {
    const {contacts} = useContext(Context);
    return (
        <View style={listStyle.container}>
            { contacts.map(contact=><ContactListItem key={contact.id} contact={contact}></ContactListItem>) }
        </View>
    )
}

const listStyle = StyleSheet.create({
    container: {
        width:"100%",
        flex:1,
        padding:8,
        backgroundColor: "#fff"
    }
})