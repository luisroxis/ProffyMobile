import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import AsynStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  
  function loadFavorites() {
    AsynStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response)

        setFavorites(favoritedTeachers)       
      }
    })
  }

  useFocusEffect(() =>{
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys Favoritos"/>
      <ScrollView 
        style={styles.teacherList} 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
            return (
              <TeacherItem 
                key={teacher.id}
                teacher={teacher}
                favorited
              />
            )
          })
        }        
      </ScrollView>
    </View>
  )
  }

  export default Favorites