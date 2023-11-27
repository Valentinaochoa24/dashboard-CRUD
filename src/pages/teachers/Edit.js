import { useState, useEffect } from 'react';
// project imports
import TeacherForm from './components/TeacherForm';
import { LinearProgress } from '@mui/material';
// react-router-dom
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { teacherId } = useParams();

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/teachers/${teacherId}`);
        if (response.ok) {
          const data = await response.json();
          setTeacher(data);
        } else {
          throw new Error('Error getting the data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [teacherId]);

  if (!teacher) {
    return <LinearProgress />;
  }

  return <TeacherForm teacher={teacher} isEdit />;
};

export default Edit;
