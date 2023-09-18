import React, { useCallback, useState, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { read, utils, writeFileXLSX } from "xlsx";
import ReadCSV from './ReadCSV';
import EditCSV from './EditCSV';

export default function HandleCSV(props) {
    const [records, setRecords] = useState([]);
    const [source, setSource] = useState();
    const [editResponseId, setEditResponseId] = useState(null);


    const [editFormData, setEditFormData] = useState({
        id: "",
        t: "",
        s: "",
        x: "",
        y: "",
        v: "",
        e: "",
        e1: "",
        t_local: "",
        blink: "",
        plateau: "",
        state: "",
        ramp_direction: "",
        sp_start_time: "",
        sp_end_time: "",
        sp_start_displacement: "",
        sp_end_displacement: "",
        sp_duration: "",
        qp_start_time: "",
        qp_end_time: "",
        qp_start_displacement: "",
        qp_end_displacement: "",
        qp_duration: "",
        chain_id: "",
        expected_sp_ramp_direction: "",
        expected_qp_ramp_direction: "",
        expected_qp_peak_velocity: "",
        expected_sp_end_peak_type: "",
        expected_qp_end_peak_type: "",
        expected_sp_end_bound: "",
        result_id: "",
        result_chain_id: "",
        is_sp: "",
        is_qp: "",
    });


    const importFile = $event => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setRecords(rows)
                }
            };
            reader.readAsArrayBuffer(file);
            setSource(file);
        }
    };

    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(records);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
    }, [records]);



    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }


    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedResponse = {
            id: editResponseId,
            t: editFormData.t,
            s: editFormData.s,
            x: editFormData.x,
            y: editFormData.y,
            v: editFormData.v,
            e: editFormData.e,
            e1: editFormData.e1,
            t_local: editFormData.t_local,
            blink: editFormData.blink,
            plateau: editFormData.plateau,
            state: editFormData.state,
            ramp_direction: editFormData.ramp_direction,
            sp_start_time: editFormData.sp_start_time,
            sp_end_time: editFormData.sp_end_time,
            sp_start_displacement: editFormData.sp_start_displacement,
            sp_end_displacement: editFormData.sp_end_displacement,
            sp_duration: editFormData.sp_duration,
            qp_start_time: editFormData.qp_start_time,
            qp_end_time: editFormData.qp_end_time,
            qp_start_displacement: editFormData.qp_start_displacement,
            qp_end_displacement: editFormData.qp_end_displacement,
            qp_duration: editFormData.qp_duration,
            chain_id: editFormData.chain_id,
            expected_sp_ramp_direction: editFormData.expected_sp_ramp_direction,
            expected_qp_ramp_direction: editFormData.expected_qp_ramp_direction,
            expected_qp_peak_velocity: editFormData.expected_qp_peak_velocity,
            expected_sp_end_peak_type: editFormData.expected_sp_end_peak_type,
            expected_qp_end_peak_type: editFormData.expected_qp_end_peak_type,
            expected_sp_end_bound: editFormData.expected_sp_end_bound,
            result_id: editFormData.result_id,
            result_chain_id: editFormData.result_chain_id,
            is_sp: editFormData.is_sp,
            is_qp: editFormData.is_qp,
        }

        const newRecords = [...records];

        const index = records.findIndex((record) => record.id === editResponseId);

        newRecords[index] = editedResponse;

        setRecords(newRecords);
        setEditResponseId(null);

    }

    const handleEditClick = (event, record) => {
        event.preventDefault();
        setEditResponseId(record.id);

        const formValues = {
            t: record.t,
            s: record.s,
            x: record.x,
            y: record.y,
            v: record.v,
            e: record.e,
            e1: record.e1,
            t_local: record.t_local,
            blink: record.blink,
            plateau: record.plateau,
            state: record.state,
            ramp_direction: record.ramp_direction,
            sp_start_time: editFormData.sp_start_time,
            sp_end_time: record.sp_end_time,
            sp_start_displacement: record.sp_start_displacement,
            sp_end_displacement: record.sp_end_displacement,
            sp_duration: record.sp_duration,
            qp_start_time: record.qp_start_time,
            qp_end_time: editFormData.qp_end_time,
            qp_start_displacement: record.qp_start_displacement,
            qp_end_displacement: record.qp_end_displacement,
            qp_duration: record.qp_duration,
            chain_id: record.chain_id,
            expected_sp_ramp_direction: record.expected_sp_ramp_direction,
            expected_qp_ramp_direction: record.expected_qp_ramp_direction,
            expected_qp_peak_velocity: record.expected_qp_peak_velocity,
            expected_sp_end_peak_type: record.expected_sp_end_peak_type,
            expected_qp_end_peak_type: record.expected_qp_end_peak_type,
            expected_sp_end_bound: record.expected_sp_end_bound,
            result_id: record.result_id,
            result_chain_id: record.result_chain_id,
            is_sp: editFormData.is_sp,
            is_qp: editFormData.is_qp,
        }

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditResponseId(null);
    }

    const handleDeleteClick = (responseId) => {
        const newRecords = [...records];

        const index = records.findIndex((record) => record.id === responseId);

        newRecords.splice(index, 1);

        setRecords(newRecords);
    }

    return (

        <div>
            <input
                type="file"
                name="file"
                className="importFileButton"
                id="inputGroupFile"
                required
                onChange={importFile}
                accept=".csv,.xlsx"

            />
            {!source && <div></div>}
            {source && (
                <div>

                    <button
                        onClick={exportFile}>Export</button>
                    <form onSubmit={handleEditFormSubmit}>

                        <table className="table table-hover">

                            <thead><th>id</th><th>sp_start_time</th><th>qp_end_time</th><th>is_sp</th><th>is_qp</th><th>Actions</th></thead>

                            <tbody>

                                {records.map((record) => (
                                    <Fragment>
                                        {editResponseId === record.id ? (
                                            <EditCSV record={record} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                        ) : (
                                            <ReadCSV record={record} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}
                                                getTime={props.getTime} />
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>

                        </table>
                    </form>
                </div>
            )}

        </div>


    );
}