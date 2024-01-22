import React from 'react'
import {io} from 'socket.io-client'
import { useState,useEffect } from 'react';
import Styles from '../src/App.css';
const socket = io('http://localhost:3000');
function App() {

  const [isConnected, setIsConnected] = useState();
  const [nuevoMensaje,setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(()=>{
      socket.on('connect',() => setIsConnected(true));
      socket.on('chat_message',(data)=>{
        setMensajes(mensajes => [...mensajes ,data])
      })
      return () =>{
        socket.off('connect');
        socket.off('chat_message');
      }
  },[])

  const enviarMensaje = () =>{
      socket.emit('chat_message',{
        usuario: socket.id,
        mensaje: nuevoMensaje
      });
  }
  return (
      <section className='Main-Container'>
    <div className='Container' style={{display:'flex',flexDirection:'column'}}>
      <h2>{isConnected ? 'Conectado': 'Desconectado'}</h2>
      {mensajes.map(mensaje =>(
        <label key={mensaje.usuario} className='Usuario'>{mensaje.usuario}: {mensaje.mensaje}</label>
      ))
      }
      <input type='text'
        onChange={e => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
      </section>
  )
}

export default App