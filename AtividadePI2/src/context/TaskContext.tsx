import React, { createContext, useReducer, useMemo, useCallback } from 'react';

export class Task {
    id?: number;
    title: string;
    description: string;
    taskStatus?: string

    constructor(title: string, description: string, id?: number, taskStatus?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.taskStatus = taskStatus;
    }
}

interface TaskState {
  todoList: Task[];
  doingList: Task[];
  doneList: Task[];
}

const initialState: TaskState = {
  todoList: [],
  doingList: [],
  doneList: [],
};

export const TaskContext = createContext<{
    state: TaskState;
    addTask: (task: Task) => void;
    editTask: (index: number, task: Task) => void;
    deleteTask: (index: number) => void;
    moveToDoing: (index: number) => void;
    moveToDone: (index: number) => void;
    setTasks: (tasks: Task[]) => void;
  } | null>(null);
  
  type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; index: number; payload: Task }
  | { type: 'DELETE_TASK'; index: number }
  | { type: 'MOVE_TO_DOING'; index: number }
  | { type: 'MOVE_TO_DONE'; index: number }
  | { type: 'SET_TASKS'; payload: Task[] };
  
  function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
      case 'ADD_TASK':
        return { ...state, todoList: [...state.todoList, action.payload] };
      case 'EDIT_TASK': {
        const updatedTodoList = [...state.todoList];
        updatedTodoList[action.index] = action.payload;
        return { ...state, todoList: updatedTodoList };
      }
      case 'DELETE_TASK':
        return { ...state, todoList: state.todoList.filter((_, i) => i !== action.index) };
      case 'MOVE_TO_DOING': {
        const taskToMove = state.todoList[action.index];
        return {
          ...state,
          todoList: state.todoList.filter((_, i) => i !== action.index),
          doingList: [...state.doingList, taskToMove],
        };
      }
      case 'MOVE_TO_DONE': {
        const taskToMove = state.doingList[action.index];
        return {
          ...state,
          doingList: state.doingList.filter((_, i) => i !== action.index),
          doneList: [...state.doneList, taskToMove],
        };
      }
      case 'SET_TASKS':
        return {
          ...state,
          todoList: action.payload.filter(task => task.taskStatus === "TODO"),
          doingList: action.payload.filter(task => task.taskStatus === "IN_PROGRESS"),
          doneList: action.payload.filter(task => task.taskStatus === "DONE"),
        };
      default:
        return state;
    }
  }
  
  export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
  
    const addTask = useCallback((task: Task) => dispatch({ type: 'ADD_TASK', payload: task }), []);
    const editTask = useCallback((index: number, task: Task) => dispatch({ type: 'EDIT_TASK', index, payload: task }), []);
    const deleteTask = useCallback((index: number) => dispatch({ type: 'DELETE_TASK', index }), []);
    const moveToDoing = useCallback((index: number) => dispatch({ type: 'MOVE_TO_DOING', index }), []);
    const moveToDone = useCallback((index: number) => dispatch({ type: 'MOVE_TO_DONE', index }), []);
    const setTasks = useCallback((tasks: Task[]) => dispatch({ type: 'SET_TASKS', payload: tasks }), []);
  
    const value = useMemo(
      () => ({ state, addTask, editTask, deleteTask, moveToDoing, moveToDone, setTasks }),
      [state, addTask, editTask, deleteTask, moveToDoing, moveToDone, setTasks]
    );
  
    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
  };
  

export const useTaskContext = () => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
