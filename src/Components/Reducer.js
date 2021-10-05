
const Reducer = (state, action) => {
    if (action.type === 'ADD_TASK'){
        const newTasks = [...state.allTasks, action.payload]
        return{
            ...state,
            allTasks: newTasks,
            isModalOpen: true,
            modalMessage: 'Task Added',
            modalType: 'add'
        }
    }
    if (action.type === 'REMOVE_TASK'){
        const newTasks = state.allTasks.filter((task)=>task.id !== action.payload)
        return {
            ...state, allTasks: newTasks,
            isModalOpen: true,
            modalMessage: 'Task Removed',
            modalType: 'remove'
        }
    }
    if (action.type === 'CLOSE_MODAL'){
        return {
            ...state,
            isModalOpen: false,
            modalMessage: 'Task Removed',
            modalType: 'remove'
        }
    }
}
export default Reducer