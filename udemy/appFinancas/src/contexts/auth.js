import React,{ createContext, useState } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function  AuthProvider({ children  }){
    const [user, setUser] = useState(null);
    //Login

    async function signIn( email, password ){
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
            })
        }).catch((error)=>{
            alert(error);
        })
    }
    //Cadastrar usuario
    async function signUp( email, password, nome ){
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
            });

        }).catch((error)=>{
            alert(error);
        })
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, signUp, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider