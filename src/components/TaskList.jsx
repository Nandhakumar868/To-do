import {React, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Avatar } from '@mui/material';
import CreateTask from './CreateTask';
import '../index.css';

const TaskList = () => {
    const [taskData, setTaskData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const handleTaskClick = () => {
      setIsVisible(!isVisible);
    }
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mx-[25vw] mt-[2vw]'>
        
        <div>
            <div className='flex justify-between overflow-hidden items-center h-[6vh] bg-white shadow-lg shadow-gray-300 px-4 py-2 border rounded-md'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-black text-xl mr-2'>To-do</h1>
                    <Avatar sx={{width:'1.3rem', height: '1.3rem', color: 'black'}}>5</Avatar>
                </div>
                <IconButton onClick={handleTaskClick}><AddIcon className='mr-2 text-black'/></IconButton>
                {isVisible && <CreateTask isVisible={isVisible} onClose={() => setIsVisible(false)} onTaskSubmit={(data) => {setTaskData([data,...taskData])}}/>}
            </div>

            {taskData && taskData.map((task, index) => (
                <div key={index} className='mt-[2vw] bg-white shadow-lg shadow-gray-300 rounded-lg p-3 overflow-hidden cursor-pointer'>
               
                    <div className='flex justify-between items-center'>
                        <h5>{task.task}</h5>
                        <IconButton><MoreVertIcon className='text-black'/></IconButton>
                    </div>
                    
                    <p className='text-gray-500'>Deadline : {task.deadline}</p>
                    <p>{task.assigned}</p>
                    <hr className='border border-gray-300 my-2'/>

                    <div className='flex justify-between items-center'>
                        <span className='border border-gray-400 rounded-full py-0.3 px-2'>#{task.tags}</span>
                        <p className={`${task.priority.toLowerCase()} rounded-full text-white py-0.3 px-2`}>{task.priority}</p>
                    </div>

                </div>
            ))}


        </div>

        <div className='flex items-center h-[6vh] overflow-hidden bg-white shadow-lg shadow-gray-300 px-4 py-2 border rounded-md'>
            <h1 className='text-black text-xl mr-2'>InProgress</h1>
            <Avatar sx={{width:'1.3rem', height: '1.3rem', color: 'black'}}>5</Avatar>
        </div>

        <div className='flex items-center h-[6vh] overflow-hidden bg-white shadow-lg shadow-gray-300 px-4 py-2 border rounded-md'>
            <h1 className='text-black text-xl mr-2'>Completed</h1>
            <Avatar sx={{width:'1.3rem', height: '1.3rem', color: 'black'}}>5</Avatar>
        </div>

        <CreateTask/>

    </div>
  )
}

export default TaskList;