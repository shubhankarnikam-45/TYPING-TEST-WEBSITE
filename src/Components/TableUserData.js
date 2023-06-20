import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../Constext/themeContext'

const TableUserData = ({ data }) => {

    console.log("data", data)
    let { theme } = useTheme();

    //creating th style object for all the cells.
    let styleDiv = {
        color: theme.textColor,
        textAlign: 'center'
    }
    return (
        <div className='table'>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styleDiv}>
                                WPM
                            </TableCell>

                            <TableCell style={styleDiv}>
                                Accuracy
                            </TableCell>

                            <TableCell style={styleDiv}>
                                Characters
                            </TableCell>

                            <TableCell style={styleDiv}>
                                Data
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((i, index) => (
                                <TableRow key={index}>
                                    <TableCell style={styleDiv}>
                                        {i.wpm}
                                    </TableCell>


                                    <TableCell style={styleDiv}>
                                        {i.accuracy}
                                    </TableCell>

                                    <TableCell style={styleDiv}>
                                        {i.chracters}
                                    </TableCell>

                                    <TableCell style={styleDiv}>
                                        {i.timeStamp.toDate().toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableUserData