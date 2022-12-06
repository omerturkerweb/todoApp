 import React,{useEffect, useState} from "react";
function App() {

      const [note , setNote] =  useState([])
      const [noteId , setNoteId] = useState(0)
      const [deleteItemId , setDeleteItem] = useState(0)
      const [doneItemId , setDoneItemId] = useState(0)
          
        const addToDoHandle = e => {
          if(document.querySelector('.todo-input').value !== ""){
            e.preventDefault();
            let noteNumber = noteId;
            noteNumber += 1;
            setNoteId(noteNumber)
            const toDoToAdd = document.querySelector('.todo-input').value;
            setNote( note => [...note , {
              id : noteNumber,
              content : toDoToAdd,
              status : false
            }])
            document.querySelector('.todo-input').value = "";
          }
          
      
        }
           useEffect( () => {
                  const data = note;
                  const dataLeft = data.filter(item => item.id != deleteItemId)
                  setNote(dataLeft)
                  
           },[deleteItemId])

              

           useEffect( () => {
            console.log(note)
            console.log(doneItemId)
                  const data = note;

                  if(doneItemId) {
                    if(data[doneItemId-1].status == true) {
                      data[doneItemId-1].status = false
                      setNote(data)
                      setDoneItemId(0)
                        }

                    else if(data[doneItemId-1].status == false) { 
                    data[doneItemId-1].status=true;
                    setNote(data)
                    setDoneItemId(0)
                   
                    }
                  }
                  

                },[doneItemId])
           
       const AddNotes = ({content,status,delId,doneId,id}) =>  {

        const deleteHandler = (e , state) => {
           delId(document.getElementById(id).getAttribute('id'))
        }
        const doneHandler = (e,state) => {
             doneId(document.getElementById(id).getAttribute('id'))
        }
      
        return(
    
             <div className="note" id={id}>
                <div className="content">
                  {
                    status
                    ?<div className="content-text done-text"><li>{content}</li></div>
                    :<div className="content-text"><li>{content}</li></div>
                  }
                    
                </div>
               
                <div className="actions">
                    <i onClick={e => deleteHandler(e)} className="fa-sharp fa-solid fa-xmark remove"></i>
                    <i onClick={e => doneHandler(e)} className="fa-solid fa-check done"></i>
                </div>
                 
            
              </div>
         
             
        )
       }

  return (
    <div className="App">
        <div className="container">
          <div className="header">
            <h2>To Do List</h2>
          </div>
          <div className="toDo">
            
            <input required className="todo-input" placeholder="write something to do..." type='text'/>
          </div>

                  {
                    note.length > 0
                    ?<div className="all-notes">
                        {
                          note.map( item => {
                            return(
                              <AddNotes
                                id = {item.id}
                                key={item.id}
                                content={item.content}
                                status={item.status}
                                delId = {id => setDeleteItem(id)}
                                doneId = {id => setDoneItemId(id)}
                              />
                            )
                          })
                        }
                    </div>
                     
                    
                    :<div className="null-todo"> there is nothing here to do ... <i className="fa-solid fa-clipboard"></i> </div>
                  }

          <div className="addToDo">
            <button  onClick={e=> addToDoHandle(e)}>Add to List</button>
          </div>
        
        </div>  
       
    </div>
  );
}

export default App;
