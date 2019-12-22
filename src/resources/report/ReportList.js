import { Badge, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';
import { apiUrl } from '../../provider/dataProvider';

const handleStatusClick = (post, action) => {
    const token = localStorage.getItem('token')
    const settings = {
        method: 'PUT',
        body: JSON.stringify(
            {
                post,
                action
            }
        ),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    fetch(`${apiUrl}/report/all`, settings).then(() => window.location.reload());
}

const StatusField = ({ record, source }) => {
    const colors = {
        New: 'default',
        Resolve: 'green',
        Reject: 'red'
    }
    return <Typography
        style={{ color: colors[record[source]] }}
    >
        {record[source]}
    </Typography >
}

const ActionField = ({ record, source, setDialogData }) => {
    const disabled = record[source] !== 'New';
    return (
        <div style={{
            display: 'flex',
        }}>
            <Button
                variant="contained"
                color="primary"
                size='small'
                style={{ marginRight: 15, backgroundColor: disabled ? 'normal' : 'green' }}
                disabled={disabled}
                onClick={() => setDialogData({
                    open: true,
                    title: 'Resolve report',
                    text: 'Are you sure to resolve this report?',
                    callback: handleStatusClick,
                    params: [record.id, "Resolve"],
                })}
            >
                Resolve
            </Button>
            <Button
                variant="contained"
                color="primary"
                size='small'
                style={{ marginRight: 15, backgroundColor: disabled ? 'normal' : 'red' }}
                disabled={disabled}
                onClick={() => setDialogData({
                    open: true,
                    title: 'Reject report',
                    text: 'Are you sure to reject this report?',
                    callback: handleStatusClick,
                    params: [record.id, "Reject"],
                })}
            >
                Reject
            </Button>
        </div >
    )
}

const Reporter = ({ record }) => {
    const { reports } = record;
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Reporter</TableCell>
                    <TableCell align="left">Reason</TableCell>
                    <TableCell align="left">Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reports.map(({ reportedBy, reason, createdAt }) => (
                    <TableRow key={createdAt}>
                        <TableCell align="left">{reportedBy.username}</TableCell>
                        <TableCell align="left">{reason}</TableCell>
                        <TableCell align="left">{new Date(createdAt).toLocaleString('vi-VN')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const ViolateField = ({ record }) => {
    const { reasons } = record;
    const top3 = reasons.sort((a, b) => b.count - a.count).slice(0, 3)
    return (
        <>
            {top3.map(({ key, rate, count }) => (
                <Badge key={key} badgeContent={count} color="primary">
                    <Chip
                        style={{ margin: '0px 0px 12px 0px' }}
                        label={`${key} ${rate}%`} />
                </Badge>
            ))}
        </>
    )
}

const PostImagesField = ({ record, source }) => {
    const size = 100
    return record[source] ? (
        record[source].map(({ id, image }) => (
            <img
                key={id}
                alt={id}
                src={image.url}
                style={{ maxHeight: size, maxWidth: size, marginRight: 8, display: 'block' }}
            />
        ))
    ) : null
}

const initDialog = {
    open: false,
    title: '',
    text: '',
    callback: () => { },
    params: []
}

const AlertDialog = ({ dialogData, setDialogData }) => {
    const { open, callback, params, title, text } = dialogData;
    const handleClose = () => setDialogData(initDialog);
    const handleSubmit = () => callback(...params);

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleSubmit} color="primary">
                    OK
            </Button>
            </DialogActions>
        </Dialog>
    );
}


export const ReportList = (props) => {
    const [dialogData, setDialogData] = React.useState(initDialog);
    return (
        <>
            <AlertDialog
                dialogData={dialogData}
                setDialogData={setDialogData}
            />
            <List {...props} >
                <Datagrid expand={<Reporter />}>
                    <TextField source="id" label="ID" />
                    <TextField source="title" label="Post Title" />
                    <TextField source="description" label="Post Description" />
                    <PostImagesField source="postImages" label="Post Images" />
                    <TextField source="account.username" label="Author" />
                    <DateField source="createdAt" label="Created at" showTime locales="vi-VN" />
                    <ViolateField source="reasons" label="Violate" />
                    <StatusField source="status" label="Status" />
                    <ActionField
                        source="status"
                        label="Action"
                        dialogData={dialogData}
                        setDialogData={setDialogData} />
                </Datagrid>
            </List>
        </>
    );
}