import React from 'react'


const ReadCSV = ({ record, handleEditClick, handleDeleteClick, jumpToOKN }) => {

    return (
        <tr>
            <td >{record.id}</td>
            <td>{record.sp_start_time}</td>
            <td>{record.qp_end_time}</td>
            <td>{record.is_sp}</td>
            <td>{record.is_qp}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, record)}>Edit</button>
                <button type="button" onClick={() => handleDeleteClick(record.id)}>Delete</button>
                {/* <button type="button" onClick={() => jumpToOKN(record.sp_start_time, record.qp_end_time)}>Jump To OKN</button> */}
            </td>
        </tr >
    )
}

export default ReadCSV