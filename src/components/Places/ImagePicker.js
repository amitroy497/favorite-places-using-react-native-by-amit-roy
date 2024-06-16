import { launchCameraAsync } from 'expo-image-picker';
import { Button, View } from 'react-native';

export const ImagePicker = () => {
	const takeImageHandler = async () => {
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