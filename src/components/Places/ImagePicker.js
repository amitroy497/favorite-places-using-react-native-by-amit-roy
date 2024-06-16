import {
	launchCameraAsync,
	PermissionStatus,
	useCameraPermissions,
} from 'expo-image-picker';
import { Alert, Button, View } from 'react-native';

export const ImagePicker = () => {
	const [cameraPermissioninformation, requestPermission] =
		useCameraPermissions();

	const verifyPermissions = async () => {
		if (cameraPermissioninformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}
		if (cameraPermissioninformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient permissions',
				'You need to grant camera permissions to use this app'
			);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		console.log(image);
	};

	return (
		<View>
			<View></View>
			<Button title='Take Image' onPress={takeImageHandler} />
		</View>
	);
};
