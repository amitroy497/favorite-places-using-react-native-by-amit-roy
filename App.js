import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AddPlace, AllPlaces, GlobalStyles, IconButton } from './src';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style='dark' />
			<NavigationContainer>
				<Stack.Navigator
					screen
					screenOptions={{
						headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
						headerTintColor: GlobalStyles.colors.gray700,
						contentStyle: { backgroundColor: GlobalStyles.colors.gray700 },
					}}
				>
					<Stack.Screen
						name='AllPlaces'
						component={AllPlaces}
						options={({ navigation }) => ({
							title: 'Your Favorite Places',
							headerRight: ({ tintColor }) => (
								<IconButton
									icon='add'
									size={24}
									color={tintColor}
									onPress={() => navigation.navigate('AddPlace')}
								/>
							),
						})}
					/>
					<Stack.Screen
						name='AddPlace'
						component={AddPlace}
						options={{
							title: 'Add a new place',
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
