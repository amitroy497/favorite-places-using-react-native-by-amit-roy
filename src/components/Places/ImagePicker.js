import {
	launchCameraAsync,
	PermissionStatus,
	useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants';
import { OutlinedButton } from '../UI/OutlinedButton';

export const ImagePicker = () => {
	const [pickedImage, setPickedImage] = useState();

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
		image?.assets.map((img) => {
			return setPickedImage(img?.uri);
		});
	};

	let imagePreview = <Text>No image taken yet.</Text>;

	if (pickedImage) {
		imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon='camera' onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
