import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsynStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacheItemProps {  
  teacher: Teacher;
  favorited: boolean;
}

import styles from './styles'


const TeacherItem: React.FC<TeacheItemProps>  =  ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorite] = useState(favorited)

  async function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    await api.post('connections',{
      user_id: teacher.id,
    })
  }

  async function handleToogleFavorite() {
    const favorites = await AsynStorage.getItem('favorites')

      let favoritesArray = []

      if(favorites){
        favoritesArray = JSON.parse(favorites)
      }

    if(isFavorited)  {
      const favoritesIndex = favoritesArray.findIndex((teacherItem: Teacher)=> {
        return teacherItem.id === teacher.id
      })

      favoritesArray.splice(favoritesIndex, 1)

      setIsFavorite(false)

    } else {
      const favorites = await AsynStorage.getItem('favorites')

      let favoritesArray = []

      if(favorites){
        favoritesArray = JSON.parse(favorites)
      }

      favoritesArray.push(teacher)
      
      setIsFavorite(true)      
    }
    await AsynStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }


  return (  
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar}}
        />     
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>
        {teacher.bio}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToogleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorited ?  styles.favorited : {}
            ]}
          >
            { isFavorited
              ? <Image source={heartOutLineIcon}/>
              : <Image source={unfavoriteIcon}/>
            }
          </RectButton>
          <RectButton 
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon}/>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>    
  )
}

export default TeacherItem