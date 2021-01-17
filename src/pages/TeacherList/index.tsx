import React, { useState } from 'react';
import {View, ScrollView,TextInput, Text} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from  '@expo/vector-icons'
import api from '../../services/api';

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles'

function TeacherList() {
  const [teachers, setTeachers] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [subject, setSubject] = useState('')
  const [week_day, setWeekday] = useState('')
  const [time, setTime] = useState('')

  function handleToggleFilterVisible() {
    setIsFilterVisible(!isFilterVisible)
  }

  async function handleFilterSubmit() {
    console.log('Submit')
    const response = await api.get('classes',{
      params: {
        subject,
        week_day,
        time,
      }
    })
    
    setIsFilterVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys Disponiveis"
        headerRigth={(
          <BorderlessButton 
            onPress={handleToggleFilterVisible}
          >
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        
      { isFilterVisible && (
        <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput 
            style={styles.input}
            value={subject}
            onChangeText={text => setSubject(text)}
            placeholder="Qual a matéria"
            placeholderTextColor="#c1bccc"
          />
          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da Semana</Text>
              <TextInput 
                style={styles.input}
                value={week_day}
                onChangeText={text => setWeekday(text)}
                placeholder="Qual o dia ?"
                placeholderTextColor="#c1bccc"
              />             
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horario</Text>
              <TextInput  
                style={styles.input}
                value={time}
                onChangeText={text => setTime(text)}
                placeholder="Qual Horario ?"
                placeholderTextColor="#c1bccc"
              />             
            </View>
          </View>
          <RectButton 
            onPress={handleFilterSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              Filtrar
            </Text>
          </RectButton>
        </View>
        )}
      </PageHeader>
      <ScrollView 
        style={styles.teacherList} 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher)=> {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} />
          )
        })}
          
      </ScrollView>
    </View>
  ) 
}

export default TeacherList