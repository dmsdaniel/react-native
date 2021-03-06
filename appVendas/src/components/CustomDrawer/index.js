import React from 'react';
import { View , Text, Image} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'


export default function CustomDrawer(props) {
    return (
    <DrawerContentScrollView {...props}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
            <Image
            source={require('../../assets/Logo.png')}
            style={{width: 85, height:85}}
            resizeMode="contain"
            />
            <Text style={{color: '#FFF', fontSize: 18, marginTop: 5}}>
                Bem-Vindo
            </Text>
           
        </View>
      <DrawerItemList {...props} />
      <DrawerItem 
      {...props}
      label="Sair do App"
      inactiveBackgroundColor="#c62c36"
      />
    </DrawerContentScrollView>
  );
}