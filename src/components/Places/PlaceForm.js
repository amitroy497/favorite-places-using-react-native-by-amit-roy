import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';

export const PlaceForm = () => {
	const [enteredTitle, setEnteredTitle] = useState('');

	const changeTitleHandler = (enteredText) => {
		setEnteredTitle(enteredText);
	};

	return (
		<ScrollView style={styles.form}>
			<View>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={changeTitleHandler}
					value={enteredTitle}
				/>
			</View>
			<ImagePicker />
			<LocationPicker />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 4,
		color: GlobalStyles.colors.primary500,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: GlobalStyles.colors.primary700,
		borderBottomWidth: 2,
		backgroundColor: GlobalStyles.colors.primary100,
	},
});
