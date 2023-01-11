import React from "react";
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import UserList from "./views/UserList";
import UserForm from "./views/UserForm";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { Button } from '@rneui/themed';
import { UsersProvider } from "./context/UserContext";

const Stack = createNativeStackNavigator()

export default props => {
    return (
        <UsersProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="UserList"
                    screenOptions={screenOptions}>
                    <Stack.Screen 
                        name="UserList"
                        component={UserList}
                        options={({ navigation }) => {
                            return {
                                title: "Lista de Usuários",
                                headerRight: () => (
                                    <Button 
                                        onPress={() => navigation.navigate("UserForm")}
                                        type="clear"  
                                        icon={<Icon name="plus" size={25} color="white"/>}
                                    />
                                    
                                    
                                )
                                
                                
                            }
                        }}
                    />
                    <Stack.Screen 
                        name="UserForm"
                        component={UserForm}
                        options={{
                            title: "Formulário de Usuários"
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
         </UsersProvider>
    )
}
const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}