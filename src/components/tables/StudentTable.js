import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Toolbar, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core'
import { StudentColumns } from './StudentColumns';
import { Search } from '@material-ui/icons';
import SearchFilter from './Search'
import { CheckBox } from './CheckBox';
import axios from 'axios'
import { useTable, useGlobalFilter, useRowSelect } from 'react-table';

const useStyle = makeStyles(theme => {
  return {
    mainRoot: {
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: '#333',
        border: '#333',
        color: '#f9f9f9'
      }
    },
    root: {
      '& .MuiTableCell-root': {
        border: '1px solid #dfdfdf'
      },
      '& .MuiTableRow-root': {
        '&:hover': {
          backgroundColor: '#dfdfdf'
        },
        '&:nth-child(even)': {
          backgroundColor: '#f4f4f4',
          '&:hover': {
            backgroundColor: '#dfdfdf'
          }
        }
      }
    },
    container: {
      maxHeight: 448,
    },
    header: {
      padding: theme.spacing(1)
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.25)',
      },
      '& .Mui-focus': {
        backgroundColor: 'rgba(0,0,0,0.25)',
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      backgroundColor: '#222'
    }
  }
})

export default function StudentTable() {

  const classes = useStyle();


  const [students, setStudents] = useState([]);
  function showStudents() {
    axios.get('http://localhost:80/api/studentsTable.php')
      .then((response) => {
        setStudents(response.data);
      })
      .catch(err => console.log(err))
  };
  useEffect(() => {
    showStudents();
  }, []);


  const columns = useMemo(() => StudentColumns, []);
  const data = useMemo(() => students, [students]);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
  },
    useGlobalFilter,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <CheckBox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )


  const { globalFilter } = state

  return (
    <>
      <Box className={classes.mainRoot}>
        <Container className={classes.root}>
          <Paper variant='outlined'>
            <div className={classes.header}>
              <Toolbar>
                  <Typography variant='h4'>
                    Student List
                  </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <Search />
                  </div>
                  <SearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
              </Toolbar>
            </div>
            <TableContainer className={classes.container}>
              <Table {...getTableProps} size="small" stickyHeader>
                <TableHead>
                  {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <TableCell {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps}>
                  {rows.map((row) => {
                    prepareRow(row)
                    return (
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <TableCell {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

