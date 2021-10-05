import React, {useState, useReducer, useEffect} from "react";
import Reducer from './Reducer'
function Home() {
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'})
    }
    const getLocalStorage = () => {
        let localState = localStorage.getItem('tasks');
        if (localState){
            return JSON.parse(localStorage.getItem('tasks'));
        }else {
            return []
        }
    }
    const defaultRootState = {
        allTasks: getLocalStorage(),
        isModalOpen: false,
        modalMessage: 'sds',
        modalType: 'add'
    }
    const [state, dispatch] = useReducer(Reducer, defaultRootState)
    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(state.allTasks))
        setTimeout(()=>{
            closeModal()
        }, 2000)
    }, [state])

    const handelSubmit =(e) =>{
        e.preventDefault();
        if (taskName && taskFinishDate){
            const newTask = {id: new Date().getTime().toString(), taskName: taskName, taskDate: taskFinishDate}
            dispatch({type: 'ADD_TASK', payload: newTask})
            setTaskName('')
            setTaskFinishDate('')
            document.querySelector('#warning').style.display = "none"
        }else {
            document.querySelector('#warning').style.display = "block"
        }
    }
    const handelTaskRemoval = (id) => {
        dispatch({type: 'REMOVE_TASK', payload: id})
    }
    const [taskName, setTaskName] = useState('');
    const [taskFinishDate, setTaskFinishDate] = useState('');
    return (
        <div className="main_body">
         <div className="work_place">
            <div className="form_area">
                <h1>Add A Task</h1>
                <p id={'warning'}>Fill out both of the fields</p>
                <form onSubmit={handelSubmit}>
                    <div className="input_group">
                        <label htmlFor="taskName">Name Of The Task</label>
                        <input type="text" value={taskName} onChange={(e)=>setTaskName(e.target.value)} id={'taskName'}/>
                    </div>
                   <div className="input_group">
                       <label htmlFor="date">Finish Date</label>
                       <input type="date" value={taskFinishDate} onChange={(e)=>setTaskFinishDate(e.target.value)} id={'date'}/>
                   </div>
                    <input type={'submit'} className="submit_btn" value={'Add Task'} />
                </form>
            </div>
            <div className="content_area">
                {state.isModalOpen? (
                    <div className={state.modalType === 'remove' ? "task_card" +
                    " modal remove" : "task_card modal"}>
                    <h4>{state.modalMessage}</h4>
                    </div>
                    ): ''}
                <div className="task_card top">
                    <h2>Task Name</h2>
                    <h2>Finish Date</h2>
                    <h2>Remove</h2>
                </div>
                {
                    state.allTasks.map((task)=>{
                        return(
                            <div key={task.id}>
                                <div className="task_card">
                                    <h1>{task.taskName}</h1>
                                    <h3>{task.taskDate}</h3>
                                    <button onClick={()=>{handelTaskRemoval(task.id)}} className={'task_remove_btn'}>Remove</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
         </div>
        </div>
    )
}

export default Home
