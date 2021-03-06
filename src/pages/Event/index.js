import React, { useState, useEffect } from 'react';
import {Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Events() {
    const [events, setEvents] = useState([]);
    const navigation = useNavigation();

    function navigationToDetail(event) {
        navigation.navigate('Detail', { event });
    }

    async function loadEvents() {
        const response = await api.get('/events/users');
        setEvents(response.data);  
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{events.length}</Text> eventos.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Participe dos melhores eventos.</Text>

            <FlatList 
                data={events}
                style={styles.eventList}
                keyExtractor={event => String(event.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: event }) => (
                    <View style={styles.event}>
                        <Text style={styles.usuarioProperty}>Organizador:</Text>
                        <Text style={styles.usuarioValue}>{event.userName}</Text>

                        <Text style={styles.usuarioProperty}>Evento:</Text>
                        <Text style={styles.usuarioValue}>{event.name}</Text>

                        <Text style={styles.usuarioProperty}>Preço:</Text>
                        <Text style={styles.usuarioValue}>
                        {Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' })
                        .format(event.price)}
                        </Text>
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigationToDetail(event)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#8c52ff" />
                        </TouchableOpacity>
                    </View>

                )}
            />  

        </View>
    );
}