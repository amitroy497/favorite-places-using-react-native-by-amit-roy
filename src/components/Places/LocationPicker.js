import { Alert, StyleSheet, View } from 'react-native';
import { OutlinedButton } from '../UI/OutlinedButton';
import { GlobalStyles } from '../../constants';
import {
	getCurrentPositionAsync,
	PermissionStatus,
	useForegroundPermissions,
} from 'expo-location';

export const LocationPicker = () => {
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	const verifyPermissions = async () => {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}
		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient permissions',
				'You need to grant location permissions to use this app'
			);
			return false;
		}
		return true;
	};

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const location = await getCurrentPositionAsync();
		console.log(location);
	};

	const pickOnMapHandler = () => {};

	return (
		<View>
			<View style={styles.mapPreview}></View>
			<View style={styles.actions}>
				<OutlinedButton icon='location' onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon='map' onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
});
