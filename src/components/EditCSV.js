import React from 'react'

const EditCSV = ({ record, editFormData, handleEditFormChange, handleCancelClick, }) => {
    return (
        <tr>
            <td>
                {record.id}
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="sp_start_time"
                    name="sp_start_time"
                    value={editFormData.sp_start_time}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="qp_end_time"
                    name="qp_end_time"
                    value={editFormData.qp_end_time}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="is_sp"
                    name="is_sp"
                    value={editFormData.is_sp}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="is_qp"
                    name="is_qp"
                    value={editFormData.is_qp}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditCSV