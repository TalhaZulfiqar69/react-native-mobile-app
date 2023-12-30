import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Camera, CameraType, FaceDetectionResult } from "expo-camera"
import { FaceDetectorMode, FaceDetectorLandmarks, FaceFeature, detectFacesAsync } from "expo-face-detector";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native"
import { manipulateAsync } from "expo-image-manipulator"
import { Context } from "./Data/Context";
import { NavigationProps, ScreensList } from "./Screens";

export const FaceDetector = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [faces, setFaces] = useState<FaceFeature[]>([]);
    const {setPhoto} = useContext(Context);
    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<ScreensList, "FaceDetector">>();
    const navigator = useNavigation<NavigationProps>();
    
    useEffect(() => {
        const getPermissions = async () => {
            const status = await Camera.requestCameraPermissionsAsync();
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
    
    const handleFaceDetected = (results: FaceDetectionResult) =>{
        console.log(results.faces);
        setFaces(results.faces as FaceFeature[]);
    }

    const renderRectangle = (face:FaceFeature) => {
        return(
            <View
                key={face.faceID}
                style={[
                    styles.face,
                    {
                        //face.bounds.size.widht && height
                        ...face.bounds.size,
                        left: face.bounds.origin.x,
                        top: face.bounds.origin.y,
                        transform: [
                            {perspective: 600},
                            {rotateZ: `${face.rollAngle!.toFixed(0)}deg`},
                            {rotateY: `${face.yawAngle!.toFixed(0)}deg`}
                        ]
                    }
                ]}
            />
        )
    }

    let camera : Camera;

    const onTakePhotoClickHandler = async () => {
        const photo = await camera!.takePictureAsync({quality:0.5}); //Quality=1 is the best quality
        const detectedFaces = await detectFacesAsync(photo.uri); //Path to the taken photo
        //need to install expo-image & expo-image-manipulator
        const cutFace = await manipulateAsync(photo.uri, [{
            crop:{
                originX: detectedFaces.faces[0].bounds.origin.x,
                originY: detectedFaces.faces[0].bounds.origin.y,
                width: detectedFaces.faces[0].bounds.size.width,
                height: detectedFaces.faces[0].bounds.size.height
            }},
            {
                resize: {
                    width:100
                }
        }], {base64:true});
        setPhoto(route.params.contactID, "data:image/PNG;base64,"+cutFace.base64!);
        navigator.goBack();
    }

    return (
        <View style={styles.container}>
            {isFocused && 
            <Camera 
            ref={(ref)=>camera = ref!}
            type={CameraType.front}
            style={StyleSheet.absoluteFill}
                faceDetectorSettings={{
                    tracking: true,
                    mode:FaceDetectorMode.accurate,
                    detectLandmarks: FaceDetectorLandmarks.all,
                    minDetectionInterval: 200
                }}
                onFacesDetected={handleFaceDetected}
            />}
            <View style={styles.faceContainer}>
                {faces.map(renderRectangle)}
            </View>
            <Button title="Take Photo" onPress={onTakePhotoClickHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    face:{
        padding:10,
        borderWidth: 2,
        borderRadius: 2,
        position:"absolute",
        borderColor: "blue",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    faceContainer:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})