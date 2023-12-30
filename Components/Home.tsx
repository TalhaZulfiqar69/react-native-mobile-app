import { Button, View } from "react-native"
import { NavigationProps } from "./Screens";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <View>
            <Button title="Contacts" onPress={()=>navigation.navigate("ContactList")}></Button>
            <Button title="Create Contact" onPress={()=>navigation.navigate("CreateContact")}></Button>
            <Button title="Barcode Scanner" onPress={()=>navigation.navigate("BarcodeScanner")}></Button>
        </View>
    )
}