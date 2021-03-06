import React,{ createContext, useState } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';

export const AuthContext = createContext({});

function  AuthProvider({ children  }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    
    //Carrega dados login local
    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, []);

    //Login
    async function signIn( email, password ){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then( (snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        }).catch((error)=>{
            alert(error);
            setLoadingAuth(false);
        })
    }
    
    //Cadastrar usuario
    async function signUp( email, password, nome ){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( async (value) => {
            const uid = value.user.uid;
                await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            });

        }).catch((error)=>{
            alert(error);
            setLoadingAuth(false);
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signOut(){
        setLoadingAuth(true);
        await firebase.auth().signOut();
        await AsyncStorage.clear().then( () => {
            setLoadingAuth(false);
            setUser(null);
        });
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, signUp, signIn, signOut, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthProvider