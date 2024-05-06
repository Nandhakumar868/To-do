import {React, useState} from 'react';
import { TextField, Button, Select, InputLabel, FormControl, MenuItem, Box, Typography, IconButton } from '@mui/material';
import '../App.css';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
// npm install date-fns

const CreateTask = ({isVisible, onClose, onTaskSubmit}) => {
    const [formDataArray, setFormDataArray] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const initialValues = {
        task: '',
        deadline: '',
        priority: '',
        assigned: '',
        description: '',
        tags: '',
    };

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-');
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }
    
    const onSubmit = (values, onSubmitProps) => {
        const formattedDeadline = formatDate(values.deadline)
        const formData = {
            task: values.task,
            deadline: formattedDeadline,
            priority: values.priority,
            assigned: values.assigned,
            description: values.description,
            tags: values.tags
        }
    
        
        setFormDataArray([...formDataArray,formData]);
        onTaskSubmit(formData);
    
        onSubmitProps.resetForm();
        console.log(formDataArray);
        onClose();
    };
    
    const Validation = Yup.object({
        task : Yup.string().required('* Task is required'),
        deadline : Yup.date().required('* Deadline is required'),
        priority : Yup.string().required('* Priority is required'),
        assigned : Yup.string().required('* Assign a person to the task'),
        description : Yup.string().required('* Description is required'),
        tags : Yup.string().required('* Tags are required'),
    });

    const [focused,setFocused] = useState(false);
    
  return (
    <Box className={`bg-gray-200 overflow-hidden fixed top-[2vw] left-[35vw] w-[35vw] shadow-xl shadow-white p-5 rounded-md newTask_form ${isVisible ? 'inline' : 'hidden'}`}>
        <IconButton sx={{float: 'right'}} onClick={onClose}><CloseIcon sx={{color: 'red', fontSize: '2rem'}}/></IconButton>

        <Typography variant='h4' sx={{margin: '0.1vw 0 1vw', textAlign: 'center'}}>Add New Task</Typography>

        <div className='flex justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={Validation}>
            { (formik) => (

                    <Form className='flex flex-col justify-center items-center w-[30vw]'>

                        <FormControl fullWidth>
                            <Field as={TextField} label={<span>Task<span className='text-red-700'>*</span></span>} fullWidth name='task'/>
                            <ErrorMessage name='task'>{ (errormessage) => <div className='text-red-500'>{errormessage}</div>}</ErrorMessage>
                        </FormControl>
                        
                        <FormControl sx={{margin: '2vw 0'}} fullWidth>
                            <Field as={TextField} label={ focused ? <span>Deadline<span className='text-red-700'>*</span></span> : null} type='date' InputProps={{inputProps: {min:today,},}} fullWidth onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} name='deadline'/>
                            <ErrorMessage name='deadline'>{ (errormessage) => <div className='text-red-500'>{errormessage}</div>}</ErrorMessage>
                        </FormControl>
                        
                        <FormControl fullWidth>
                            <InputLabel id='priority_types'><span>Priority<span className='text-red-700'>*</span></span></InputLabel>
                            <Field as={Select} name='priority' labelId='priority_types' label={<span>Priority<span className='text-red-700'>*</span></span>}>
                                <MenuItem value='Low'>Low</MenuItem>
                                <MenuItem value='Medium'>Medium</MenuItem>
                                <MenuItem value='High'>High</MenuItem>
                            </Field>
                            <ErrorMessage name='priority'>{ (errormessage) => <div className='text-red-500'>{errormessage}</div>}</ErrorMessage>
                        </FormControl>

                        <FormControl fullWidth sx={{margin: '2vw 0'}}>
                            <InputLabel id='assigned'><span>Assigned to<span className='text-red-700'>*</span></span></InputLabel>
                            <Field as={Select} name='assigned' labelId='assigned' label={<span>Assigned to<span className='text-red-700'>*</span></span>}>
                                <MenuItem value='sakthikarthick'>Sakthikarthick</MenuItem>
                                <MenuItem value='kishorekumar'>Kishorekumar</MenuItem>
                                <MenuItem value='aswin'>Aswin</MenuItem>
                                <MenuItem value='saran'>Saran</MenuItem>
                            </Field>
                            <ErrorMessage name='assigned'>{ (errormessage) => <div className='text-red-500'>{errormessage}</div>}</ErrorMessage>
                        </FormControl>

                        <FormControl fullWidth>
                            <Field as={TextField} name='description' label={<span>Description<span className='text-red-700'>*</span></span>} multiline rows={4} fullWidth/>
                            <ErrorMessage name='description'>{ (errormessage) => <div className='text-red-500'>{errormessage}</div>}</ErrorMessage>
                        </FormControl>

                        <FormControl sx={{margin: '2vw 0'}} fullWidth>
                            <Field as={TextField} name='tags' label={<span>Tags<span className='text-red-700'>*</span></span>} fullWidth/>
                            <ErrorMessage name='tags'>{ (errormessage) => <div className='text-red-500'>{errormessage}</div>}</ErrorMessage>
                        </FormControl>

                        <Button variant='contained' type='submit'>Create</Button>
                    </Form>

                )}

            </Formik>
        </div>

    </Box>
  )
}

export default CreateTask;