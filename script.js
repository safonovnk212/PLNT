{\rtf1\ansi\ansicpg1251\cocoartf2818
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u1051 \u1086 \u1075 \u1080 \u1082 \u1072  \u1076 \u1083 \u1103  \u1074 \u1093 \u1086 \u1076 \u1072 \
const loginScreen = document.getElementById('loginScreen');\
const mainContent = document.getElementById('mainContent');\
const passwordInput = document.getElementById('passwordInput');\
const loginBtn = document.getElementById('loginBtn');\
const errorMessage = document.getElementById('errorMessage');\
\
const PASSWORD = "5105";\
\
loginBtn.addEventListener('click', () => \{\
  if (passwordInput.value === PASSWORD) \{\
    loginScreen.classList.add('hidden');\
    mainContent.classList.remove('hidden');\
  \} else \{\
    errorMessage.textContent = "\uc0\u1053 \u1077 \u1074 \u1077 \u1088 \u1085 \u1099 \u1081  \u1087 \u1072 \u1088 \u1086 \u1083 \u1100 . \u1055 \u1086 \u1087 \u1088 \u1086 \u1073 \u1091 \u1081 \u1090 \u1077  \u1089 \u1085 \u1086 \u1074 \u1072 .";\
  \}\
\});\
\
passwordInput.addEventListener('keypress', (e) => \{\
  if (e.key === 'Enter') \{\
    loginBtn.click();\
  \}\
\});\
\
// \uc0\u1051 \u1086 \u1075 \u1080 \u1082 \u1072  \u1076 \u1083 \u1103  \u1079 \u1072 \u1076 \u1072 \u1095 \
const taskInput = document.getElementById('taskInput');\
const taskDate = document.getElementById('taskDate');\
const addTaskBtn = document.getElementById('addTaskBtn');\
const taskList = document.getElementById('taskList');\
const showAll = document.getElementById('showAll');\
const showActive = document.getElementById('showActive');\
const showCompleted = document.getElementById('showCompleted');\
\
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];\
\
function renderTasks(filter = 'all') \{\
  taskList.innerHTML = '';\
  const filteredTasks = tasks.filter(task => \{\
    if (filter === 'active') return !task.completed;\
    if (filter === 'completed') return task.completed;\
    return true;\
  \});\
\
  filteredTasks.forEach((task, index) => \{\
    const li = document.createElement('li');\
    li.className = task.completed ? 'completed' : '';\
    li.innerHTML = `\
      <span>$\{task.text\} ($\{task.date\})</span>\
      <div>\
        <button onclick="toggleTask($\{index\})"><i class="fas fa-check"></i></button>\
        <button onclick="deleteTask($\{index\})"><i class="fas fa-trash"></i></button>\
      </div>\
    `;\
    taskList.appendChild(li);\
  \});\
  updateCalendar();\
\}\
\
function addTask() \{\
  const taskText = taskInput.value.trim();\
  const date = taskDate.value;\
  if (taskText && date) \{\
    tasks.push(\{ text: taskText, date, completed: false \});\
    taskInput.value = '';\
    taskDate.value = '';\
    saveTasks();\
    renderTasks();\
  \}\
\}\
\
function toggleTask(index) \{\
  tasks[index].completed = !tasks[index].completed;\
  saveTasks();\
  renderTasks();\
\}\
\
function deleteTask(index) \{\
  tasks.splice(index, 1);\
  saveTasks();\
  renderTasks();\
\}\
\
function saveTasks() \{\
  localStorage.setItem('tasks', JSON.stringify(tasks));\
\}\
\
// \uc0\u1051 \u1086 \u1075 \u1080 \u1082 \u1072  \u1076 \u1083 \u1103  \u1082 \u1072 \u1083 \u1077 \u1085 \u1076 \u1072 \u1088 \u1103 \
let calendar;\
\
document.addEventListener('DOMContentLoaded', () => \{\
  calendar = new FullCalendar.Calendar(document.getElementById('calendar'), \{\
    initialView: 'dayGridMonth',\
    locale: 'ru',\
    events: tasks.map(task => (\{\
      title: task.text,\
      date: task.date,\
      color: task.completed ? '#888' : '#6d28d9',\
    \})),\
  \});\
  calendar.render();\
  renderTasks();\
\});\
\
function updateCalendar() \{\
  calendar.removeAllEvents();\
  tasks.forEach(task => \{\
    calendar.addEvent(\{\
      title: task.text,\
      date: task.date,\
      color: task.completed ? '#888' : '#6d28d9',\
    \});\
  \});\
\}\
\
// \uc0\u1060 \u1080 \u1083 \u1100 \u1090 \u1088 \u1099  \u1079 \u1072 \u1076 \u1072 \u1095 \
showAll.addEventListener('click', () => renderTasks('all'));\
showActive.addEventListener('click', () => renderTasks('active'));\
showCompleted.addEventListener('click', () => renderTasks('completed'));\
\
// \uc0\u1054 \u1073 \u1088 \u1072 \u1073 \u1086 \u1090 \u1095 \u1080 \u1082 \u1080  \u1089 \u1086 \u1073 \u1099 \u1090 \u1080 \u1081 \
addTaskBtn.addEventListener('click', addTask);\
taskInput.addEventListener('keypress', (e) => \{\
  if (e.key === 'Enter') addTask();\
\});}