import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { createContact } from "../../Model/Person";
import uuid from "react-native-uuid";
import { Context } from "../Data/Context";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Screens";

type CreateContactState={
    firstName: string;
    lastName: string;
    email: string;
    roomNumber: string;
}

export const CreateContact = () =>{
    const {onCreate} = useContext(Context);
    const navigation = useNavigation<NavigationProps>();
    let initialState = {firstName: "", lastName: "", email: "", roomNumber: ""};
    const [state, setState] = useState<CreateContactState>(initialState)
    const changeValue = (propertyName:string, newValue:string) => setState({...state, [propertyName]:newValue});
    const onCreateContact = () => {
        const newContact = createContact(uuid.v4().toString(), state.firstName, state.lastName, state.email, Number.parseInt(state.roomNumber));
        onCreate(newContact);
        navigation.navigate("ContactList");
    }
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput value={state.firstName} onChangeText={(text:string) => changeValue("firstName", text)} style={styles.input}></TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput value={state.lastName} onChangeText={(text:string) => changeValue("lastName", text)} style={styles.input}></TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <TextInput value={state.email} onChangeText={(text:string) => changeValue("email", text)} style={styles.input}></TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Room Number</Text>
                <TextInput value={state.roomNumber} onChangeText={(text:string) => changeValue("roomNumber", text)} style={styles.input}></TextInput>
            </View>
            <View style={styles.row}>
                <Button title="Create" onPress={onCreateContact}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        margin:8
    },
    label:{
        fontSize:20
    },
    input:{
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        fontSize:18
    },
    container:{
        backgroundColor:"white",
        flex:1
    }
})