import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from "@apollo/client/react";
import { gql } from '@apollo/client';


const query = gql`
    query GetTodoswithUser {
       getTodos {
        id
        title
          user {
             email
             name
          }
        }
    } 
`
function App() {
  const { data, loading } = useQuery(query)
  if (loading) return <h1>...Loading</h1>
  console.log(data,"data");
  return (
    <div className='App'>
      {/* {JSON.stringify(data)} */}
      <table>
        <tbody>
          {
            data.getTodos.map(todo=><tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
