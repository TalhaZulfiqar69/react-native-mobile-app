import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { NavigationProps } from "./Screens";
import { Person } from "../Model/Person";

export const AppBarcodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation<NavigationProps>();
    const isFocused = useIsFocused();

    const handleBarCodeScanned = (event:BarCodeEvent) => {
        const text = event.data;
        let message = JSON.parse(text);
        alert(message);
        navigation.navigate("Details", {contactId:message.id})
    }
    useEffect(() => {
        const getPermissions = async () => {
            const status = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status.granted);
        }
        getPermissions();
    }, []);

    if (hasPermission == null){
        return (<Text>Requesting for camera permission</Text>);
    }

    if (hasPermission == false){
        return (<Text>No access to camera</Text>);
    }

    return (
        <View style={styles.container}>
            {isFocused && <BarCodeScanner
                type="back"
                barCodeTypes={[
                            BarCodeScanner.Constants.BarCodeType.qr,
                            BarCodeScanner.Constants.BarCodeType.ean13
                            ]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})