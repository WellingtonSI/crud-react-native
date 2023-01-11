import { ListItem, Avatar, Button } from "@rneui/base";
import React, { useContext } from "react";
import { View , FlatList, Alert } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import UsersContext from "../context/UserContext";

export default props => {

   const {state , dispatch} = useContext(UsersContext)


    function confirmUserDeletion(user){
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }){
        return(
            <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserForm')}>
                <Avatar source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)} type="clear" icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)} type="clear" icon={<Icon name="trash" size={25} color="red" />}
                />
                  
                
            </ListItem>
            
        ) 
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()} 
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}