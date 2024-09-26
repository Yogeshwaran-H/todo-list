import { useState, useEffect } from "react"
import "./App.css"

function App() {
    const [list, setList] = useState([{ id: 0, task: "bath", isCompleted: false, isDeleted: false }, { id: 1, task: "brush", isCompleted: false, isDeleted: false }, { id: 2, task: "food", isCompleted: false, isDeleted: false }]);
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [search, setSearch] = useState([])
    const [editIndex, setEditIndex] = useState('')

    useEffect(() => {
        let timeout = setTimeout(() => {
            setError('')
        }, 2000);
        return () => clearTimeout(timeout);
    }, [error]);

    function addList() {
        let lId = (list[list.length - 1].id) + 1;

        // let existList = list.filter((ele) => {
        //     return ele.task == input
        // })
        // console.log(existList);

        if (input != '') {
            setList((prevList) => [...prevList, {
                id: lId,
                task: input,
                isCompleted: false,
                isDeleted: false
            }]);
        }

        // (existList.length) && setError("already exist");

        setInput('')
    }

    function editTask(index) {
        setEditIndex(index);
        let list1 = list.slice(index, index + 1);
        setInput(list1[0].task);

    }

    function editList() {
        if (input != '') {
            let tempList = [...list]
            tempList[editIndex] = { ...list[editIndex], task: input }
            setList(tempList);
        }
        setEditIndex('')
        setInput('')
    }

    function completeTask(index) {

        let listArr = list.toSpliced(index, 1, {
            ...list[index],
            isCompleted: true
        })
        setList(listArr);
        setSearch('')
    }

    function removeTask(index) {
        let listArr = list.toSpliced(index, 1, {
            ...list[index],
            isDeleted: true
        })
        setList(listArr);
        setSearch('')
    }
    console.log(list);


    function searchList() {
        let existList = list.filter((ele) => {
            return ele.task.startsWith(input);
        })

        // console.log(existList,"ytguy");

        setSearch((existList.length) ? existList : [])
        // (existList.length) ? setSearch(existList) : setSearch([]);
        setInput('');
    }


    return (
        <div className="App">
            <h1>Create Your Own To-do List</h1>
            <div className="search">
                <input type="text" value={input} name="task" id="" onChange={(e) => { setInput(e.target.value) }} placeholder="Type your task" />
                {editIndex === 0 || editIndex != '' ? <button className="add" onClick={editList}>Edit</button> : <button className="add" onClick={addList}>Add</button>}
                <button className="search" onClick={searchList}>Search</button>
            </div>
            <div>
                {error && <div className="error" style={{ color: "red", padding: 5 }}>{error}</div>}
            </div>
            {
                (list.length > 0) &&
                <table className="list">
                    <thead>
                        <tr>
                            {/* <th>S.no</th> */}
                            <th>Task</th>
                            <th>Edit</th>
                            <th>Completed</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            search.length ?
                                search.map((obj) => {
                                    return <tr key={obj.id}>
                                        <td >{obj.task}</td>
                                        <td style={{ color: "yellowgreen" }} onClick={() => editTask(obj.id)} className="buttons">Edit</td>
                                        <td style={{ color: "green" }} onClick={() => completeTask(obj.id)} className="buttons">Completed</td>
                                        <td style={{ color: "red" }} onClick={() => removeTask(obj.id)} className="buttons">Delete</td>
                                    </tr>
                                })
                                :
                                list.map((obj, index) => {

                                    return (
                                        (!obj.isCompleted && !obj.isDeleted) &&
                                        <tr key={obj.id} >
                                            {/* <td>{index + 1}</td> */}
                                            <td >{obj.task}</td>
                                            <td style={{ color: "yellowgreen" }} onClick={() => editTask(index)} className="buttons">Edit</td>
                                            <td style={{ color: "green" }} onClick={() => completeTask(index)} className="buttons">Completed</td>
                                            <td style={{ color: "red" }} onClick={() => removeTask(index)} className="buttons">Delete</td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            }
        </div >
    )
}

export default App