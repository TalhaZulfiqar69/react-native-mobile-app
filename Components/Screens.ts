import { StackNavigationProp } from "@react-navigation/stack";
import { Person } from "../Model/Person";

export type ScreensList = {
    Home: undefined,
    ContactList: undefined,
    Details: {contactId:string},
    CreateContact: undefined,
    BarcodeScanner: undefined,
    FaceDetector: {contactID:string}
}

export type NavigationProps = StackNavigationProp<ScreensList>;